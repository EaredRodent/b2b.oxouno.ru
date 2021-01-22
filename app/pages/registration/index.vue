<template>
  <div class="x-registration">
    <div class="x-btn-container" :mobile="$isMobile()">
      <v-btn class="x-back-btn" outline @click="$router.push('/')">
        <v-icon>keyboard_backspace</v-icon>
        Вернуться на главную
      </v-btn>
    </div>
    <div class="x-form-container">
      <div v-if="complete">
        <div class="x-form-header">
          Готово
        </div>
        <div class="x-form-mt">
          <p>
            Ваша заявка на регистрацию успешно отправлена!
          </p>
          <p>
            Данные для входа в учетную запись OXOUNO отправлены на ваш телефон ({{ postForm.contact.phone }}).
          </p>
        </div>
      </div>
      <div v-else-if="showConfirmForm" class="x-form">
        <div class="x-form-header">
          Подтверждение
        </div>
        <div class="x-form-mt">
          <p>
            Ваша заявка на регистрацию успешно отправлена!
          </p>
          <p>
            Введите шестизначный код, отправленный на номер телефона {{ postForm.contact.phone }}, в поле ниже.
          </p>
        </div>
        <v-text-field
          v-model="confirmForm.code"
          label="Код подтверждения"
          @keyup.enter="confirm"
        />
        <v-btn class="x-send-btn" color="primary" :disabled="postIndicator" @click="confirm">
          Подтвердить
        </v-btn>
      </div>
      <validation-observer v-else ref="regObserver" v-slot="regObserver" class="x-form">
        <div class="x-form-header">
          Регистрация
        </div>

        <validation-provider name="Ф.И.О." rules="required|min:5|regex:^[^\s].*[^\s]$">
          <v-text-field
            v-model="postForm.contact.name"
            label="Ф.И.О."
            @keyup.enter="beginRegister"
            @input="$event === 'test' && fillTestData()"
          />
        </validation-provider>

        <validation-provider name="Телефон" rules="required|min:5|regex:^[^\s].*[^\s]$">
          <v-text-field
            v-model="postForm.contact.phone"
            label="Телефон"
            type="tel"
            @keyup.enter="beginRegister"
          />
        </validation-provider>

        <validation-provider name="E-Mail" rules="required|min:5|email">
          <v-text-field
            v-model="postForm.contact.login"
            label="E-Mail"
            @keyup.enter="beginRegister"
          />
        </validation-provider>

        <validation-provider name="Наименование организации" rules="required|min:3|regex:^[^\s].*[^\s]$">
          <v-text-field
            v-model="postForm.client.name"
            label="Наименование организации"
            @keyup.enter="actionRegister"
          />
        </validation-provider>

        <!--        <div class="x-offer">-->
        <!--          Ознакомьтесь с текстом <a target="_blank" href="/docs/oferta/oferta_11.08.2020.docx">данной оферты</a>.-->
        <!--          <v-checkbox v-model="offer" color="primary" label="Я соглашаюсь с условиями оферты" />-->
        <!--        </div>-->

        <div v-show="parseErrors(regObserver.errors)" class="x-errors">
          {{ parseErrors(regObserver.errors) }}
        </div>

        <v-btn class="x-send-btn" color="primary" :disabled="postIndicator" @click="beginRegister">
          Отправить заявку на регистрацию
        </v-btn>
      </validation-observer>
    </div>
  </div>
</template>

<script>
export { default } from './index.js'
</script>

<style scoped lang="less">
@import "index";
</style>
