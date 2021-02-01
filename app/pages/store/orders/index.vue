<template>
  <div v-if="$isDesktop()" class="x-page">
    <div class="x-container">
      <div v-show="showDeletedOrders" class="x-left-side">
        <div class="x-label">
          Заказы удаленные
          <v-btn class="x-btn" icon title="Назад к заказам" @click="showDeletedOrders = false">
            <v-icon>arrow_back</v-icon>
          </v-btn>
        </div>
        <div ref="scrollArea0" class="x-scroll-area">
          <table class="x-table">
            <tr class="x-tr-head">
              <td class="x-td-id">
                №
              </td>
              <td class="x-td-date">
                Создан
              </td>
              <td class="x-td-author">
                Автор
              </td>
              <td class="x-td-legal-entity">
                Юр.лицо
              </td>
              <td class="x-td-doc">
                Документы
              </td>
              <td class="x-td-sum">
                Сумма
              </td>
              <td class="x-td-actions" />
            </tr>
            <tr
              v-for="order in deletedOrders"
              :key="order.id"
              class="x-item"
              :active="selectedOrder.id === order.id"
              @click="selectOrder(order.id)"
            >
              <td class="x-td-id">
                №{{ order.id }}
              </td>
              <td class="x-td-date">
                <span>{{ order.ts_create | formatDateYmdHi }}</span><br>
                <span class="x-td-date-expire">{{ order.ts_expire | formatDateYmdHi }}</span>
              </td>
              <td class="x-td-author">
                {{ creatorName(order) }}
              </td>
              <td class="x-td-legal-entity">
                {{ order.clientFk && order.clientFk.short_name }}
              </td>
              <td class="x-td-doc" />
              <td class="x-td-sum">
                {{ order.sum | summStr }} ₽
              </td>
              <td class="x-td-actions" />
            </tr>
            <tr v-if="deletedOrders.length === 0">
              <td class="x-empty-list" colspan="8">
                Нет заказов
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div v-show="!showDeletedOrders" class="x-left-side">
        <div class="x-label">
          Заказы на подготовке
          <v-btn class="x-btn" icon title="Корзина (удаленные заказы)" @click="showDeletedOrders = true">
            <v-icon>delete</v-icon>
          </v-btn>
        </div>
        <div ref="scrollArea1" class="x-scroll-area">
          <table class="x-table">
            <tr class="x-tr-head">
              <td class="x-td-id">
                №
              </td>
              <td class="x-td-date">
                Создан
              </td>
              <td class="x-td-author">
                Автор
              </td>
              <td class="x-td-legal-entity">
                Юр.лицо
              </td>
              <td class="x-td-doc">
                Документы
              </td>
              <td class="x-td-sum">
                Сумма
              </td>
              <td class="x-td-actions" />
            </tr>
            <tr
              v-for="order in prepOrders"
              :key="order.id"
              class="x-item"
              :active="selectedOrder.id === order.id"
              @click="selectOrder(order.id)"
            >
              <td class="x-td-id">
                №{{ order.id }}
              </td>
              <td class="x-td-date">
                <span>{{ order.ts_create | formatDateYmdHi }}</span><br>
                <span class="x-td-date-expire">{{ order.ts_expire | formatDateYmdHi }}</span>
              </td>
              <td class="x-td-author">
                {{ creatorName(order) }}
              </td>
              <td class="x-td-legal-entity">
                {{ order.clientFk && order.clientFk.short_name }}
              </td>
              <td class="x-td-doc">
                <v-icon
                  class="x-icon"
                  title="Описание заказа XLSX"
                  @click="downloadOrderDescription(order.id)"
                >
                  mdi-file-excel
                </v-icon>
              </td>
              <td class="x-td-sum">
                {{ order.sum | summStr }} ₽
              </td>
              <td class="x-td-actions">
                <div class="x-actions">
                  <v-btn class="x-btn" icon small @click="editOrder(order)">
                    <v-icon class="x-icon">
                      edit
                    </v-icon>
                  </v-btn>
                  <v-btn class="x-btn" icon small @click="deleteOrderByID(order.id)">
                    <v-icon class="x-icon">
                      close
                    </v-icon>
                  </v-btn>
                </div>
              </td>
            </tr>
            <tr v-if="prepOrders.length === 0">
              <td class="x-empty-list" colspan="8">
                Нет заказов
              </td>
            </tr>
          </table>
        </div>

        <div class="x-label">
          Заказы в работе
        </div>
        <div ref="scrollArea2" class="x-scroll-area">
          <table class="x-table">
            <tr class="x-tr-head">
              <td class="x-td-id">
                №
              </td>
              <td class="x-td-date">
                Создан
              </td>
              <td class="x-td-author">
                Автор
              </td>
              <td class="x-td-legal-entity">
                Юр.лицо
              </td>
              <td class="x-td-doc">
                Документы
              </td>
              <td class="x-td-sum">
                Сумма
              </td>
              <td class="x-td-actions" />
            </tr>
            <tr
              v-for="order in processOrders"
              :key="order.id"
              class="x-item"
              :active="selectedOrder.id === order.id"
              @click="selectOrder(order.id)"
            >
              <td class="x-td-id">
                №{{ order.id }}
              </td>
              <td class="x-td-date">
                {{ order.ts_create | formatDateYmd }}
              </td>
              <td class="x-td-author">
                {{ creatorName(order) }}
              </td>
              <td class="x-td-legal-entity">
                {{ order.clientFk && order.clientFk.short_name }}
              </td>
              <td class="x-td-doc">
                <v-icon
                  class="x-icon"
                  title="Описание заказа XLSX"
                  @click="downloadOrderDescription(order.id)"
                >
                  mdi-file-excel
                </v-icon>
                <a v-if="order.docInvoice" class="x-link" :href="order.docInvoice" target="_blank" title="Счет">
                  <v-icon class="x-icon">mdi-file-document-outline</v-icon>
                </a>
                <a v-if="order.docWaybill" class="x-link" :href="order.docWaybill" target="_blank" title="Накладная">
                  <v-icon class="x-icon">mdi-file-document</v-icon>
                </a>
              </td>
              <td class="x-td-sum">
                {{ order.sum | summStr }} ₽
              </td>
              <td class="x-td-actions" />
            </tr>
            <tr v-if="processOrders.length === 0">
              <td class="x-empty-list" colspan="8">
                Нет заказов
              </td>
            </tr>
          </table>
        </div>

        <div class="x-label">
          Заказы отправленные
        </div>
        <div ref="scrollArea3" class="x-scroll-area">
          <table class="x-table">
            <tr class="x-tr-head">
              <td class="x-td-id">
                №
              </td>
              <td class="x-td-date">
                Создан
              </td>
              <td class="x-td-author">
                Автор
              </td>
              <td class="x-td-legal-entity">
                Юр.лицо
              </td>
              <td class="x-td-doc">
                Документы
              </td>
              <td class="x-td-sum">
                Сумма
              </td>
              <td class="x-td-actions" />
            </tr>
            <tr
              v-for="order in sendOrders"
              :key="order.id"
              class="x-item"
              :return="!!order.flag_return"
              :active="selectedOrder.id === order.id"
              @click="selectOrder(order.id)"
            >
              <td class="x-td-id">
                {{ order.flag_return ? 'Возврат' : '№' + order.id }}
              </td>
              <td class="x-td-date">
                {{ order.ts_create | formatDateYmd }}
              </td>
              <td class="x-td-author">
                {{ creatorName(order) }}
              </td>
              <td class="x-td-legal-entity">
                {{ order.clientFk && order.clientFk.short_name }}
              </td>
              <td class="x-td-doc">
                <v-icon
                  class="x-icon"
                  title="Описание заказа XLSX"
                  @click="downloadOrderDescription(order.id)"
                >
                  mdi-file-excel
                </v-icon>
                <a v-if="order.docInvoice" class="x-link" :href="order.docInvoice" target="_blank" title="Счет">
                  <v-icon class="x-icon">mdi-file-document-outline</v-icon>
                </a>
                <a
                  v-if="order.docWaybill"
                  class="x-link"
                  :href="order.docWaybill"
                  target="_blank"
                  title="Накладная"
                >
                  <v-icon class="x-icon">mdi-file-document</v-icon>
                </a>
              </td>
              <td class="x-td-sum">
                {{ order.sum | summStr }} ₽
              </td>
              <td class="x-td-actions" />
            </tr>
            <tr v-if="sendOrders.length === 0">
              <td class="x-empty-list" colspan="8">
                Нет заказов
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div class="x-right-side">
        <gallery-active-order v-if="selectedOrder.id" :value="selectedOrder" />
        <template v-if="showDeletedOrders">
          <div
            v-if="deletedOrders.length && !selectedOrder.items"
            class="x-no-content"
          >
            Выберите заказ в списке слева
          </div>
          <div
            v-if="!deletedOrders.length && !selectedOrder.items"
            class="x-no-content"
          >
            Нет заказов
          </div>
        </template>
        <template v-else>
          <div
            v-if="allOrders.length && !selectedOrder.items"
            class="x-no-content"
          >
            Выберите заказ в списке слева
          </div>
          <div
            v-if="!allOrders.length && !selectedOrder.items"
            class="x-no-content"
          >
            Нет заказов
          </div>
        </template>
      </div>
    </div>

    <loading v-if="loading" />
  </div>
  <div v-else-if="$isMobile()" class="xm-page">
    <loading v-if="loading" />

    <button class="x-action" @click="showDeletedOrders = !showDeletedOrders">
      {{ showDeletedOrders ? 'Вернуться к моим заказам' : 'Показать удаленные заказы' }}
      <v-icon>
        {{ showDeletedOrders ? 'list_alt' : 'delete' }}
      </v-icon>
    </button>

    <div
      v-for="(group, i) in mobileGroups"
      :key="i"
    >
      <div class="xm-label">
        {{ group.name }}
      </div>

      <div v-if="!group.orders.length" class="x-no-orders">
        Такие заказы отсутствуют
      </div>

      <table class="xm-table">
        <tbody
          v-for="order in group.orders"
          :key="order.id"
          class="xm-tbody"
          :return="!!order.flag_return"
        >
          <tr class="xm-order-first-tr">
            <td>№</td>
            <td>
              <span class="xm-order-id-box">
                {{ order.id }}<template v-if="order.flag_return">&nbsp;(Возврат)</template>
              </span>
            </td>
          </tr>
          <tr>
            <td>Создан:</td>
            <td>{{ order.ts_create | formatDateYmd }}</td>
          </tr>
          <tr>
            <td>Автор:</td>
            <td>{{ creatorName(order) }}</td>
          </tr>
          <tr>
            <td>Юр.лицо</td>
            <td>{{ order.clientFk && order.clientFk.short_name }}</td>
          </tr>
          <tr>
            <td>Статус:</td>
            <td>{{ order.statusStr }}</td>
          </tr>
          <tr>
            <td>Сумма:</td>
            <td>{{ order.sum | summStr }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export { default } from './index.js'
</script>

<style scoped lang="less">
@import "index";
@import "index-mobile";
</style>
