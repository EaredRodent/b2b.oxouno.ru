<template>
  <div class="a0a-Login" v-if="$isDesktop()">

    <div class="a0a-login" v-if="indexMode === 'login'">

      <img class="a0a-event-banner elevation-2" v-if="event.show" :src="event.banner.middleImage"
           @click="bannerClick">

      <div class="a0a-about">
        <div class="a0a-main-text">
          <img src="/oxouno.svg"/>
          <span class="a0a-b2b">B2B</span>
        </div>
        <div class="a0a-text2">Личный кабинет оптового покупателя</div>
        <div class="a0a-text3">Отдел продаж:</div>
        <div class="a0a-text4">8 800 2 01 01 09</div>
        <div class="a0a-text5">Магазин B2C:</div>
        <span class="a0a-oxouno" @click="openOxouno">oxouno.ru</span>
      </div>

      <div class="a0a-login-form">
        <div class="a0a-brand">Войти в кабинет</div>

        <b-form-group class="a0a-inp" label="Логин:">
          <b-form-input class="a0a-input2" v-model="loginForm.username" type="text" autofocus
                        @keyup.enter="actionLogin"/>
        </b-form-group>

        <b-form-group class="a0a-inp" label="Пароль:">
          <b-form-input class="a0a-input2" v-model="loginForm.password" type="password"
                        @keyup.enter="actionLogin"/>
        </b-form-group>

        <a class="a0a-restore" @click="$store.commit('setRestoreMode')">Забыли пароль?</a>

        <b-button class="a0a-mt-1 a0a-btn-opacity" :disabled="postIndicator" @click="actionLogin">Войти</b-button>

        <div class="a0a-brand a0a-mt-2">Впервые у нас?</div>

        <b-button class="a0a-btn-opacity" @click="$store.commit('setRegistrationMode')">
          Зарегистрироваться
        </b-button>
      </div>
    </div>

    <ValidationObserver class="a0a-registration" tag="div" ref="regObserver" v-slot="regObserver"
                        v-if="indexMode === 'reg'">
      <div class="a0a-about2">
        <div class="a0a-main-text">
          <img src="/oxouno.svg"/>
          <span class="a0a-b2b">B2B</span>
        </div>
        <div class="a0a-text2">Регистрация клиента</div>
        <br>
        <div class="a0a-text_reg">Заполните данные в форме контактной информации, данные о юридических лицах
          и отправьте заявку на регистрацию.
          <br><br>
          После подтверждения регистрации сотрудником отдела продаж, мы вышлем Вам письмо
          с паролем на указанный e-mail
        </div>

        <div class="a0a-text3">Отдел продаж:</div>
        <div class="a0a-text4">8 800 2 01 01 09</div>
        <div class="a0a-text5">Магазин B2C:</div>
        <span class="a0a-oxouno" @click="openOxouno">oxouno.ru</span>
      </div>

      <div class="a0a-h-layout" v-if="!registerFinished">
        <div class="a0a-registration-form">
          <div class="a0a-brand">Контактная информация</div>

          <validation-provider name="Наименование организации:" rules="required|regex:^[^\s].*[^\s]$">
            <b-form-group class="a0a-inp" label="Наименование организации:">
              <b-form-input class="a0a-input2" v-model="regForm.client.name" @keyup.enter="actionRegister"
                            @input="($event === 'test') && fillTestData()"/>
            </b-form-group>
          </validation-provider>

          <validation-provider name="Локация (город, область, край):" rules="required|regex:^[^\s].*[^\s]$">
            <b-form-group class="a0a-inp" label="Локация (город, область, край):">
              <b-form-input class="a0a-input2" v-model="regForm.client.location"
                            @keyup.enter="actionRegister"/>
            </b-form-group>
          </validation-provider>

          <validation-provider name="Планируемая сумма заказа в месяц:" rules="required">
            <b-form-group class="a0a-inp" label="Планируемая сумма заказа в месяц:">
              <b-form-select v-model="regForm.client.plan_summ" :options="planSumVariant"/>
            </b-form-group>
          </validation-provider>

          <validation-provider name="Ф.И.О. контактного лица:" rules="required|regex:^[^\s].*[^\s]$">
            <b-form-group class="a0a-inp" label="Ф.И.О. контактного лица:">
              <b-form-input class="a0a-input2" v-model="regForm.contact.name"
                            @keyup.enter="actionRegister"/>
            </b-form-group>
          </validation-provider>

          <validation-provider name="Телефон:" rules="required|regex:^[^\s].*[^\s]$">
            <b-form-group class="a0a-inp" label="Телефон:">
              <b-form-input class="a0a-input2" v-model="regForm.contact.phone"
                            @keyup.enter="actionRegister"/>
            </b-form-group>
          </validation-provider>

          <validation-provider name="E-Mail:" rules="required|email">
            <b-form-group class="a0a-inp" label="E-Mail (будет использоваться для входа):">
              <b-form-input class="a0a-input2" v-model="regForm.contact.login"
                            @keyup.enter="actionRegister"/>
            </b-form-group>
          </validation-provider>

          <b-form-group class="a0a-inp" label="Комментарий:">
            <b-form-textarea class="a0a-input2" v-model="regForm.client.comment" no-resize :rows="4"
                             @keyup.enter="actionRegister"/>
          </b-form-group>

          <b-button class="a0a-btn-back a0a-btn-opacity" @click="$store.commit('setLoginMode')">
            Я передумал(а)
          </b-button>
        </div>


        <div class="a0a-legal-entity" v-for="(legalEntity, i) in regForm.legalEntities" :key="i">
          <div class="a0a-brand" :style="{visibility: !i ? 'visible' : 'hidden'}">
            {{ regForm.legalEntities.length > 1 ? 'Юридические лица' : 'Юридическое лицо' }}
          </div>

          <validation-provider name="Наименование юр. лица:" rules="required|regex:^[^\s].*[^\s]$">
            <b-form-group class="a0a-inp" label="Наименование юр. лица:">
              <b-form-input class="a0a-input2" v-model="legalEntity.full_name"
                            @keyup.enter="actionRegister"/>
            </b-form-group>
          </validation-provider>

          <validation-provider name="ИНН:" rules="required|numeric">
            <b-form-group class="a0a-inp" label="ИНН:">
              <b-form-input class="a0a-input2" v-model="legalEntity.inn"
                            @keyup.enter="actionRegister"/>
            </b-form-group>
          </validation-provider>

          <validation-provider name="КПП:">
            <b-form-group class="a0a-inp" label="КПП:">
              <b-form-input class="a0a-input2" v-model="legalEntity.kpp"
                            @keyup.enter="actionRegister"/>
            </b-form-group>
          </validation-provider>

          <validation-provider name="Почтовый индекс:" rules="required|regex:^[^\s].*[^\s]$">
            <b-form-group class="a0a-inp" label="Почтовый индекс:">
              <b-form-input class="a0a-input2" v-model="legalEntity.post_index"
                            @keyup.enter="actionRegister"/>
            </b-form-group>
          </validation-provider>

          <validation-provider name="Юр. адрес:" rules="required|regex:^[^\s].*[^\s]$">
            <b-form-group class="a0a-inp" label="Юр. адрес:">
              <b-form-input class="a0a-input2" v-model="legalEntity.post_address"
                            @keyup.enter="actionRegister"/>
            </b-form-group>
          </validation-provider>

          <validation-provider name="Тип продаж:" rules="required">
            <b-form-group class="a0a-inp" label="Тип продаж:">
              <b-form-select v-model="legalEntity.type_sale" :options="typeSaleVariant"/>
            </b-form-group>
          </validation-provider>

          <template v-if="i === regForm.legalEntities.length - 1">
            <div class="a0a-offer">
              <b-form-checkbox class="a0a-offer-text a0a-inp" v-model="regForm.offer">
                Я соглашаюсь с условиями
                <a class="a0a-offer-link" target="_blank" href="/docs/oferta/oferta_11.08.2020.docx">Оферты</a>
              </b-form-checkbox>
            </div>

            <b-button class="a0a-btn-send-reg a0a-btn-opacity" :disabled="postIndicator" @click="actionRegister">
              Отправить заявку на регистрацию
            </b-button>

            <div class="a0a-errors" v-if="i === regForm.legalEntities.length - 1">
              {{ parseErrors(regObserver.errors) }}
            </div>
          </template>

          <v-btn class="a0a-le-remove" icon v-show="i" @click="regForm.legalEntities.splice(i, 1)">
            <v-icon>close</v-icon>
          </v-btn>
        </div>

        <b-button class="a0a-btn-add-le a0a-btn-opacit" @click="addLegalEntity">
          Добавить юр. лицо
        </b-button>
      </div>
      <div class="a0a-registration-finished" v-else>
        <div class="a0a-brand">
          Ваша заявка на регистрацию успешно отправлена! <br>
          <small class="a0a-brand-small">После подтверждения регистрации сотрудником
            <br>отдела продаж мы вышлем Вам письмо <br>
            с логином и паролем на указанный адрес
          </small>
        </div>

        <b-button class="a0a-btn-back-from-success a0a-btn-opacity" @click="$store.commit('setLoginMode')">
          Вернуться на главную
        </b-button>
      </div>
    </ValidationObserver>

    <div class="a0a-registration" v-if="indexMode === 'restore'">
      <div class="a0a-about2">
        <div class="a0a-main-text">
          <img src="/oxouno.svg"/>
          <span class="a0a-b2b">B2B</span>
        </div>
        <div class="a0a-text2">Восстановление пароля</div>
        <br>
        <div class="a0a-text_reg">Укажите почту, используемую для входа в кабинет
          <br><br>
          Письмо с ссылкой восстановления будет отправлено на указанный e-mail
        </div>

        <div class="a0a-text3">Отдел продаж:</div>
        <div class="a0a-text4">8 800 2 01 01 09</div>
        <div class="a0a-text5">Магазин B2C:</div>
        <span class="a0a-oxouno" @click="openOxouno">oxouno.ru</span>
      </div>

      <div class="a0a-login-form">
        <div class="a0a-brand">Контактная информация</div>

        <tamplate v-if="restoreFinished">
          <div class="a0a-restore-finished">
            <span class="a0a-text">
              Письмо с ссылкой для восстановления успешно отправлено!
            </span>
            <br><br>
            <span class="a0a-text">
              Проверьте вашу почту.
            </span>
          </div>
        </tamplate>
        <template v-else>
          <b-form-group class="a0a-inp" label="E-mail:">
            <b-form-input class="a0a-input2" v-model="restoreForm.login" type="text" autofocus
                          @keyup.enter="actionLogin"/>
          </b-form-group>
          <b-button class="a0a-mt-1 a0a-btn-opacity" :disabled="postIndicator" @click="actionRestore">Восстановить
          </b-button>
        </template>

        <br>
        <b-button class="a0a-mt-2 a0a-btn-opacity" @click="$store.commit('setLoginMode')">
          Вернуться на главную
        </b-button>
      </div>
    </div>
  </div>
  <div class="a0a-Login-Phone" v-else-if="$isMobile()">
    <div class="a0a-inner">
      <div class="a0a-logo-box">
        <img class="a0a-svg-p" src="/oxouno.svg">
        <div class="a0a-logo-mini">B2B</div>
      </div>

      <div class="a0a-middle-box">
        <div class="a0a-label">Войти в кабинет</div>

        <b-form-group class="a0a-inp" label="Логин:">
          <b-form-input class="a0a-input2" v-model="loginForm.username" type="text" autofocus
                        @keyup.enter="actionLogin"/>
        </b-form-group>

        <b-form-group class="a0a-inp" label="Пароль:">
          <b-form-input class="a0a-input2" v-model="loginForm.password" type="password"
                        @keyup.enter="actionLogin"/>
        </b-form-group>

        <b-button class="a0a-btn-opacity a0a-m-btn" :disabled="postIndicator" @click="actionLogin">Войти</b-button>
      </div>

      <div class="a0a-bottom-box">
        <span>
          Отдел продаж: <nobr>8 800 2 01 01 09</nobr>
        </span>
        <span>
          Магазин B2C: <nobr>oxouno.ru</nobr>
        </span>
      </div>
    </div>
    <!--    <div class="a0a-main-text-p">-->
    <!--      <div class="a0a-svg-box-p">-->
    <!--        <img class="a0a-svg-p" src="/oxouno.svg"/>-->
    <!--      </div>-->
    <!--      <div class="a0a-b2b-p">B2B</div>-->
    <!--    </div>-->

    <!--    <div class="a0a-text-p a0a-mt2 a0a-brand fdfs">Войти в кабинет</div>-->

    <!--    <b-form-group class="a0a-inp" label="Логин:">-->
    <!--      <b-form-input class="a0a-input2" v-model="loginForm.username" type="text" autofocus-->
    <!--                    @keyup.enter="actionLogin"/>-->
    <!--    </b-form-group>-->

    <!--    <b-form-group class="a0a-inp" label="Пароль:">-->
    <!--      <b-form-input class="a0a-input2" v-model="loginForm.password" type="password"-->
    <!--                    @keyup.enter="actionLogin"/>-->
    <!--    </b-form-group>-->

    <!--    <a class="a0a-restore" @click="$store.commit('setRestoreMode')">Забыли пароль?</a>-->

    <!--    <b-button class="a0a-mt-1 a0a-btn-opacity" :disabled="postIndicator" @click="actionLogin">Войти</b-button>-->

    <!--    <div class="a0a-brand a0a-mt-2">Впервые у нас?</div>-->

    <!--    <b-button class="a0a-btn-opacity" @click="$store.commit('setRegistrationMode')">-->
    <!--      Зарегистрироваться-->
    <!--    </b-button>-->

    <!--    <div class="a0a-mt">-->
    <!--      Отдел продаж:-->
    <!--      8 800 2 01 01 09-->
    <!--    </div>-->

    <!--    <div>-->
    <!--      Магазин B2C:-->
    <!--      oxouno.ru-->
    <!--    </div>-->
  </div>
</template>

<script>
import config from '~/config/base-config'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { isPostSuccessful } from '~/plugins/base/axios-prepare'

export const MixinEvent = {
  data () {
    return {
      event: config.APP.event
    }
  },
  methods: {
    bannerClick () {
      window.open(this.event.banner.bigImage)
    }
  }
}

function LegalEntity () {    // Юр.лицо
  this.full_name = ''
  this.inn = ''           // ИНН
  this.kpp = ''           // КПП
  this.post_index = ''    // Почтовый индекс
  this.post_address = ''
  this.type_sale = ''
}

export default {
  name: 'login',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [
    MixinEvent
  ],
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      regForm: {
        client: {
          name: '',
          location: '',
          comment: '',
          plan_summ: ''
        },
        contact: {
          name: '',
          phone: '',
          login: '',
        },
        legalEntities: [],
        offer: false,
        reCaptchaToken: ''
      },
      registerFinished: false,
      planSumVariant: [
        { value: 'small', text: 'Менее 100 000 руб.' },
        { value: 'medium', text: 'От 100 000 руб. до 500 000 руб.' },
        { value: 'large', text: 'Более 500 000 руб.' }
      ],
      typeSaleVariant: [
        { value: 'wholesale', text: 'Опт' },
        { value: 'retail', text: 'Розница' },
        { value: 'eshop', text: 'Интернет магазин' },
      ],
      postIndicator: false, // Индикатор в кнопке (ожидание ответа на запрос логина/регистрации)
      restoreForm: {
        login: ''
      },
      restoreFinished: false
    }
  },
  computed: {
    indexMode () {
      return this.$store.state.indexMode
    }
  },
  mounted () {
    this.addLegalEntity()
  },
  methods: {
    async actionLogin () {
      this.postIndicator = true
      try {
        await this.$login(this.loginForm.username, this.loginForm.password, { project: 'b2b' })
      } catch (e) {
      }
      this.postIndicator = false
    },
    async actionRegister () {
      this.$refs.regObserver.validate().then((formIsValid) => {
        if (!formIsValid) {
          return
        }

        if (config.MODE.envDev) {
          this.actionRegisterRequest()
          return
        }

        grecaptcha.ready(async () => {
          let token = await grecaptcha.execute('6LdlobwUAAAAACF6kKuXH4LNB5_hOw_WujsL1NCO', { action: 'register' })
          this.regForm.reCaptchaToken = token

          this.actionRegisterRequest()
        })
      })
    },
    async actionRegisterRequest () {
      this.postIndicator = true
      try {
        let response = await this.$axios.post('v1/anx-user/b2b-register', {
          client: JSON.stringify(this.regForm.client),
          contact: JSON.stringify(this.regForm.contact),
          legalEntities: JSON.stringify(this.regForm.legalEntities),
          offer: this.regForm.offer,
          reCaptchaToken: this.regForm.reCaptchaToken
        })
        if (isPostSuccessful(response)) {
          this.registerFinished = true
        }
      } catch (e) {
      }
      this.postIndicator = false
    },
    addLegalEntity () {
      this.regForm.legalEntities.push(new LegalEntity)
    },
    parseErrors (errors) {
      let resStr = ''
      let errors2 = Object.entries(errors).filter(v => v[1].length)
      if (errors2.length) {
        resStr = '* ' + errors2[0][1][0]
      }
      return resStr
    },
    fillTestData () {
      // this.regForm.client.name = 'ООО Вектор'
      // this.regForm.client.location = 'Ростов-На-Дону'
      // this.regForm.client.plan_summ = 'medium'
      // this.regForm.client.comment = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.'
      //
      // this.regForm.contact.name = 'Таня Петрова'
      // this.regForm.contact.phone = '89281234567'
      // this.regForm.contact.login = 'vvv@mmail.ru'
      //
      // this.regForm.legalEntities[0].full_name = 'Света Иванова'
      // this.regForm.legalEntities[0].inn = '400400500500'
      // this.regForm.legalEntities[0].kpp = '111122223333'
      // this.regForm.legalEntities[0].post_index = '500600'
      // this.regForm.legalEntities[0].post_address = 'Ростов-На-Дону, пер. Московский, дом 11б.'
      // this.regForm.legalEntities[0].type_sale = 'retail'

      this.regForm.client.name = 'Переедрий'
      this.regForm.client.location = 'Коаснодар'
      this.regForm.client.plan_summ = 'medium'
      this.regForm.client.comment = ''

      this.regForm.contact.name = 'Менеджер передерия'
      this.regForm.contact.phone = '89281234567'
      this.regForm.contact.login = 'accnotfake@gmail.com'

      this.regForm.legalEntities[0].full_name = 'ИП Передерий'
      this.regForm.legalEntities[0].inn = '231104902680'
      this.regForm.legalEntities[0].kpp = ''
      this.regForm.legalEntities[0].post_index = '350072'
      this.regForm.legalEntities[0].post_address = 'Ростов-На-Дону, пер. Московский, дом 11б.'
      this.regForm.legalEntities[0].type_sale = 'opt'
    },
    openOxouno () {
      window.open('//oxouno.ru')
    },
    async actionRestore () {
      this.postIndicator = true
      let response = await this.$axios.post('/v1/anx-user/try-restore-user', this.restoreForm)
      if (isPostSuccessful(response)) {
        this.restoreFinished = true
      }
      this.postIndicator = false
    }
  }
}
</script>
