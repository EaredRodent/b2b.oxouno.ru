<template>
  <dialog-ex
    v-model="legalEntityDialog.state"
    title="Добавление юр. лица"
    ok-label="Добавить"
    :loading="legalEntityDialog.loading"
    :fullscreen="$isMobile()"
    @ok="add"
  >
    <validation-observer ref="validation">
      <validation-provider v-slot="{ errors }" name="ИНН" rules="required|numeric">
        <v-text-field
          v-model="legalEntityDialog.form.inn"
          label="ИНН"
          color="black"
          :error-messages="errors"
        />
      </validation-provider>

      <validation-provider v-slot="{ errors }" name="Наименование юр. лица" rules="required">
        <v-text-field
          v-model="legalEntityDialog.form.full_name"
          label="Наименование юр. лица"
          color="black"
          :error-messages="errors"
        />
      </validation-provider>

      <validation-provider v-slot="{ errors }" name="КПП">
        <v-text-field
          v-model="legalEntityDialog.form.kpp"
          label="КПП"
          color="black"
          :error-messages="errors"
        />
      </validation-provider>

      <validation-provider v-slot="{ errors }" name="Почтовый индекс" rules="required">
        <v-text-field
          v-model="legalEntityDialog.form.post_index"
          label="Почтовый индекс"
          color="black"
          :error-messages="errors"
        />
      </validation-provider>

      <validation-provider v-slot="{ errors }" name="Юр. адрес" rules="required">
        <v-text-field
          v-model="legalEntityDialog.form.post_address"
          label="Юр. адрес"
          color="black"
          :error-messages="errors"
        />
      </validation-provider>
    </validation-observer>
  </dialog-ex>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import DialogEx from '~/components/dialog-ex/index.vue'

export default {
  name: 'LegalEntityDialog',
  components: { DialogEx, ValidationObserver, ValidationProvider },
  props: {
    legalEntityDialog: {
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
