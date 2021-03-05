<template>
  <div class="page">
    <div class="login-form elevation-3">
      <div class="header">
        Вход (администратор)
      </div>
      <div class="form-content">
        <v-text-field v-model="societyAdminKey" label="Ключ доступа" />
        <v-btn outline @click="login">
          Войти
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'

export default {
  name: 'Index',
  data () {
    return {
      societyAdminKey: ''
    }
  },
  methods: {
    login () {
      if (md5(this.societyAdminKey) === '41bc3629a514ed9651332f89a4f9cdca') {
        localStorage.setItem('society/admin', this.societyAdminKey)
        this.$router.push('/society')
      } else {
        alert('Неверный ключ.')
      }
    }
  }
}
</script>

<style scoped>
.page {
  height: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  flex-wrap: wrap;
}

.header {
  flex: 0 0 50px;
  padding: 5px 10px;
  font-size: 1.3rem;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login-form {
  flex: 0 0 300px;
  display: flex;
  flex-flow: column;
  border: 1px solid #888;
}

.form-content {
  display: flex;
  flex-flow: column;
  padding: 10px 10px;
}
</style>
