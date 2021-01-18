<template>
  <v-dialog width="320"
            :value="true"
            :persistent="true">
    <div class="login-dialog">
      <template v-if="restoreMode">
        <div class="ld-header">Восстановление</div>
        <v-text-field color="#37474f" outline label="Логин" v-model="restoreForm.login"
                      name="username"
                      type="email"
                      :disabled="restoreFinished"
                      @input="autoFill"
                      @keypress.enter="restore"/>
        <v-btn class="ld-btn" color="#000" large outline
               :disabled="postIndicator || restoreFinished"
               @click="restore">
          Восстановить
        </v-btn>
        <v-btn class="ld-btn mt-4" color="#000" large outline
               @click="restoreMode = false">
          Вернуться
        </v-btn>
        <div class="mt-4" v-if="restoreFinished">
          <p>
            Письмо с ссылкой для восстановления успешно отправлено!
          </p>
          <p>
            Проверьте вашу почту.
          </p>
        </div>
      </template>
      <template v-else>
        <div class="ld-header">Вход в портал</div>
        <v-text-field color="#37474f" outline label="Логин" v-model="loginForm.username"
                      name="username"
                      type="email"
                      ref="loginField"
                      @input="autoFill"
                      @keypress.enter="actionLogin"/>
        <v-text-field color="#37474f"
                      class="ld-login-btn"
                      outline label="Пароль" v-model="loginForm.password"
                      name="password"
                      :type="showPassword ? 'text' : 'password'"
                      :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                      @keypress.enter="actionLogin"
                      @click:append="showPassword = !showPassword"/>
        <div class="ld-restore-btn">
          <a href="/" @click.prevent="restoreMode = true">
            Забыли пароль?
          </a>
        </div>
        <v-btn class="ld-btn" color="#000" large outline
               :disabled="postIndicator"
               @click="actionLogin">
          Войти
        </v-btn>
        <div class="ld-header mt-4 mb-1">Впервые у нас?</div>
        <v-btn class="ld-btn" color="#000" large outline
               @click="$router.push('/registration')">
          Зарегистрироваться
        </v-btn>
      </template>
      <v-btn class="close-btn" icon large
             @click="$store.commit('setShowLoginDialog', false)">
        <v-icon>
          close
        </v-icon>
      </v-btn>
    </div>
  </v-dialog>
</template>

<script>
import {isPostSuccessful} from '~/plugins/base/axios-prepare'

export default {
  name: "form-login",
  data() {
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
  methods: {
    async actionLogin() {
      this.postIndicator = true
      try {
        await this.$login(this.loginForm.username, this.loginForm.password, {project: 'b2b'})
      } catch (e) {
      }
      this.postIndicator = false
    },
    autoFill(text) {
      if (process.env.NODE_ENV !== 'production') {
        if (text === 'test') {
          this.loginForm.username = 'test@oxouno.ru'
          this.loginForm.password = '9iq39j'
        }
      }
    },
    async restore() {
      this.postIndicator = true
      let response = await this.$axios.post('/v1/anx-user/try-restore-user', this.restoreForm)
      if (isPostSuccessful(response)) {
        this.restoreFinished = true
      }
      this.postIndicator = false
    }
  },
  destroyed() {
    this.$store.commit('setShowLoginDialog', false)
  }
}
</script>

<style scoped>
.login-dialog {
  background: white;
  padding: 20px;
  border-radius: 3px;
  position: relative;
  height: 451px;
}

.ld-btn {
  margin: 0;
  width: 100%;
  color: white;
}

.ld-header {
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 15px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}

.ld-login-btn {
  height: 60px;
  overflow: hidden;
}

.ld-restore-btn {
  padding: 10px 0;
  text-align: right;
}
</style>