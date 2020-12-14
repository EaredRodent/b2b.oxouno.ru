import Vue from 'vue'

export default function (inject) {
  inject('login', function (username, password, additionParams = {}) {
    let store = this.$store || this.store
    return store.dispatch('base/auth/login', { username, password, additionParams })
  })

  inject('logout', function () {
    let store = this.$store || this.store
    return store.dispatch('base/auth/logout')
  })

  inject('registration', function (username, password, additionParams = {}) {
    let store = this.$store || this.store
    return store.dispatch('base/auth/registration', { username, password, additionParams })
  })

  inject('authentication', function () {
    let store = this.$store || this.store
    return store.dispatch('base/auth/authentication')
  })

  inject('can', function (permission) {
    let store = this.$store || this.store
    return store.getters['base/auth/can'](permission)
  })

  inject('isGuest', function () {
    let store = this.$store || this.store
    return store.getters['base/auth/isGuest']
  })

  inject('userProperty', function (property) {
    let store = this.$store || this.store
    return store.getters['base/auth/userProperty'](property)
  })

  inject('pageConfigByUrl', function (url) {
    let store = this.$store || this.store
    return store.getters['base/auth/pageConfigByUrl'](url)
  })
}
