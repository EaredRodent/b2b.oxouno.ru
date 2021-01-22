import config from '~/config/base-config'

export const state = function () {
  return {
    user: {
      show: false,
      message: '',
      timeout: config.SNACKBAR.user.timeout
    },
    debug: {
      show: false,
      message: '',
      timeout: config.SNACKBAR.debug.timeout
    },
    modalScreen: false
  }
}

export const mutations = {
  setUserShow (state, value) {
    state.user.show = value
  },
  setUserMessage (state, value) {
    state.user.message = value
  },
  setDebugShow (state, value) {
    state.debug.show = value
  },
  setDebugMessage (state, value) {
    state.debug.message = value
  },
  setModalScreen (state, value) {
    state.modalScreen = value
  }
}

export const actions = {
  show (store, message) {
    if ((!message) || (typeof message === 'object')) {
      store.commit('setDebugMessage', message)
      store.commit('setDebugShow', true)
    } else {
      store.commit('setUserMessage', message)
      store.commit('setUserShow', true)
    }
  }
}
