import config from '~/config/base-config'
import { isPostSuccessful } from '~/plugins/axios-prepare.js'

export const state = function () {
  return {
    /**
     * Данные пользователя
     * @property {object} user пользователь
     */
    user: {},
    societyIsAdmin: false
  }
}

export const mutations = {
  setUser (state, user) {
    state.user = user || {}
  },
  setSocietyIsAdmin (state, flag) {
    state.societyIsAdmin = flag
  }
}

export const actions = {
  /**
   * Авторизирует пользователя с переходом на startPage из config PAGES
   * @param commit
   * @param getters
   * @param username
   * @param password
   * @returns {Promise<any>}
   */
  async login ({
    commit,
    getters
  }, {
    username,
    password,
    additionParams = {}
  }) {
    const response = await this.$axios.post('v1/anx-user/login', {
      username,
      password,
      ...additionParams
    })

    if (!isPostSuccessful(response)) {
      throw new Error('Auth::Login - POST has errors')
    }

    const { data: { accesstoken } } = response

    window.localStorage.setItem('accesstoken', accesstoken)
    window.location.reload(true)
  },
  /**
   * Логаут пользователя с переходом на logoutPage из config PAGES
   * @param commit
   * @param getters
   */
  logout ({ commit }) {
    commit('setUser')
    this.$axios.setToken(null)
    window.localStorage.removeItem('accesstoken')
    window.location.reload(true)
  },
  /**
   *
   * Регистрирует нового пользователя
   * @param store
   * @param username
   * @param password
   * @param {object} additionParams  - параметры помимо username и password
   * @returns {Promise<any>}
   */
  async registration (store, {
    username,
    password,
    additionParams = {}
  }) {
    const response = await this.$axios.post(
      'v1/anx-user/registration',
      {
        username,
        password,
        ...additionParams
      }
    )

    if (!isPostSuccessful(response)) {
      throw new Error('Auth::Registration - POST has errors')
    }
  },
  async authentication ({ commit, dispatch }) {
    const accesstoken = window.localStorage.getItem('accesstoken')

    if (!accesstoken) {
      return
    }

    this.$axios.setToken(accesstoken, 'Bearer')
    const response = await this.$axios.post('v1/anx-user/bootstrap')

    if (!isPostSuccessful(response)) {
      dispatch('logout')
      throw new Error('Auth::Authentication - POST has errors')
    }

    commit('setUser', response.data)
  }
}

export const getters = {
  /**
   * Возвращает true, если пользователь имеет право, иначе false
   * @param {string} permission
   * @returns {boolean}
   */
  can (state) {
    return function (permission) {
      if (!Object.prototype.hasOwnProperty.call(this.user, 'permissions')) {
        console.log('Auth::Can Объект user не имеет поля permissions.')
        return false
      }

      if (!Array.isArray(this.user.permissions)) {
        console.log('Auth::Can Объект user.permissions не массив.')
        return false
      }

      return this.user.permissions.includes(permission)
    }.bind(state)
  },
  /**
   * Возвращает true, если пользователь гость, иначе false
   * @returns {boolean}
   */
  isGuest (state) {
    return !Object.keys(state.user).length
  },
  /**
   * Возвращает свойство из state.user, иначе undefined
   * @param {string} property
   * @returns {string, undefined}
   */
  userProperty (state) {
    return function (property) {
      if (Object.prototype.hasOwnProperty.call(state.user, property)) {
        return this.user[property]
      } else {
        return undefined
      }
    }.bind(state)
  },
  /**
   * Возвращает объект страницы для url из файла config свойста PAGES, иначе undefined
   * @param {string} url
   * @returns {object}
   */
  pageConfigByUrl (state) {
    return function (url) {
      for (const page in config.PAGES) {
        if (config.PAGES[page].url === url) {
          return config.PAGES[page]
        }
      }
      return undefined
    }
  }
}
