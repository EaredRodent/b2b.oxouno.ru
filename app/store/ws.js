const wsHelper = new function () {
  this.findIntersectionOfSubscriptionsWithModifiedTables = function (store) {
    let intersection = false
    const modifiedTables = store.state.modifiedTables
    const wsSubscriptions = store.state.wsSubscriptions

    for (const wsSubscription of wsSubscriptions) {
      // Поиск пересечения с измененными таблицами
      intersection = wsSubscription.tables.some((table) => {
        return modifiedTables.includes(table)
      })
      // Если в подписке найдено пересечение, то выполнить ее callbackss
      if (intersection) {
        this.executeSubscription(store, wsSubscription)
      }
    }
  }
  // Вызов callbacks подписки wsSubscription
  this.executeSubscription = function (store, wsSubscription) {
    for (const callback of wsSubscription.callbacks) {
      callback()
    }
  }
}()

export const state = function () {
  return {
    // WebSocket подписки см. функцию registerWSDependencies()
    wsSubscriptions: [],
    lastSubscriptionId: 0,
    // Модифицированные таблицы
    modifiedTables: [],
    indicator: {
      status: '',
      timeout: null
    },
    changedByWs: false
  }
}

export const getters = {
  getStatus (state) {
    return state.indicator.status
  }
}

export const mutations = {
  addWsSubscription (state, {
    id,
    tables = [],
    callbacks = []
  }) {
    state.wsSubscriptions.push({
      id,
      tables,
      callbacks
    })
    state.lastSubscriptionId++
  },

  removeWsSubscription (state, id) {
    const idx = state.wsSubscriptions.findIndex(el => el.id === id)

    if (idx !== -1) {
      state.wsSubscriptions.splice(idx, 1)
    }
  },

  _setModifiedTables (state, v) {
    state.modifiedTables = v
  },
  _setIndicatorStatus (state, v) {
    state.indicator.status = v
  },
  _setIndicatorTimeOut (state, v) {
    state.indicator.timeout = v
  },
  _clearIndicatorTimeOut (state) {
    if (state.indicator.timeout) {
      clearTimeout(state.indicator.timeout)
    }
  },
  canHighlight (state, v) {
    state.changedByWs = v
  }
}

export const actions = {
  SOCKET_ONOPEN (store, event) {
    console.log('%c Store::SOCKET_ONOPEN: WebSocket connection is open.', 'background: #5F5; color: #000;')
    store.commit('_setIndicatorStatus', 'open')
  },
  SOCKET_ONCLOSE (store, event) {
    console.log('%c Store::SOCKET_ONCLOSE: WebSocket connection is closed.', 'background: #F55; color: #000;')
    store.commit('_setIndicatorStatus', 'close')
  },
  SOCKET_ONERROR (store, event) {
    console.log('%c Store::SOCKET_ONERROR: WebSocket connection error.', 'background: #F55; color: #000;')
    store.commit('_setIndicatorStatus', 'close')
  },
  SOCKET_ONMESSAGE (store, event) {
    store.commit('_setIndicatorStatus', 'message')
    store.commit('_clearIndicatorTimeOut')
    store.commit('_setIndicatorTimeOut', setTimeout(() => store.commit('_setIndicatorStatus', 'open'), 500))
  },

  onTableUpdate (store, tables) {
    if (tables.length) {
      console.log(`%c Store::SOCKET_ONMESSAGE: ModifiedTables: ${tables}`, 'background: #55F; color: #000;')
      store.commit('_setModifiedTables', tables)
      wsHelper.findIntersectionOfSubscriptionsWithModifiedTables(store)
    }
  },

  registerWsSubscription (store, {
    tables = [],
    callbacks = []
  }) {
    return new Promise((resolve, reject) => {
      const id = store.state.lastSubscriptionId
      store.commit('addWsSubscription', {
        id,
        tables,
        callbacks
      })
      resolve(id)
    })
  },

  unregisterWsSubscription (store, id) {
    store.commit('removeWsSubscription', id)
  }
}
