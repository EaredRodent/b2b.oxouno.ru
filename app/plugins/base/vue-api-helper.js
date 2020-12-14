import { isWarningMessage } from '~/plugins/base/axios-prepare'

export default {
  install (Vue, options) {
    Vue.mixin({
      data () {
        return {
          apiResultSaveQueue: [],
          apiResultSaveQueueIsEmpty: true
        }
      },
      watch: {
        apiResultSaveQueue: {
          handler (array, oldArray) {
            if (!this.apiResultSaveQueueIsEmpty) {
              // Последний в очереди сам вызовет следующего
              return
            }
            // Начать выполнение очереди
            this.apiResultSaveQueueIsEmpty = false
            this.nextResultForSave()
          },
          deep: true
        }
      },
      methods: {
        nextResultForSave () {
          if (!this.apiResultSaveQueue.length) {
            // Очередь пуста
            this.apiResultSaveQueueIsEmpty = true
            return
          }

          // Взять первый результат в очереди и установить
          // Если инициатор websocket, то разрешить анимацию
          let item = this.apiResultSaveQueue.shift()

          if (item.initiator === 'WebSocket') {
            this.$store.commit('base/ws/canHighlight', true)
          }
          // this[item.prop] = item.result
          // TODO
          if (!isWarningMessage(item.result)) {
            Vue.set(this, item.prop, item.result)
          }
          this.$nextTick(() => {
            if (item.initiator === 'WebSocket') {
              this.$store.commit('base/ws/canHighlight', false)
            }
            this.nextResultForSave()
          })
        }
      }
    })
    Vue.prototype.$apiSave = async function (prop, promiseHandle, initiator = 'User') {
      if (typeof promiseHandle !== 'function') {
        console.log(`$apiSave error: Called with prop="${prop}" promiseHandle="${promiseHandle}" initiator="${initiator}"`)
        return
      }

      // Начать получение данных
      let result = await new Promise(promiseHandle)
      // Добавить установку результата в очередь
      this.apiResultSaveQueue.push({
        prop,
        result,
        initiator
      })
    }
  }
}
