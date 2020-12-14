import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import VeeValidateRu from 'vee-validate/dist/locale/ru'

export default function (context) {
  Vue.use(VeeValidate, {
    events: '',
    mode: 'eager'
  })
  Validator.localize('ru', VeeValidateRu)
}
