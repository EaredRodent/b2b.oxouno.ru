import { isPostSuccessful } from '~/plugins/axios-prepare.js'

export default {
  name: 'FormLogin',
  data () {
    return {
      postIndicator: false,
      loginForm: {
        username: '',
        password: ''
      },
      showPassword: false,
      restoreMode: false,
      restoreForm: {
        login: ''
      },
      restoreFinished: false
    }
  },
  watch: {
    // '$store.state.showLoginDialog'(state) {
    //   this.$nextTick(() => {
    //     if (state) {
    //       this.$refs.loginField.$el.querySelector('input').focus()
    //     }
    //   })
    // }
  },
  destroyed () {
    this.$store.commit('setShowLoginDialog', false)
  },
  methods: {
    async actionLogin () {
      try {
        this.postIndicator = true
        await this.$login(this.loginForm.username, this.loginForm.password, { project: 'b2b' })
      } catch (e) {

      } finally {
        this.postIndicator = false
      }
    },
    autoFill (text) {
      if (process.env.NODE_ENV !== 'production') {
        if (text === 'test') {
          this.loginForm.username = 'test@oxouno.ru'
          this.loginForm.password = '9iq39j'
        }
      }
    },
    async restore () {
      try {
        this.postIndicator = true
        const response = await this.$axios.post('/v1/anx-user/try-restore-user', this.restoreForm)
        if (isPostSuccessful(response)) {
          this.restoreFinished = true
        }
      } finally {
        this.postIndicator = false
      }
    }
  }
}
