<template>
  <div class="x-page">
    <div class="x-tables">
      <vue-custom-scrollbar class="x-left">
        <tables class="x-table">
          <tr>
            <td class="x-td-minw" />
            <td class="x-table-title">
              Карточка клиента
            </td>
          </tr>
          <tr>
            <td class="x-td-minw x-tar">
              Наименование:
            </td>
            <td>{{ client.name }}</td>
          </tr>
          <tr>
            <td class="x-td-minw x-tar">
              Локация:
            </td>
            <td>{{ client.location }}</td>
          </tr>
          <tr>
            <td class="x-td-minw x-tar">
              Статус:
            </td>
            <td>{{ client.statusStr }}</td>
          </tr>
          <tr>
            <td class="x-td-minw x-tar">
              Скидка:
            </td>
            <td>{{ client.discount }}</td>
          </tr>
          <tr>
            <td class="x-td-minw x-tar">
              Комментарий:
            </td>
            <td>{{ client.comment }}</td>
          </tr>
          <tr>
            <td class="x-td-minw x-tar">
              Ваш менеджер:
            </td>
            <td>{{ client.managerFk && client.managerFk.name }}</td>
          </tr>
          <tr>
            <td class="x-td-minw x-tar x-wsnv">
              Дата регистрации:
            </td>
            <td>{{ client.ts_create | formatDateYmdHi }}</td>
          </tr>
        </tables>

        <table class="x-table x-table-margin-top">
          <tr>
            <td class="x-td-minw" />
            <td class="x-table-title">
              Контактные лица
            </td>
          </tr>
          <template v-for="(contact, i) in contacts">
            <tr v-if="i" :key="'a' + i" class="x-tr-delimiter" />
            <tr :key="'b' + i">
              <td class="x-td-minw x-tar" />
              <td><u>{{ contact.name }}</u></td>
            </tr>
            <tr :key="'c' + i">
              <td class="x-td-minw x-tar">
                E-Mail:
              </td>
              <td>{{ contact.login }}</td>
            </tr>
            <tr :key="'d' + i">
              <td class="x-td-minw x-tar">
                Телефон:
              </td>
              <td>{{ contact.phone }}</td>
            </tr>
          </template>
        </table>
      </vue-custom-scrollbar>
      <vue-custom-scrollbar class="x-right">
        <table class="x-table">
          <tr>
            <td />
            <td class="x-table-title">
              Юридические лица
            </td>
          </tr>
          <template v-for="(legalEntity, i) in legalEntities">
            <tr v-if="i" :key="'a' + i" class="x-tr-delimiter" />
            <tr :key="'b' + i">
              <td class="x-tar" />
              <td><u>{{ legalEntity.short_name }}</u></td>
            </tr>
            <tr :key="'c' + i">
              <td class="x-tar">
                ИНН:
              </td>
              <td>{{ legalEntity.inn }}</td>
            </tr>
            <tr :key="'d' + i">
              <td class="x-tar">
                КПП:
              </td>
              <td>{{ legalEntity.kpp }}</td>
            </tr>
            <tr :key="'e' + i">
              <td class="x-tar">
                Почтовый индекс:
              </td>
              <td>{{ legalEntity.post_index }}</td>
            </tr>
            <tr :key="'f' + i">
              <td class="x-tar">
                Адрес:
              </td>
              <td>{{ legalEntity.post_address }}</td>
            </tr>
            <tr :key="'g' + i">
              <td class="x-tar">
                Тип продаж:
              </td>
              <td>{{ typeSaleVariant[legalEntity.type_sale] }}</td>
            </tr>
          </template>
        </table>
      </vue-custom-scrollbar>
    </div>
    <div class="x-info">
      <p>
        По вопросам добаления новых контактных и юридических лиц - обращайтесь к вашему менеджеру
      </p>
    </div>
  </div>
</template>

<script>
export { default } from './index.js'
</script>

<style scoped lang="less">
@import "index";
</style>
