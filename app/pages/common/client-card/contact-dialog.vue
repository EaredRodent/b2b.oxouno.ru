<template>
  <dialog-ex
    v-model="contactDialog.state"
    title="Добавление контактного лица"
    ok-label="Добавить"
    :loading="contactDialog.loading"
    :fullscreen="$isMobile()"
    @ok="add"
  >
    <validation-observer ref="validation">
      <validation-provider v-slot="{ errors }" name="Ф.И.О." rules="required">
        <v-text-field
          v-model="contactDialog.form.name"
          label="Ф.И.О."
          :error-messages="errors"
          @keyup.enter="beginRegister"
          @input="$event === 'test' && fillTestData()"
        />
      </validation-provider>

      <validation-provider v-slot="{ errors }" name="Телефон" rules="required">
        <v-text-field
          v-model="contactDialog.form.phone"
          v-mask="'+#(###)###-##-##'"
          label="Телефон"
          :error-messages="errors"
          type="tel"
          @keyup.enter="beginRegister"
        />
      </validation-provider>

      <validation-provider v-slot="{ errors }" name="E-Mail" rules="required|email">
        <v-text-field
          v-model="contactDialog.form.login"
          label="E-Mail"
          :error-messages="errors"
          @keyup.enter="beginRegister"
        />
      </validation-provider>
    </validation-observer>
  </dialog-ex>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import DialogEx from '~/components/dialog-ex/index.vue'

export default {
  name: 'ContactDialog',
  components: { DialogEx, ValidationObserver, ValidationProvider },
  props: {
    contactDialog: {
      type: Object,
      required: true
    }
  },
  methods: {
    async add () {
      const formIsValid = await this.$refs.validation.validate()
      if (formIsValid) {
        this.$emit('add')
      }
    }
  }
}
</script>

<style scoped>

</style>
