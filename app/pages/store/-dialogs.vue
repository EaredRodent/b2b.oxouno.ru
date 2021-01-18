<template>
  <div>
    <dialog-ex v-model="createOrderDialog.state" title="Выбор юр.лица"
               @cancel="createOrderDialog.state = false" @ok="$emit('create-order')">
      <v-select v-model="createOrderDialog.form.client_fk" :items="createOrderDialog.legalEntities"
                item-value="id" item-text="short_name"/>
    </dialog-ex>

    <dialog-ex v-model="sendOrderDialog.state" @cancel="sendOrderClose" title="Оформить заказ"
               :loading="sendOrderDialog.postIndicator" @ok="sendOrderOk">
      <validation-observer ref="observerSendOrder" v-slot="observer">
        <validation-provider name=" " rules="required" v-slot="{errors}">
          <v-text-field v-model="sendOrderDialog.form.transp_comp" label="Транспортная компания"
                        :error-messages="errors"/>
        </validation-provider>

        <validation-provider name=" " rules="required" v-slot="{errors}">
          <v-text-field v-model="sendOrderDialog.form.addr_delivery" label="Адрес доставки"
                        :error-messages="errors"/>
        </validation-provider>

<!--        <v-menu ref="m1" min-width="0" :close-on-content-click="false" full-width>-->
<!--          <template slot="activator">-->
<!--            <v-text-field :value="sendOrderDialog.form.pact_date | formatDateYmd" readonly prepend-icon="event"-->
<!--                          label="Дата отправки" :error-messages="observer.errors.datePicker"/>-->
<!--          </template>-->
<!--          <validation-provider vid="datePicker" name=" " rules="required" v-slot="{errors}">-->
<!--            <v-date-picker v-model="sendOrderDialog.form.pact_date"-->
<!--                           :month-format="translateDate" :header-date-format="translateDate"-->
<!--                           :weekday-format="translateWeekday"-->
<!--                           @input="$refs.m1.save()" scrollable no-title :first-day-of-week="1"/>-->
<!--          </validation-provider>-->
<!--        </v-menu>-->
        <div>
          Есть пожелания по дате отправки заказа или что-то еще, что нам стоит знать? - Укажите в поле ниже.
        </div>
        <v-textarea v-model="sendOrderDialog.form.pact_other" label="Прочие условия"/>
      </validation-observer>
    </dialog-ex>

    <dialog-ex v-model="infoOrderDialog.state" title="Информация"
               @ok="infoOrderDialog.state = false, infoOrderDialog.resolve()"
               @cancel="infoOrderDialog.state = false, infoOrderDialog.reject()">
      <div>
        При подготовке заказа производится резервирование товара.
        По истечении часа заказ будет перемещен в корзину журнала заказов.
        Если Вам нужно больше времени на подготовку заказа - нажмите "Продлить" в окне справа.
      </div>
    </dialog-ex>
  </div>
</template>

<script>
import DialogEx from '~/components/b2b/dialog-ex'
import { translateDate, translateWeekday } from '~/plugins/global-filters'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'dialogs',
  components: { DialogEx, ValidationProvider, ValidationObserver },
  props: ['createOrderDialog', 'sendOrderDialog', 'infoOrderDialog'],
  methods: {
    translateDate,
    translateWeekday,

    sendOrderOk () {
      this.$refs.observerSendOrder.validate().then(formIsValid => {
        if (formIsValid) {
          this.$emit('send-order')
        }
      })
    },

    sendOrderClose () {
      this.$refs.observerSendOrder.reset()
      this.sendOrderDialog.state = false
    }
  }
}
</script>

<style scoped>

</style>
