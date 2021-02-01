<template>
  <div>
    <dialog-ex
      v-model="infoOrderDialog.state"
      title="Информация"
      :fullscreen="$isMobile()"
      @ok="infoOrderDialog.state = false, infoOrderDialog.resolve()"
      @cancel="infoOrderDialog.state = false, infoOrderDialog.reject()"
    >
      <div>
        При подготовке заказа производится резервирование товара.
        По истечении трех часов заказ будет перемещен в корзину журнала заказов.
        Если вам нужно больше времени на подготовку заказа - нажмите "продлить" в окне справа.
      </div>
    </dialog-ex>

    <dialog-ex
      v-model="sendOrderDialog.state"
      title="Оформить заказ"
      :fullscreen="$isMobile()"
      :loading="sendOrderDialog.postIndicator"
      @cancel="sendOrderClose"
      @ok="sendOrderOk"
    >
      <validation-observer ref="observerSendOrder" v-slot="observer">
        <validation-provider v-slot="{errors}" name="Юр. лицо" rules="required">
          <v-select
            v-model="sendOrderDialog.form.client_fk"
            :items="sendOrderDialog.legalEntities"
            item-value="id"
            item-text="short_name"
            label="Юр. лицо"
            :error-messages="errors"
          />
        </validation-provider>

        <validation-provider v-slot="{errors}" name="Транспортная компания" rules="required">
          <v-text-field
            v-model="sendOrderDialog.form.transp_comp"
            label="Транспортная компания"
            :error-messages="errors"
          />
        </validation-provider>

        <validation-provider v-slot="{errors}" name="Адрес доставки" rules="required">
          <v-text-field
            v-model="sendOrderDialog.form.addr_delivery"
            label="Адрес доставки"
            :error-messages="errors"
          />
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
        <v-textarea v-model="sendOrderDialog.form.pact_other" label="Прочие условия" />
      </validation-observer>
    </dialog-ex>

    <dialog-ex
      v-model="createLegalEntityDialog.state"
      title="Создание юр. лица"
      ok-label="Сохранить"
      :loading="createLegalEntityDialog.postIndicator"
      :fullscreen="$isMobile()"
      @ok="createLEOk"
    >
      <div class="x-form-create-legal-entity">
        <validation-observer ref="createLEObserver">
          <div
            v-for="(legalEntity, i) in createLegalEntityDialog.form.legalEntities"
            :key="i"
            class="x-le"
          >
            <div class="x-header">
              <v-icon color="black">
                account_circle
              </v-icon>
              <div class="x-title">
                {{ legalEntity.full_name || 'Юр. лицо №' + (i + 1) }}
              </div>
              <v-btn v-if="i" small icon title="Удалить" @click="$emit('remove-legal-entity', i)">
                <v-icon>
                  close
                </v-icon>
              </v-btn>
            </div>

            <div class="x-fields">
              <validation-provider v-slot="{errors}" name="ИНН" rules="required|numeric">
                <v-text-field
                  v-model="legalEntity.inn"
                  label="ИНН"
                  color="black"
                  :error-messages="errors"
                />
              </validation-provider>

              <validation-provider v-slot="{errors}" name="Наименование юр. лица" rules="required">
                <v-text-field
                  v-model="legalEntity.full_name"
                  label="Наименование юр. лица"
                  color="black"
                  :error-messages="errors"
                />
              </validation-provider>

              <validation-provider v-slot="{errors}" name="КПП">
                <v-text-field
                  v-model="legalEntity.kpp"
                  label="КПП"
                  color="black"
                  :error-messages="errors"
                />
              </validation-provider>

              <validation-provider v-slot="{errors}" name="Почтовый индекс" rules="required">
                <v-text-field
                  v-model="legalEntity.post_index"
                  label="Почтовый индекс"
                  color="black"
                  :error-messages="errors"
                />
              </validation-provider>

              <validation-provider v-slot="{errors}" name="Юр. адрес" rules="required">
                <v-text-field
                  v-model="legalEntity.post_address"
                  label="Юр. адрес"
                  color="black"
                  :error-messages="errors"
                />
              </validation-provider>
            </div>
          </div>
          <div class="x-add-le-btn-container">
            <v-btn small flat @click="$emit('add-legal-entity')">
              Добавить еще одно юр. лицо
            </v-btn>
          </div>
        </validation-observer>
      </div>
    </dialog-ex>
  </div>
</template>

<script>
export { default } from './-dialogs.js'
</script>

<style scoped lang="less">
@import "-dialogs";
</style>
