<template>
  <dialog-ex
    v-model="changePasswordDialog.state"
    title="Изменение пароля"
    ok-label="Изменить"
    :loading="changePasswordDialog.loading"
    :fullscreen="$isMobile()"
    @ok="change"
  >
    <div class="pass-info">
      Для замены пароля - используйте символы русского или английского алфавитов, а также цифры.
    </div>
    <validation-observer ref="validation">
      <validation-provider v-slot="{ errors }" name="Старый пароль" rules="required">
        <v-text-field
          v-model="changePasswordDialog.form.oldPassword"
          label="Старый пароль"
          :error-messages="errors"
          type="password"
          @change="fieldChange"
        />
      </validation-provider>

      <validation-provider v-slot="{ errors }" name="Новый пароль" rules="required|regex:^[a-zA-Zа-яА-Я0-9]*$">
        <v-text-field
          v-model="changePasswordDialog.form.newPassword"
          label="Новый пароль"
          :error-messages="errors"
          type="password"
          @change="fieldChange"
        />
      </validation-provider>

      <validation-provider v-slot="{ errors }" name="Новый пароль (подтвердите)" rules="required|regex:^[a-zA-Zа-яА-Я0-9]*$">
        <v-text-field
          v-model="changePasswordDialog.form.newPasswordRepeat"
          label="Новый пароль (подтвердите)"
          :error-messages="errors"
          type="password"
          @change="fieldChange"
        />
      </validation-provider>
    </validation-observer>
    <div v-if="error" class="x-errors">
      {{ error }}
    </div>
  </dialog-ex>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import DialogEx from '~/components/dialog-ex'

export default {
  name: 'ChangePasswordDialog',
  components: { DialogEx, ValidationObserver, ValidationProvider },
  props: {
    changePasswordDialog: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      error: ''
    }
  },
  methods: {
    fieldChange () {
      this.error = ''
      if (this.changePasswordDialog.form.oldPassword === this.changePasswordDialog.form.newPassword) {
        this.error = 'Новый пароль совпадает со старым.'
        return
      }
      if (this.changePasswordDialog.form.newPassword !== this.changePasswordDialog.form.newPasswordRepeat) {
        this.error = 'Поле "Новый пароль (подтвердите)" не совпадает с полем "новый пароль"'
      }
    },
    async change () {
      const formIsValid = await this.$refs.validation.validate()
      if (!formIsValid) { return }
      this.$axios.post('/v1/anx-user/change-password', {
        oldPassword: this.changePasswordDialog.form.oldPassword,
        newPassword: this.changePasswordDialog.form.newPassword
      })
    }
  }
}
</script>

<style scoped>
 .pass-info {
   padding: 10px 0;
   font-style: italic;
 }

 .x-errors {
   margin-top: 10px;
   background: #fee;
   color: #e33;
   padding: 10px;
 }
</style>
