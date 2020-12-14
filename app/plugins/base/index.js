import Vue from 'vue'
import Vuetify from 'vuetify'
import VuetifyRu from 'vuetify/es5/locale/ru'
import VueApiHelper from './vue-api-helper'
import VueWsInterface from './vue-ws-interface'
import VueAuthInterface from './vue-auth-interface'
import AxiosPrepare from './axios-prepare'
import { initStoreData } from '~/components/base/debug-bar/debug-bar'
import WSClient from './ws-client'
import DeviceInfo from './device-info'

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
}

export default initBasePlugins
