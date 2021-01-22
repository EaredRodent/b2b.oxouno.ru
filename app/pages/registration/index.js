import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { isPostSuccessful } from '~/plugins/axios-prepare.js'

export default {
  name: 'Index',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      postForm: {
        client: {
          name: ''
        },
        contact: {
          name: '',
          phone: '',
          login: ''
        }
      },
      offer: false,
      postIndicator: false,
      showConfirmForm: false,
      confirmForm: {
        code: ''
      },
      complete: false
    }
  },
  mounted () {
  },
  methods: {
    parseErrors (errors) {
      const notEmptyErrors = Object
        .entries(errors)
        .filter(v => v[1].length)

      return notEmptyErrors.length
        ? '* ' + notEmptyErrors[0][1][0]
        : ''
    },
    async beginRegister () {
      const formIsValid = await this.$refs.regObserver.validate()
      if (formIsValid) {
        this.register()
      }
    },
    async register () {
      try {
        this.postIndicator = true
        const response = await this.$axios.post('v1/anx-user/b2b-register', this.postForm)
        if (isPostSuccessful(response)) {
          this.complete = true
        }
      } catch (e) {
      } finally {
        this.postIndicator = false
      }
    },
    fillTestData () {
      if (process.env.NODE_ENV !== 'production') {
        this.postForm.client.name = 'Test Organization'
        this.postForm.contact.name = 'Test Manager'
        this.postForm.contact.phone = '89281234567'
        this.postForm.contact.login = 'earedrodent@gmail.com'
      }
    },
    confirm () {
      try {
        this.postIndicator = true
        // const response = await this.$axios.post('v1/anx-user/b2b-register-confirm', this.confirmForm)
        // if (isPostSuccessful(response)) {
        // }
      } finally {
        this.postIndicator = false
      }
    }
  }
}
