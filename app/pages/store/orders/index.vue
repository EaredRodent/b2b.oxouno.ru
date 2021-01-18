<template>
  <div class="a6-Orders" v-if="$isDesktop()">
    <div class="a6-container">
      <div class="a6-left-side" v-show="showDeletedOrders">
          <div class="a6-label">
            Заказы удаленные
            <v-btn class="a6-btn" icon @click="showDeletedOrders = false" title="Назад к заказам">
              <v-icon>arrow_back</v-icon>
            </v-btn>
          </div>
          <div class="a6-scroll-area" ref="scrollArea0">
            <table class="a6-table">
              <tr class="a6-tr-head">
                <td class="a6-td-id">№</td>
                <td class="a6-td-date">Создан</td>
                <td class="a6-td-author">Автор</td>
                <td class="a6-td-legal-entity">Юр.лицо</td>
                <td class="a6-td-status">Статус</td>
                <td class="a6-td-doc">Документы</td>
                <td class="a6-td-sum">Сумма</td>
                <td class="a6-td-actions"></td>
              </tr>
              <tr class="a6-item" v-for="order in deletedOrders" :key="order.id"
                  :active="selectedOrder.id === order.id" @click="selectOrder(order.id)">
                <td class="a6-td-id">№{{ order.id }}</td>
                <td class="a6-td-date">
                  <span>{{ order.ts_create | formatDateYmdHi }}</span><br>
                  <span class="a6-td-date-expire">{{ order.ts_expire | formatDateYmdHi }}</span>
                </td>
                <td class="a6-td-author">{{ creatorName(order) }}</td>
                <td class="a6-td-legal-entity">{{ order.clientFk && order.clientFk.short_name }}</td>
                <td class="a6-td-status">{{ order.statusStr }}</td>
                <td class="a6-td-doc"></td>
                <td class="a6-td-sum">{{ order.sum | summStr }} ₽</td>
                <td class="a6-td-actions"></td>
              </tr>
              <tr v-if="deletedOrders.length === 0">
                <td class="a6-empty-list" colspan="8">Нет заказов</td>
              </tr>
            </table>
          </div>
      </div>

      <div class="a6-left-side" v-show="!showDeletedOrders">
        <div class="a6-label">
          Заказы на подготовке
          <v-btn class="a6-btn" icon @click="showDeletedOrders = true" title="Корзина (удаленные заказы)">
            <v-icon>delete</v-icon>
          </v-btn>
        </div>
        <div class="a6-scroll-area" ref="scrollArea1">
          <table class="a6-table">
            <tr class="a6-tr-head">
              <td class="a6-td-id">№</td>
              <td class="a6-td-date">Создан</td>
              <td class="a6-td-author">Автор</td>
              <td class="a6-td-legal-entity">Юр.лицо</td>
              <td class="a6-td-status">Статус</td>
              <td class="a6-td-doc">Документы</td>
              <td class="a6-td-sum">Сумма</td>
              <td class="a6-td-actions"></td>
            </tr>
            <tr class="a6-item" v-for="order in prepOrders" :key="order.id"
                :active="selectedOrder.id === order.id" @click="selectOrder(order.id)">
              <td class="a6-td-id">№{{ order.id }}</td>
              <td class="a6-td-date">
                <span>{{ order.ts_create | formatDateYmdHi }}</span><br>
                <span class="a6-td-date-expire">{{ order.ts_expire | formatDateYmdHi }}</span>
              </td>
              <td class="a6-td-author">{{ creatorName(order) }}</td>
              <td class="a6-td-legal-entity">{{ order.clientFk && order.clientFk.short_name }}</td>
              <td class="a6-td-status">{{ order.statusStr }}</td>
              <td class="a6-td-doc">
                <v-icon class="a6-icon" title="Описание заказа XLSX"
                        @click="downloadOrderDescription(order.id)">
                  mdi-file-excel
                </v-icon>
              </td>
              <td class="a6-td-sum">{{ order.sum | summStr }} ₽</td>
              <td class="a6-td-actions">
                <div class="a6-actions">
                  <v-btn class="a6-btn" icon small @click="editOrder(order)">
                    <v-icon class="a6-icon">edit</v-icon>
                  </v-btn>
                  <v-btn class="a6-btn" icon small @click="deleteOrderByID(order.id)">
                    <v-icon class="a6-icon">close</v-icon>
                  </v-btn>
                </div>
              </td>
            </tr>
            <tr v-if="prepOrders.length === 0">
              <td class="a6-empty-list" colspan="8">Нет заказов</td>
            </tr>
          </table>
        </div>

        <div class="a6-label">Заказы в работе</div>
        <div class="a6-scroll-area" ref="scrollArea2">
          <table class="a6-table">
            <tr class="a6-tr-head">
              <td class="a6-td-id">№</td>
              <td class="a6-td-date">Создан</td>
              <td class="a6-td-author">Автор</td>
              <td class="a6-td-legal-entity">Юр.лицо</td>
              <td class="a6-td-status">Статус</td>
              <td class="a6-td-doc">Документы</td>
              <td class="a6-td-sum">Сумма</td>
              <td class="a6-td-actions"></td>
            </tr>
            <tr class="a6-item" v-for="order in processOrders" :key="order.id"
                :active="selectedOrder.id === order.id" @click="selectOrder(order.id)">
              <td class="a6-td-id">№{{ order.id }}</td>
              <td class="a6-td-date">{{ order.ts_create | formatDateYmd }}</td>
              <td class="a6-td-author">{{ creatorName(order) }}</td>
              <td class="a6-td-legal-entity">{{ order.clientFk && order.clientFk.short_name }}</td>
              <td class="a6-td-status">{{ order.statusStr }}</td>
              <td class="a6-td-doc">
                <v-icon class="a6-icon" title="Описание заказа XLSX"
                        @click="downloadOrderDescription(order.id)">
                  mdi-file-excel
                </v-icon>
                <a v-if="order.docInvoice" class="a6-link" :href="order.docInvoice" target="_blank" title="Счет">
                  <v-icon class="a6-icon">mdi-file-document-outline</v-icon>
                </a>
                <a v-if="order.docWaybill" class="a6-link" :href="order.docWaybill" target="_blank" title="Накладная">
                  <v-icon class="a6-icon">mdi-file-document</v-icon>
                </a>
              </td>
              <td class="a6-td-sum">{{ order.sum | summStr }} ₽</td>
              <td class="a6-td-actions"></td>
            </tr>
            <tr v-if="processOrders.length === 0">
              <td class="a6-empty-list" colspan="8">Нет заказов</td>
            </tr>
          </table>
        </div>

        <div class="a6-label">Заказы отправленные</div>
        <div class="a6-scroll-area" ref="scrollArea3">
          <table class="a6-table">
            <tr class="a6-tr-head">
              <td class="a6-td-id">№</td>
              <td class="a6-td-date">Создан</td>
              <td class="a6-td-author">Автор</td>
              <td class="a6-td-legal-entity">Юр.лицо</td>
              <td class="a6-td-status">Статус</td>
              <td class="a6-td-doc">Документы</td>
              <td class="a6-td-sum">Сумма</td>
              <td class="a6-td-actions"></td>
            </tr>
            <tr class="a6-item" :return="!!order.flag_return"
                v-for="order in sendOrders" :key="order.id"
                :active="selectedOrder.id === order.id" @click="selectOrder(order.id)">
              <td class="a6-td-id">
                {{ order.flag_return ? 'Возврат' : '№' + order.id }}
              </td>
              <td class="a6-td-date">{{ order.ts_create | formatDateYmd }}</td>
              <td class="a6-td-author">{{ creatorName(order) }}</td>
              <td class="a6-td-legal-entity">{{ order.clientFk && order.clientFk.short_name }}</td>
              <td class="a6-td-status">{{ order.statusStr }}</td>
              <td class="a6-td-doc">
                <v-icon class="a6-icon" title="Описание заказа XLSX"
                        @click="downloadOrderDescription(order.id)">
                  mdi-file-excel
                </v-icon>
                <a v-if="order.docInvoice" class="a6-link" :href="order.docInvoice" target="_blank" title="Счет">
                  <v-icon class="a6-icon">mdi-file-document-outline</v-icon>
                </a>
                <a v-if="order.docWaybill" class="a6-link" :href="order.docWaybill" target="_blank"
                   title="Накладная">
                  <v-icon class="a6-icon">mdi-file-document</v-icon>
                </a>
              </td>
              <td class="a6-td-sum">{{ order.sum | summStr }} ₽</td>
              <td class="a6-td-actions"></td>
            </tr>
            <tr v-if="sendOrders.length === 0">
              <td class="a6-empty-list" colspan="8">Нет заказов</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="a6-right-side">
        <gallery-active-order :value="selectedOrder" v-if="selectedOrder.id"/>
        <template v-if="showDeletedOrders">
          <div v-if="deletedOrders.length && !selectedOrder.items"
               class="a6-no-content">
            Выберите заказ в списке слева
          </div>
          <div v-if="!deletedOrders.length && !selectedOrder.items"
               class="a6-no-content">
            Нет заказов
          </div>
        </template>
        <template v-else>
          <div v-if="allOrders.length && !selectedOrder.items"
               class="a6-no-content">
            Выберите заказ в списке слева
          </div>
          <div v-if="!allOrders.length && !selectedOrder.items"
               class="a6-no-content">
            Нет заказов
          </div>
        </template>
      </div>
    </div>

    <loading v-if="loading"/>
  </div>
  <div class="a22-PhoneOrders" v-else-if="$isMobile()">
    <loading v-if="loading"/>

    <template v-if="showDeletedOrders">
      <div class="a6-label">
        Заказы удаленные
        <v-btn class="a6-btn" icon @click="showDeletedOrders = false" title="Назад к заказам">
          <v-icon>arrow_back</v-icon>
        </v-btn>
      </div>
      <table class="a6-table">
        <tr class="a6-tr-head">
          <td class="a6-td-id">№</td>
          <td class="a6-td-date">Создан</td>
          <td class="a6-td-author">Автор</td>
          <td class="a6-td-legal-entity">Юр.лицо</td>
          <td class="a6-td-status">Статус</td>
          <td class="a6-td-doc">Документы</td>
          <td class="a6-td-sum">Сумма</td>
          <td class="a6-td-actions"></td>
        </tr>
        <tr class="a6-item" v-for="order in deletedOrders" :key="order.id"
            :active="selectedOrder.id === order.id" @click="selectOrder(order.id)">
          <td class="a6-td-id">№{{ order.id }}</td>
          <td class="a6-td-date">
            <span>{{ order.ts_create | formatDateYmdHi }}</span><br>
            <span class="a6-td-date-expire">{{ order.ts_expire | formatDateYmdHi }}</span>
          </td>
          <td class="a6-td-author">{{ creatorName(order) }}</td>
          <td class="a6-td-legal-entity">{{ order.clientFk && order.clientFk.short_name }}</td>
          <td class="a6-td-status">{{ order.statusStr }}</td>
          <td class="a6-td-doc"></td>
          <td class="a6-td-sum">{{ order.sum | summStr }} ₽</td>
          <td class="a6-td-actions"></td>
        </tr>
        <tr v-if="prepOrders.length === 0">
          <td class="a6-empty-list" colspan="8">Нет заказов</td>
        </tr>
      </table>
    </template>

    <template v-else>
      <div v-for="orders in [prepOrders, processOrders, sendOrders]">

        <div class="a22-label" v-if="orders === prepOrders && prepOrders.length">Заказы на подготовке</div>
        <div class="a22-label" v-if="orders === processOrders && processOrders.length">Заказы в работе</div>
        <div class="a22-label" v-if="orders === sendOrders && sendOrders.length">Заказы отправленные</div>

        <table class="a22-table">
          <tbody class="a22-tbody" v-for="order in orders" :key="order.id"
                 :return="!!order.flag_return">
          <tr class="a22-order-first-tr">
            <td>№</td>
            <td>
                <span class="a22-order-id-box">
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
    </template>
  </div>
</template>

<script>
import VueCustomScrollbar from 'vue-custom-scrollbar'
import GalleryActiveOrder from '../-gallery-active-order'
import config from '../../../config/base-config'
import Loading from '../../../components/b2b/loading'

export const MixinClientOrdersMethods = {
  data() {
    return {
      orders: [], // Все заказы клиента (со всеми статусами)
      loading: false
    }
  },
  computed: {
    prepOrders() {
      return this.orders.filter(elem => elem.status === 's1_client_prep')
    },
    processOrders() {
      return this.orders.filter(elem => (elem.status === 's1_prep')
          || (elem.status === 's1_wait_assembl')
          || (elem.status === 's5_assembl')
          || (elem.status === 's2_wait')
          || (elem.status === 's6_allow')
          || (elem.status === 's3_accept'))
    },
    sendOrders() {
      return this.orders.filter(elem => elem.status === 's7_send')
    },
    deletedOrders() {
      return this.orders.filter(elem => elem.status === 's0_del')
    },
    allOrders() {
      return this.prepOrders.concat(this.processOrders, this.sendOrders)
    }
  },
  methods: {
    apiGetForClient() {
      return new Promise(async (resolve, reject) => {
        this.loading = true
        let {data} = await this.$axios.get('/v1/sls-order/get-for-client')
        this.orders = data
        this.loading = false
        resolve()
      })
    },
    async downloadOrderDescription(orderId) {
      const {data: generatedFileUrl} = await this.$axios.post('/v1/generate/description', {
        orderId
      })

      window.open(generatedFileUrl)
    }
  }
}

export function deleteOrderByID(id) {
  this.$axios.post('/v1/sls-order/delete-order', {orderID: id})
}

export default {
  name: 'index',
  components: {Loading, GalleryActiveOrder, VueCustomScrollbar},
  mixins: [MixinClientOrdersMethods],
  data() {
    return {
      selectedOrder: {},
      timeStamp: 0,
      showDeletedOrders: false
    }
  },
  async mounted() {
    this.updateAll()
  },
  watch: {
    orders() {
      this.scrollEveryArea()
    },
    showDeletedOrders() {
      this.scrollEveryArea()
    }
  },
  methods: {
    async updateAll() {
      await this.apiGetForClient()
      this.selectOrder({})
      // let selectedOrderId = Number(localStorage.getItem('orders/selectedOrderId'))
      // if (selectedOrderId) {
      //   this.selectOrder(selectedOrderId)
      // }
    },

    async selectOrder(id) {
      if (!this.orders.some(el => el.id === id)) {
        return
      }

      let timeStamp = Date.now()
      this.timeStamp = timeStamp
      let {data} = await this.$axios.get('/v1/sls-order/get-details', {params: {id}})
      if (this.timeStamp === timeStamp) {
        this.selectedOrder = data
        localStorage.setItem('orders/selectedOrderId', this.selectedOrder.id)
      }
    },
    creatorName(order) {
      return (order.contactFk && order.contactFk.name) || (order.userFk && order.userFk.name) || '-'
    },
    editOrder(order) {
      localStorage.setItem('activeOrderId', order.id)
      this.$router.push('/store')
    },
    async deleteOrderByID(id) {
      await this.$axios.post('/v1/sls-order/delete-order', {orderID: id})
      this.updateAll()
    },
    scrollEveryArea() {
      this.$nextTick(() => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            for (let i = 0; i < 4; i++) {
              const ref = this.$refs[`scrollArea${i}`]
              if (ref) {
                try {
                  ref.scrollTo({top: ref.scrollHeight, behavior: 'smooth'})
                } catch (e) {
                  ref.scrollTop = ref.scrollHeight
                }
              }
            }
          })
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
