let config = {}

const B2B_OXOUNO_RU = 'b2b.oxouno.ru'
const LOCALHOST_3020 = 'localhost:3020'
const DEV_B2B_OXOUNO_RU = 'dev.b2b.oxouno.ru'

config.MODE = {
  envDev: process.env.NODE_ENV !== 'production',
  envProd: process.env.NODE_ENV === 'production'
}

config.API = {
  baseUrl: process.env.API_BASE_URL
}

/**
 * Web Socket Client
 * Адрес сервера
 * @property {string} url
 */

config.WSC = {
  url: process.env.WS_BASE_URL
}

/**
 * Описание компонентов страниц
 */
config.PAGES = {
  Base_Notfount: {
    name: 'NotFound',
    url: '/base/notfound'
  },
  Base_Forbidden: {
    name: 'Forbidden',
    url: '/base/forbidden'
  },
  Index: {
    name: 'Главная',
    url: '/'
  },
  Catalog: {
    name: 'Каталог',
    url: '/shop/catalog',
    permission: 'pageB2BAny'
  },
  Outlook: {
    name: 'Outlook',
    permission: 'pageB2BAny',
    url: '/shop/outlook'
  },
  Messages: {
    name: 'Сообщения',
    url: '/shop/messages',
    permission: 'pageB2BAny'
  },
  Orders: {
    name: 'Журнал заказов',
    url: '/shop/orders',
    permission: 'pageB2BAny'
  },
  ClientCard: {
    name: 'Карта клиента',
    url: '/shop/client-card',
    permission: 'pageB2BAny'
  },
  Documents: {
    name: 'Документы',
    url: '/shop/documents',
    permission: 'pageB2BAny'
  },
  Restore: {
    name: 'Служебная ссылка для восстановления пароля',
    url: '/shop/restore'
  },
  Empty: {
    name: 'Empty',
    url: '/empty'
  },
  TestApi: {
    name: 'Test API',
    permission: 'pageTestApi',
    url: '/test-api'
  },
  Shop: {
    name: 'Shop',
    url: '/shop',
    permission: 'pageB2BAny'
  },
  Registration: {
    name: 'Registration',
    url: '/registration'
  }
}
/**
 * Параметры ролей
 */
config.ROLES = {
  'roleMaster': {
    startPage: config.PAGES.Index,
    logoutPage: config.PAGES.Index
  },
  'roleRabbit': {
    startPage: config.PAGES.Index,
    logoutPage: config.PAGES.Index
  },
  'roleB2bClient': {
    startPage: config.PAGES.Shop,
    logoutPage: config.PAGES.Index
  }
}

/**
 * Конфиг компонента snackbar-ex
 * @type {{debug: {timeout: number}, user: {timeout: number}}}
 */
config.SNACKBAR = {
  user: {
    timeout: 20000
  },
  debug: {
    timeout: 0
  }
}

/**
 * Конфиг проекта
 */
config.APP = {
  name: 'b2b-oxouno',
  /**
   * Если event.show: false, то баннер не отображается
   * Во время пряздника указать event.show: true
   */
  event: {
    show: false,
    banner: {
      middleImage: '/08.03.md.png',    // Версия для отображения на сайте
      bigImage: '/08.03.bg.png'  // Версия для просмотра при клике по баннеру
    }
  }
}

export default config
