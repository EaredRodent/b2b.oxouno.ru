<template>
  <vue-custom-scrollbar class="x-page" :mobile="$isMobile()">
    <div class="x-left-block">
      <div class="x-title">
        Карточка клиента
      </div>
      <table class="x-table">
        <tbody>
          <tr>
            <td>
              Наименование:
            </td>
            <td>{{ client.name }}</td>
          </tr>
          <tr>
            <td>
              Локация:
            </td>
            <td>{{ client.location }}</td>
          </tr>
          <tr>
            <td>
              Статус:
            </td>
            <td>{{ getStatusFromDiscount(client.discount) }}</td>
          </tr>
          <tr>
            <td>
              Скидка:
            </td>
            <td>{{ client.discount }}</td>
          </tr>
          <tr>
            <td>
              Ваш менеджер:
            </td>
            <td>{{ client.managerFk && client.managerFk.name }}</td>
          </tr>
          <tr>
            <td class="x-td-minw  x-wsnv">
              Дата регистрации:
            </td>
            <td>{{ client.ts_create | formatDateYmdHi }}</td>
          </tr>
        </tbody>
      </table>
      <div class="x-title">
        Контактная информация
        <v-btn v-if="$isMobile()" icon @click="contactDialog.state = true">
          <v-icon>
            add
          </v-icon>
        </v-btn>
        <v-btn v-else class="x-btn" outline small @click="contactDialog.state = true">
          Добавить контакт
        </v-btn>
      </div>
      <table class="x-table x-table-margin-top">
        <tbody>
          <template v-for="(contact, i) in contacts">
            <tr :key="'b' + i">
              <td class="x-entity-name" colspan="2">
                « {{ contact.name }} »
              </td>
            </tr>
            <tr :key="'c' + i">
              <td>
                E-Mail:
              </td>
              <td>{{ contact.login }}</td>
            </tr>
            <tr :key="'d' + i">
              <td>
                Телефон:
              </td>
              <td>{{ contact.phone }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="x-right-block">
      <div class="x-title">
        Юридическая информация
        <v-btn v-if="$isMobile()" icon @click="legalEntityDialog.state = true">
          <v-icon>
            add
          </v-icon>
        </v-btn>
        <v-btn v-else class="x-btn" outline small @click="legalEntityDialog.state = true">
          Добавить юр. лицо
        </v-btn>
      </div>
      <table class="x-table">
        <tbody>
          <template v-for="(legalEntity, i) in legalEntities">
            <tr :key="'b' + i">
              <td class="x-entity-name" colspan="2">
                « {{ legalEntity.short_name }} »
              </td>
            </tr>
            <tr :key="'c' + i">
              <td>
                ИНН:
              </td>
              <td>{{ legalEntity.inn }}</td>
            </tr>
            <tr :key="'d' + i">
              <td>
                КПП:
              </td>
              <td>{{ legalEntity.kpp }}</td>
            </tr>
            <tr :key="'e' + i">
              <td>
                Почтовый индекс:
              </td>
              <td>{{ legalEntity.post_index }}</td>
            </tr>
            <tr :key="'f' + i">
              <td>
                Адрес:
              </td>
              <td>{{ legalEntity.post_address }}</td>
            </tr>
            <tr :key="'g' + i">
              <td>
                Тип продаж:
              </td>
              <td>{{ getTypeSale(legalEntity.type_sale) }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <contact-dialog :contact-dialog="contactDialog" @add="addContact" />
    <legal-entity-dialog :legal-entity-dialog="legalEntityDialog" @add="addLE" />
  </vue-custom-scrollbar>
</template>

<script>
export { default } from './index.js'
</script>

<style scoped lang="less">
@import "index";
</style>
