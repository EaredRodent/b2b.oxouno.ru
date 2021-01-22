export default function (inject) {
  inject('login', function (username, password, additionParams = {}) {
    const store = this.$store || this.store
    return store.dispatch('auth/login', {
      username,
      password,
      additionParams
    })
  })

  inject('logout', function () {
    const store = this.$store || this.store
    return store.dispatch('auth/logout')
  })

  inject('registration', function (username, password, additionParams = {}) {
    const store = this.$store || this.store
    return store.dispatch('auth/registration', {
      username,
      password,
      additionParams
    })
  })

  inject('authentication', function () {
    const store = this.$store || this.store
    return store.dispatch('auth/authentication')
  })

  inject('can', function (permission) {
    const store = this.$store || this.store
    return store.getters['auth/can'](permission)
  })

  inject('isGuest', function () {
    const store = this.$store || this.store
    return store.getters['auth/isGuest']
  })

  inject('userProperty', function (property) {
    const store = this.$store || this.store
    return store.getters['auth/userProperty'](property)
  })

  inject('pageConfigByUrl', function (url) {
    const store = this.$store || this.store
    return store.getters['auth/pageConfigByUrl'](url)
  })
}
