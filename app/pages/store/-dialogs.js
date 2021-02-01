import { ValidationObserver, ValidationProvider } from 'vee-validate'
import VueCustomScrollbar from 'vue-custom-scrollbar'
import DialogEx from '~/components/dialog-ex/index.vue'
import { translateDate, translateWeekday } from '~/plugins/global-filters.js'

export default {
  name: 'Dialogs',
  components: {
    DialogEx,
    ValidationProvider,
    ValidationObserver,
    VueCustomScrollbar
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['sendOrderDialog', 'infoOrderDialog', 'createLegalEntityDialog'],
  methods: {
    translateDate,
    translateWeekday,
    sendOrderOk () {
      this.$refs.observerSendOrder.validate().then((formIsValid) => {
        if (formIsValid) {
          this.$emit('send-order')
        }
      })
    },

    sendOrderClose () {
      this.$refs.observerSendOrder.reset()
      this.sendOrderDialog.state = false
    },
    async createLEOk () {
      if (await this.$refs.createLEObserver.validate()) {
        this.$emit('create-legal-entities')
      }
    }
  }
}
