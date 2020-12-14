<template>
  <div class="a11-Restore">
    <div class="a11-box">
      <div class="a11-title" v-if="success">Пароль восстановлен!</div>
      <div class="a11-title" v-else>Восстановление пароля, подождите...</div>
      <div class="a11-success" v-if="success">
        <div class="a11-about">
          Письмо с новым паролем отправлено на вашу почту.
        </div>
        <a class="a11-link" href="/">Нажмите для входа в B2B-кабинет...</a>
      </div>
    </div>
  </div>
</template>

<script>
import { isPostSuccessful } from '~/plugins/base/axios-prepare'

export default {
  name: 'index',
  data() {
    return {
      success: false
    }
  },
  async mounted () {
    let response = await this.$axios.post('/v1/anx-user/restore-user', { restore_id: this.$route.query.restore_id })

    if (isPostSuccessful(response)) {
      document.cookie = 'accesstoken=' + response.data.accesstoken
      this.success = true
    } else {
      window.location = '/'
    }
  }
}
</script>
