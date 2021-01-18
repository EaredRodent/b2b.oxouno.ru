import config from '@/config/base-config'

export const state = function () {
  return {
    /**
     * Данные пользователя
     * @property {object} user пользователь
     */
    user: {}
  }
}

export const mutations = {
  setUser (state, user) {
    state.user = user
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
  login ({ commit, getters }, { username, password, additionParams = {} }) {
    return new Promise(async (resolve, reject) => {
      // try {
      let { data: { accesstoken } } = await this.$axios.post('v1/anx-user/login', {
        username,
        password,
        ...additionParams
      })

      if (!accesstoken) {
        reject(new Error('Login failed'))
        return
      }
      this.$axios.setToken(accesstoken, 'Bearer')
      localStorage.setItem('accesstoken', accesstoken)
      let { data: user } = await this.$axios.get('v1/anx-user/bootstrap')

      if (!user) {
        reject(new Error('Bootstrap failed'))
        return
      }
      commit('setUser', user)
      this.$router.push(config.ROLES[getters['userProperty']('role')].startPage.url)
      resolve()
    })
  },
  /**
   * Логаут пользователя с переходом на logoutPage из config PAGES
   * @param commit
   * @param getters
   */
  logout ({ commit, getters }) {
    let role = getters['userProperty']('role')
    commit('setUser', {})
    this.$axios.setToken(null)
    localStorage.removeItem('accesstoken')
    if (role) {
      this.$router.push(config.ROLES[role].logoutPage.url)
    }
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
  registration (store, { username, password, additionParams = {} }) {
    return new Promise(async (resolve, reject) => {
      // Попытка регистрации

      try {
        const { data } = await this.$axios.post(
          'v1/anx-user/registration',
          {
            username,
            password,
            ...additionParams
          }
        )

        // В случае успеха

        resolve(data)
      } catch (e) {
        // В ином случае

        reject(e)
      }
    })
  },
  authentication ({ commit, dispatch }) {
    return new Promise(async (resolve, reject) => {
      // if(this.$cookies.get('accesstoken')) {
      //   this.$cookies.remove('accesstoken')
      // }
      let accesstoken = localStorage.getItem('accesstoken')
      if (accesstoken) {
        try {
          this.$axios.setToken(accesstoken, 'Bearer')
          let { data: user } = await this.$axios.get('v1/anx-user/bootstrap')
          commit('setUser', user)
          resolve()
        } catch (e) {
          dispatch('logout')
          reject(e)
        }
      }
      resolve()
    })
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
      if (!this.user) {
        console.log('Auth: user не объект.')
        return false
      }
      if (!this.user.hasOwnProperty('permissions')) {
        console.log('Auth: Объект user не имеет поля permissions.')
        return false
      }
      if (!Array.isArray(this.user.permissions)) {
        console.log('Auth: Объект user.permissions не массив.')
        return false
      }

      for (let permission of this.user.permissions) {
        if (typeof permission !== 'string') {
          console.log(`Auth: Массив user.permissions должен состоять из строк, а не ${typeof permission}`)
          return false
        }
      }
      return this.user.permissions.indexOf(permission) !== -1
    }.bind(state)
  },
  /**
   * Возвращает true, если пользователь гость, иначе false
   * @returns {boolean}
   */
  isGuest (state) {
    return (JSON.stringify(state.user) === '{}') || (!state.user)
  },
  /**
   * Возвращает свойство из state.user, иначе undefined
   * @param {string} property
   * @returns {string, undefined}
   */
  userProperty (state) {
    return function (property) {
      if (this.user && this.user.hasOwnProperty(property)) {
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
      for (let page in config.PAGES) {
        if (config.PAGES[page].url === url) {
          return config.PAGES[page]
        }
      }
      return undefined
    }
  }
}
