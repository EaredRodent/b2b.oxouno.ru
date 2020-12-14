import config from '~/config/base-config'

export default function (context) {
  let pingInterval
  const PROJECT_NAME = config.APP.name
  const CLOSE_CODE_NORMAL = 1000
  const CLOSE_REASON_UPDATED = 'CLOSE_REASON_UPDATED'
  let isCommitCheckedFirstTime = true

  const socket = new WebSocket(config.WSC.url)

  socket.onopen = function (event) {
    context.store.dispatch(`base/ws/SOCKET_ONOPEN`, event)
    startPingProcess()
  }

  socket.onmessage = function (event) {
    let wsMessage = WSMessage.fromWSEvent(event)

    if (wsMessage.type === 'PONG') {
      checkCommitHash(wsMessage.data)
    }

    if (wsMessage.type === 'RELOAD') {
      socket.close(CLOSE_CODE_NORMAL, CLOSE_REASON_UPDATED)
    }

    if (wsMessage.type === 'TABLES_UPDATE' && Array.isArray(wsMessage.data)) {
      context.store.dispatch(`base/ws/SOCKET_ONMESSAGE`, event)
      context.store.dispatch(`base/ws/onTableUpdate`, wsMessage.data)
    }
  }

  socket.onclose = function (event) {
    context.store.dispatch(`base/ws/SOCKET_ONCLOSE`, event)

    if (event.reason === CLOSE_REASON_UPDATED) {
      stopPingProcess('Сайт обновлен.')
    } else {
      stopPingProcess('Потеряно соединение с сервером.')
    }
  }

  //=====================================================================
  // Functions & Classes
  //=====================================================================

  function startPingProcess () {
    pingInterval = setInterval(() => {
      if (socket.readyState === 1) {
        let data = {
          project: config.APP.name,
          login: context.store.getters['base/auth/userProperty']('login') || 'Guest',
          name: context.store.getters['base/auth/userProperty']('name') || '',
          urls: [context.route.fullPath],
          userAgent: window.navigator.userAgent
        }

        let ping = new WSMessage('PING', data)
        // Если не удается отправить - то срабатывает onclose // todo наблюдать
        socket.send(ping.toString())
      }
    }, 2500)
  }

  function stopPingProcess (reason) {
    clearInterval(pingInterval)
    let score = 5
    context.store.commit('base/snackbar/setModalScreen', true)
    setInterval(() => {
      context.store.dispatch('base/snackbar/show',
        `${reason} Автоматическая перезагрузка страницы через ${score} сек.`)
      if (score) {
        score--
      } else {
        window.location.reload(true)
      }
    }, 1000)
  }

  function checkCommitHash (data) {
    let lsKey = 'commit-hash/' + PROJECT_NAME
    let prevHash = localStorage.getItem(lsKey)

    let hash
    try {
      let deployJson = JSON.parse(data)
      hash = deployJson[PROJECT_NAME]['hash']
    } catch (e) {}

    if (hash) {
      localStorage.setItem(lsKey, hash)
    }

    if (prevHash !== hash) {
      if (!isCommitCheckedFirstTime) {
        socket.close(CLOSE_CODE_NORMAL, CLOSE_REASON_UPDATED)
      }
    }
    isCommitCheckedFirstTime = false
  }

  /**
   * Объект сообщения
   * Поля: type, data. - Могут быть равны undefined
   */
  class WSMessage {
    // Создать из существующих данных
    constructor (type, data) {
      this.type = type
      this.data = data
    }

    // Создать из on message event'а
    static fromWSEvent (wsEvent) {
      let wsMessage = new WSMessage()
      try {
        let eventData = JSON.parse(wsEvent.data)
        wsMessage.type = eventData.type
        wsMessage.data = eventData.data
      } catch (e) {}
      return wsMessage
    }

    // Вернуть строковое представление
    toString () {
      return JSON.stringify(this)
    }
  }
}
