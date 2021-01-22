<template>
  <v-dialog
    width="320"
    :value="true"
    :persistent="true"
  >
    <div class="login-dialog">
      <template v-if="restoreMode">
        <div class="ld-header">
          Восстановление
        </div>
        <v-text-field
          v-model="restoreForm.login"
          color="#37474f"
          outline
          label="Логин"
          name="username"
          type="email"
          :disabled="restoreFinished"
          @input="autoFill"
          @keypress.enter="restore"
        />
        <v-btn
          class="ld-btn"
          color="#000"
          large
          outline
          :disabled="postIndicator || restoreFinished"
          @click="restore"
        >
          Восстановить
        </v-btn>
        <v-btn
          class="ld-btn mt-4"
          color="#000"
          large
          outline
          @click="restoreMode = false"
        >
          Вернуться
        </v-btn>
        <div v-if="restoreFinished" class="mt-4">
          <p>
            Сообщение с ссылкой для восстановления успешно отправлено!
          </p>
          <p>
            Проверьте ваши сообщения.
          </p>
        </div>
      </template>
      <template v-else>
        <div class="ld-header">
          Вход в портал
        </div>
        <v-text-field
          ref="loginField"
          v-model="loginForm.username"
          color="#37474f"
          outline
          label="Логин"
          name="username"
          type="email"
          @input="autoFill"
          @keypress.enter="actionLogin"
        />
        <v-text-field
          v-model="loginForm.password"
          color="#37474f"
          class="ld-login-btn"
          outline
          label="Пароль"
          name="password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'visibility_off' : 'visibility'"
          @keypress.enter="actionLogin"
          @click:append="showPassword = !showPassword"
        />
        <div class="ld-restore-btn">
          <a href="/" @click.prevent="restoreMode = true">
            Забыли пароль?
          </a>
        </div>
        <v-btn
          class="ld-btn"
          color="#000"
          large
          outline
          :disabled="postIndicator"
          @click="actionLogin"
        >
          Войти
        </v-btn>
        <div class="ld-header mt-4 mb-1">
          Впервые у нас?
        </div>
        <v-btn
          class="ld-btn"
          color="#000"
          large
          outline
          @click="$router.push('/registration')"
        >
          Зарегистрироваться
        </v-btn>
      </template>
      <v-btn
        class="close-btn"
        icon
        large
        @click="$store.commit('setShowLoginDialog', false)"
      >
        <v-icon>
          close
        </v-icon>
      </v-btn>
    </div>
  </v-dialog>
</template>

<script>
export { default } from './-form-login.js'
</script>

<style scoped lang="less">
@import "-form-login";
</style>
