import Vue from 'vue'
import Vuetify from 'vuetify'
import VuetifyRu from 'vuetify/es5/locale/ru.js'
import VMask from 'v-mask'
import VueApiHelper from './vue-api-helper.js'
import VueWsInterface from './vue-ws-interface.js'
import VueAuthInterface from './vue-auth-interface.js'
import AxiosPrepare from './axios-prepare.js'
import DeviceInfo from './device-info.js'
import { initStoreData } from '~/components/debug-bar/debug-bar.js'
// import WSClient from './ws-client'

const initBasePlugins = function (context, inject) {
  // Vuetify
  Vue.use(Vuetify, {
    customProperties: true,
    lang: {
      locales: { VuetifyRu },
      current: 'ru'
    }
  })

  // Реадизация функции $apiSave в компонентах
  Vue.use(VueApiHelper)

  // Реализация функции $registerWsSubscription в компонентах
  Vue.use(VueWsInterface)

  // Интерфейс actions store/base/auth.js
  VueAuthInterface(inject)

  // WebSocket Client
  // WSClient(context)

  // Конфигурация axios
  AxiosPrepare(context)

  // Инициализация плагина информации о устройстве

  DeviceInfo(inject)

  // Инициализация состояний
  initStoreData(context.$axios, context.store)

  // v-mask
  Vue.use(VMask)
}

export default initBasePlugins
