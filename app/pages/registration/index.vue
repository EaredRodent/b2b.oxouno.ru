<template>
  <div class="registration">
    <div class="btn-container" :mobile="$isMobile()">
      <v-btn class="back-btn" outline @click="$router.push('/')">
        <v-icon>keyboard_backspace</v-icon>
        Вернуться на главную
      </v-btn>
    </div>
    <div class="inner">
      <div v-if="registerFinished" class="form">
        <div class="form-header">Успех!</div>
        <div>
          Ваша заявка на регистрацию успешно отправлена!<br><br>
          После подтверждения регистрации сотрудником
          отдела продаж мы вышлем Вам письмо
          с логином и паролем на указанный адрес.
        </div>
      </div>
      <validation-observer class="form" v-else ref="regObserver" v-slot="regObserver">
        <div class="form-header">Регистрация</div>
        <div class="mini-header">Контактное лицо</div>

        <validation-provider name="Ф.И.О. контактного лица" rules="required|regex:^[^\s].*[^\s]$">
          <v-text-field label="Ф.И.О. контактного лица" v-model="regForm.contact.name"
                        @keyup.enter="actionRegister"
                        @input="$event === 'test' && fillTestData()"/>
        </validation-provider>

        <validation-provider name="Телефон" rules="required|regex:^[^\s].*[^\s]$">
          <v-text-field label="Телефон" v-model="regForm.contact.phone"
                        @keyup.enter="actionRegister"/>
        </validation-provider>

        <validation-provider name="E-Mail" rules="required|email">
          <v-text-field label="E-Mail" v-model="regForm.contact.login"
                        @keyup.enter="actionRegister"/>
        </validation-provider>

        <v-textarea label="" label="Комментарий" v-model="regForm.client.comment"
                    @keyup.enter="actionRegister"/>

        <div class="mini-header">Организация</div>

        <validation-provider name="Наименование организации" rules="required|regex:^[^\s].*[^\s]$">
          <v-text-field label="Наименование организации" v-model="regForm.client.name" @keyup.enter="actionRegister"
                        @input="($event === 'test') && fillTestData()"/>
        </validation-provider>

        <validation-provider name="Локация (город, область, край)" rules="required|regex:^[^\s].*[^\s]$">
          <v-text-field label="Локация (город, область, край)" v-model="regForm.client.location"
                        @keyup.enter="actionRegister"/>
        </validation-provider>

        <validation-provider name="Планируемая сумма заказа в месяц" rules="required">
          <v-select label="Планируемая сумма заказа в месяц" v-model="regForm.client.plan_summ" :items="planSumVariant"/>
        </validation-provider>

        <div class="mini-header">
          {{ regForm.legalEntities.length > 1 ? 'Юридические лица' : 'Юридическое лицо' }}
        </div>

        <div v-for="(legalEntity, i) in regForm.legalEntities" :key="i">
          <validation-provider name="Наименование юр. лица" rules="required|regex:^[^\s].*[^\s]$">
            <v-text-field label="Наименование юр. лица" v-model="legalEntity.full_name"
                          @keyup.enter="actionRegister"/>
          </validation-provider>

          <validation-provider name="ИНН" rules="required|numeric">
            <v-text-field label="ИНН" v-model="legalEntity.inn"
                          @keyup.enter="actionRegister"/>
          </validation-provider>

          <validation-provider name="КПП">
            <v-text-field label="КПП" v-model="legalEntity.kpp"
                          @keyup.enter="actionRegister"/>
          </validation-provider>

          <validation-provider name="Почтовый индекс" rules="required|regex:^[^\s].*[^\s]$">
            <v-text-field label="Почтовый индекс" v-model="legalEntity.post_index"
                          @keyup.enter="actionRegister"/>
          </validation-provider>

          <validation-provider name="Юр. адрес" rules="required|regex:^[^\s].*[^\s]$">
            <v-text-field label="Юр. адрес" v-model="legalEntity.post_address"
                          @keyup.enter="actionRegister"/>
          </validation-provider>

          <validation-provider name="Тип продаж" rules="required">
            <v-select label="Тип продаж" v-model="legalEntity.type_sale" :items="typeSaleVariant"/>
          </validation-provider>

          <v-btn color="primary" icon v-show="i" @click="regForm.legalEntities.splice(i, 1)">
            <v-icon>close</v-icon>
          </v-btn>
        </div>

        <div class="offer">
          Ознакомьтесь с текстом <a target="_blank" href="/docs/oferta/oferta_11.08.2020.docx">данной оферты</a>.
          <v-checkbox color="primary" v-model="offer" label="Я соглашаюсь с условиями оферты"/>
        </div>

        <div class="errors" v-show="parseErrors(regObserver.errors)">
          {{ parseErrors(regObserver.errors) }}
        </div>

        <v-btn class="send-btn" color="primary" :disabled="postIndicator || !offer" @click="actionRegister">
          Отправить заявку на регистрацию
        </v-btn>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import { isPostSuccessful } from '~/plugins/base/axios-prepare'

class LegalEntity {    // Юр.лицо
  full_name = ''
  inn = ''           // ИНН
  kpp = ''           // КПП
  post_index = ''    // Почтовый индекс
  post_address = ''
  type_sale = ''
}

export default {
  name: "index",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
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
        reCaptchaToken: ''
      },
      offer: false,
      planSumVariant: [
        {value: 'small', text: 'Менее 100 000 руб.'},
        {value: 'medium', text: 'От 100 000 руб. до 500 000 руб.'},
        {value: 'large', text: 'Более 500 000 руб.'}
      ],
      typeSaleVariant: [
        {value: 'wholesale', text: 'Опт'},
        {value: 'retail', text: 'Розница'},
        {value: 'eshop', text: 'Интернет магазин'},
      ],
      postIndicator: false,
      registerFinished: false
    }
  },
  created() {
    this.addLegalEntity()
  },
  methods: {
    addLegalEntity() {
      this.regForm.legalEntities.push(new LegalEntity)
    },
    parseErrors(errors) {
      let resStr = ''
      let errors2 = Object.entries(errors).filter(v => v[1].length)
      if (errors2.length) {
        resStr = '* ' + errors2[0][1][0]
      }
      return resStr
    },
    async actionRegister() {
      this.$refs.regObserver.validate().then((formIsValid) => {
        if (!formIsValid) {
          return
        }
        // grecaptcha.ready(async () => {
        //   this.regForm.reCaptchaToken = await grecaptcha.execute(
        //       '6LdlobwUAAAAACF6kKuXH4LNB5_hOw_WujsL1NCO',
        //       {action: 'register'}
        //   )
        //   this.actionRegisterRequest()
        // })
        this.actionRegisterRequest()
      })
    },
    async actionRegisterRequest() {
      this.postIndicator = true
      try {
        let response = await this.$axios.post('v1/anx-user/b2b-register', {
          client: JSON.stringify(this.regForm.client),
          contact: JSON.stringify(this.regForm.contact),
          legalEntities: JSON.stringify(this.regForm.legalEntities)
        })
        if (isPostSuccessful(response)) {
          this.registerFinished = true
        }
      } catch (e) {
      }
      this.postIndicator = false
    },
    fillTestData () {
      if(process.env.NODE_ENV !== 'production') {
        this.regForm.client.name = 'Test Organization'
        this.regForm.client.location = 'Таганрог'
        this.regForm.client.plan_summ = 'medium'
        this.regForm.client.comment = 'Del me pls'
        this.regForm.contact.name = 'Test Manager'
        this.regForm.contact.phone = '89281234567'
        this.regForm.contact.login = 'earedrodent@gmail.com'
        this.regForm.legalEntities[0].full_name = 'ИП Test'
        this.regForm.legalEntities[0].inn = '112233445566'
        this.regForm.legalEntities[0].kpp = ''
        this.regForm.legalEntities[0].post_index = '111222'
        this.regForm.legalEntities[0].post_address = 'Ростов-На-Дону, пер. Московский, дом 11б.'
        this.regForm.legalEntities[0].type_sale = 'wholesale'
      }
    }
  }
}
</script>

<style scoped>
::v-deep label {
  margin-bottom: 0 !important;
}

.registration {
  height: 100%;
  display: flex;
  flex-flow: column;
}

.inner {
  flex: 1 0 0;
  overflow: auto;
  display: flex;
  justify-content: center;
}

.form {
  width: 300px;
}

.form-header {
  font-size: 22px;
}

.mini-header {
  margin-top: 20px;
  font-size: 18px;
}

.send-btn {
  margin: 20px 0 90px 0;
  width: 100%;
}

.errors {
  margin-top: 20px;
  background: #fdd;
  color: #f44;
  padding: 10px;
}

.offer {
  margin-top: 50px;
}

.btn-container {
  flex: 0 0 auto;
  display: flex;
  /*justify-content: start;*/
  padding: 15px 40px 10px 40px;
}

.btn-container[mobile] {
  justify-content: center;
  padding: 15px 0 10px 0;
}

.back-btn {
  margin: 0;
}
</style>