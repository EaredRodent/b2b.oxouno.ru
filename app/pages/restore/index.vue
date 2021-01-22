<template>
  <div class="x-restore" :is-mobile="$isMobile()">
    <div>
      <template v-if="success">
        <div class="x-title">
          Пароль восстановлен!
        </div>
        <div>
          <p>
            Письмо с новым паролем отправлено на вашу почту.
          </p>
          <a class="" href="/">Нажмите для входа в B2B-портал...</a>
        </div>
      </template>
      <div v-else class="x-title">
        Восстановление учетной записи, подождите...
      </div>
    </div>
  </div>
</template>

<script>
import { isPostSuccessful } from '~/plugins/axios-prepare.js'

export default {
  name: 'Index',
  data () {
    return {
      success: false
    }
  },
  async mounted () {
    const response = await this.$axios.post(
      '/v1/anx-user/restore-user',
      { restore_id: this.$route.query.restore_id }
    )

    if ((this.success = isPostSuccessful(response))) {
      localStorage.setItem('accesstoken', response.data.accesstoken)
    } else {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="less">
.x-restore {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.x-restore[is-mobile] {
  text-align: center;
}

.x-title {
  font-size: 25px;
  margin-bottom: 20px;
}
</style>
