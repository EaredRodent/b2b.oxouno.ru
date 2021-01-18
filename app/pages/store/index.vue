<template>
  <div class="a3-Catalog a3-catalog-padding" v-if="$isDesktop()">
    <div class="a3-toolbar a3-toolbar-left-right">
      <div class="a3-tb-filters a3-tb-filters-flex">
        <!--        <div class="a3-tb-title">Фильтры:</div>-->
      </div>

      <div class="a3-tb-content">

        <div>
          <div class="a3-tb-search-result" v-if="userCatalogInteraction && prodsCount">
            Найдено: {{ prodsCount }}
          </div>
        </div>

        <div class="a3-td-right-box">
          <v-text-field class="a3-tb-search"
                        :value="search"
                        label="Поиск"
                        color="black"
                        small
                        @input="$store.commit('filters/setSearch', $event)"
                        :append-icon="search ? 'close' : 'search'"
                        @click:append="$store.commit('filters/setSearch', '')"

          />
          <v-btn class="a3-tb-btn" icon @click="mode = 'cards'" title="Отображать плиткой">
            <v-icon color="blue-grey darken-2">view_module</v-icon>
          </v-btn>
          <v-btn class="a3-tb-btn" icon @click="mode = 'table'" title="Отображать таблицей">
            <v-icon color="blue-grey darken-2">view_headline</v-icon>
          </v-btn>
          <v-btn class="a3-tb-btn" icon @click="downloadPrice" :loading="price.loading"
                 :title="price.loading ? 'Подождите, прайс-лист создается...' : 'Создать прайс-лист'"
                 :disabled="!prodsCount">
            <v-icon color="blue-grey darken-2">mdi-download</v-icon>
          </v-btn>
        </div>
      </div>

      <div class="a3-tb-active-orders a3-tb-active-orders-flex">
        <div class="a3-tb-active-orders-inner">
          <div class="a3-tbao-left-side">
            <div class="a3-tb-title">Подготовка заказов</div>
          </div>

          <v-btn class="a3-btn-create-order" outline small :disabled="!this.createOrderDialog.legalEntities.length"
                 :loading="createOrderDialog.processIndicator" color="blue-grey darken-3"
                 @click="callOpenCreateOrderDialog">
            Создать заказ
          </v-btn>
        </div>
      </div>
    </div>
    <div class="a3-cat-box">

      <loading v-if="filtersLoading"/>

      <filters class="a3-filters a3-filters-flex" :class="!demoCompleted && 'a3-filters-demo'"
               @ready="filtersLoading = false"/>

      <vue-custom-scrollbar class="a3-content">
        <template v-if="fetching">
          <div class="a3-no-content">
            <v-progress-circular indeterminate :size="50" :width="1" color="blue-grey darken-4"/>
          </div>
        </template>
        <template v-else>
          <collection-descript v-if="collection && collection.epithets" :value="collection"/>
          <gallery :value="!!(userCatalogInteraction && prodsCount)" :mode="mode" :items="prods"
                   @prod-view="prodView"/>
          <div class="a3-catalog-bg" v-if="!userCatalogInteraction"/>
          <div class="a3-no-content a3-no-content-padding" v-else-if="userCatalogInteraction && !prodsCount">
            Нет изделий
          </div>
          <template v-if="false">
            <div class="a3-no-content a3-no-content-padding" v-if="!userCatalogInteraction">
              Используйте дерево, навигацию или поиск
            </div>
          </template>
        </template>
      </vue-custom-scrollbar>

      <gallery-active-order class="a3-active-orders a3-active-orders-flex" v-if="prepOrders.length" ref="activeOrder"
                            :value="activeOrder"
                            :prepare-orders="prepOrders"
                            actions
                            :mode="activeOrderMode"
                            :get-more-time-button-loading="getMoreTimeButtonLoading"
                            @send-order="openSendOrderDialog"
                            @item-edit="prodView"
                            @order-get-more-time="orderGetMoreTime"
                            @set-active-order="setActiveOrder"/>
      <div class="a3-active-orders a3-active-orders-flex a3-no-content a3-no-content-padding" v-else>Нет заказов</div>

      <div v-if="!demoCompleted" class="a3-demo">
        <div class="a3-demo-right-block">
          Используйте фильтры для обзора изделий. Кликните по интересующему товару
        </div>
      </div>

      <viewer v-model="viewer"
              @add-item-to-order="addItemToOrder"
              @edit-item-from-order="editItemFromOrder"
              @delete-item="itemDelete"
              :legal-entity-id="activeOrder.client_fk"
              :order-create-processing="viewer.createOrderProcessing"
              :order-edit-item-processing="viewer.editOrderItemProcessing"
              :order-delete-item-processing="viewer.deleteOrderItemProcessing"/>

      <dialogs :create-order-dialog="createOrderDialog"
               :send-order-dialog="sendOrderDialog"
               :info-order-dialog="infoOrderDialog"
               @create-order="createOrder"
               @send-order="sendOrder"/>

    </div>
  </div>
  <div class="a15-Catalog-Phone" v-else-if="$isMobile()">
    <loading v-if="filtersLoading"/>
    <phone-filters class="a15-filters" :class="{'a15-hide-filters': hidePhoneFilterItems}"
                   :active-order="activeOrder"
                   :prep-orders="prepOrders"
                   @ready="filtersLoading = false"
                   @send-order="openSendOrderDialog"
                   @show-change="phoneFiltersIsFullScreen = $event"
                   @create-order="callOpenCreateOrderDialog"/>
    <div class="a15-expand-down-box" v-show="hidePhoneFilterItems">
      <v-btn class="a15-expand-down" fab @click="hidePhoneFilterItems = false">
        <v-icon>
          mdi-arrow-expand-down
        </v-icon>
      </v-btn>
    </div>
    <div class="a15-wrapper" :with-padding="hidePhoneFilterItems"
         v-on="getTouchBehavior()">
      <div class="a3-mb-catalog-bg" v-if="!userCatalogInteraction"/>
      <div class="a3-no-content a3-no-content-padding" v-else-if="userCatalogInteraction && !prodsCount">
        Нет изделий
      </div>
      <gallery class="a15-mb-gallery" :mobile="true" :value="!!(userCatalogInteraction && prodsCount)"
               :items="prods" mode="cards"
               @prod-view="prodView"/>
    </div>

    <viewer v-model="viewer"
            @add-item-to-order="addItemToOrder"
            @edit-item-from-order="editItemFromOrder"
            @delete-item="itemDelete"
            :legal-entity-id="activeOrder.client_fk"
            :order-create-processing="viewer.createOrderProcessing"
            :order-edit-item-processing="viewer.editOrderItemProcessing"
            :order-delete-item-processing="viewer.deleteOrderItemProcessing"/>

    <dialogs :create-order-dialog="createOrderDialog"
             :send-order-dialog="sendOrderDialog"
             :info-order-dialog="infoOrderDialog"
             @create-order="createOrder"
             @send-order="sendOrder"/>
  </div>
</template>

<script>
import {isPostSuccessful} from '~/plugins/base/axios-prepare'
import Filters from './-filters'
import Gallery from './-gallery'
import Viewer from './-viewer'
import GalleryActiveOrder from './-gallery-active-order'
import VueCustomScrollbar from 'vue-custom-scrollbar'
import Dialogs from './-dialogs'
import config from '~/config/base-config'
import CollectionDescript from './-collection-description'
import Loading from '~/components/b2b/loading'
import PhoneFilters from './-phone-filters'

export default {
  name: 'index',
  components: {
    PhoneFilters,
    Loading,
    CollectionDescript,
    Dialogs,
    Viewer,
    Gallery,
    Filters,
    GalleryActiveOrder,
    VueCustomScrollbar
  },
  data() {
    return {
      mode: 'cards',  // cards / table
      activeOrderMode: 'table', // cards / table
      viewer: {
        state: false,
        sizesForOrder: {},
        prod: {},
        slsItemId: 0,
        createOrderProcessing: false, // Индикатор ожидания для кнопки добавить в заказ в карточке товара, когда требуется авто-создание заказа
        editOrderItemProcessing: false, // Индикатор ожидания для кнопки редактировать кол-во изделия в заказе (карточка товара)
        deleteOrderItemProcessing: false // Индикатор ожидания для кнопки удалить изделие из заказа (карточка товара)
      },
      demoCompleted: true,
      prepOrders: [],
      activeOrder: {},
      createOrderDialog: {
        state: false,
        legalEntities: [],
        form: {},
        resolve() {
        },
        processIndicator: false // Индикатор ожидания для кнопки создать заказ
      },
      sendOrderDialog: {
        state: false,
        form: {},
        postIndicator: false // Индикатор отправки формы (post запрос)
      },
      infoOrderDialog: {  // Окно с предупреждением о удалении заказа через определенное время
        state: false,
        resolve() {
        },
        reject() {
        }
      },
      price: {
        loading: false
      },
      filtersLoading: true,
      hidePhoneFilterItems: false,
      phoneFiltersIsFullScreen: false,
      getMoreTimeButtonLoading: false
    }
  },
  computed: {
    prods() {
      return this.$store.state.filters.prods
    },
    activeOrderProds() {
      return this.$store.state['active-order'].prods
    },
    userCatalogInteraction() {
      return this.$store.state.filters.userCatalogInteraction
    },
    prodsCount() {
      return this.$store.state.filters.prodsCount
    },
    fetching() {
      return this.$store.state.filters.fetching
    },
    model() {
      return this.$store.state.filters.model
    },
    collection() {
      return this.$store.state.filters.collection
    },
    catalogMode() {
      return this.$store.state.filters.catalogMode
    },
    search() {
      return this.$store.state.filters.search
    },
    disabledFilters() {
      return this.$store.state.filters.disabledFilters
    }
  },
  async mounted() {
    // if (localStorage.getItem('demoCompleted') !== 'true') {
    //   this.demoCompleted = false
    //   localStorage.setItem('demoCompleted', 'true')
    // }
    this.updateOrders()
    this.createOrderDialog.legalEntities = await new Promise(this.apiGetLegalEntities)
  },
  methods: {
    updateOrders() {
      return new Promise(async (resolve, reject) => {
        this.prepOrders = await new Promise(this.apiGetPrepOrders)
        this.getActiveOrder()
        resolve()
      })
    },
    setActiveOrder(orderID) {
      localStorage.setItem('activeOrderId', orderID)
      this.getActiveOrder()
    },
    getActiveOrder() {
      let activeOrderId = Number(localStorage.getItem('activeOrderId'))
      this.activeOrder = this.prepOrders.find(e => Number(e.id) === activeOrderId) || (this.prepOrders.length ? this.prepOrders[this.prepOrders.length - 1] : {})
    },
    createOrder() {
      return new Promise(async (resolve, reject) => {
        let response = await this.$axios.post('/v1/sls-order/create-order', {
          form: JSON.stringify(this.createOrderDialog.form)
        })
        if (isPostSuccessful(response)) {
          this.createOrderDialog.state = false
        }
        await this.updateOrders()
        this.createOrderDialog.resolve()
        resolve()
      })
    },
    async callOpenCreateOrderDialog() {
      this.createOrderDialog.processIndicator = true
      try {
        await this.openCreateOrderDialog(true)
      } catch (e) {
      }
      this.createOrderDialog.processIndicator = false
    },
    openCreateOrderDialog() {
      return new Promise(async (resolve, reject) => {
        try {
          await this.openInfoOrderDialog()
        } catch (e) {
          reject()
          return
        }

        if (1 < this.createOrderDialog.legalEntities.length) {
          this.createOrderDialog.form.client_fk = this.createOrderDialog.legalEntities[0].id
          this.createOrderDialog.state = true
          this.createOrderDialog.resolve = resolve
        } else {
          this.createOrderDialog.form.client_fk = this.createOrderDialog.legalEntities[0].id
          this.createOrderDialog.resolve = resolve
          this.createOrder()
        }
      })
    },
    async apiGetLegalEntities(resolve, reject) {
      let {data} = await this.$axios.get('/v1/sls-client/get-legal-entities')
      resolve(data)
    },
    async apiGetPrepOrders(resolve, reject) {
      let {data} = await this.$axios.get('/v1/sls-order/get-prep-2')
      resolve(data)
    },
    prodView(cardProd) {
      let slsItem

      // Поиск открываемого на просмотр изделия в активном заказе
      if (this.activeOrder.items) {
        slsItem = this.activeOrder.items.find(slsItem => {
          return (slsItem.cardProd.prodId === cardProd.prodId) && (slsItem.cardProd.printFk.id === cardProd.printFk.id)
        })
      }

      // Если изделие уже есть в активном заказе, то открыть его на редактирование
      // Иначе открыть на добавление в активный заказ

      if (slsItem) {
        this.viewer.slsItemId = slsItem.id
        this.viewer.prod = JSON.parse(JSON.stringify(slsItem.cardProd))
        this.viewer.sizesForOrder = Object.fromEntries(slsItem.includes.map(elem => [elem.size, elem.count]))
        this.viewer.state = true

      } else {
        this.viewer.slsItemId = 0
        this.viewer.prod = JSON.parse(JSON.stringify(cardProd))
        this.viewer.sizesForOrder = {}
        this.viewer.state = true
      }
    },
    async addItemToOrder(form) {
      this.viewer.createOrderProcessing = true

      if (!this.activeOrder.id) {
        try {
          await this.openCreateOrderDialog()
        } catch (e) {
          this.viewer.createOrderProcessing = false
          return
        }
      }

      form.order_fk = this.activeOrder.id
      let response = await this.$axios.post('/v1/sls-item/create-item', {form: JSON.stringify(form)})
      if (isPostSuccessful(response)) {
        this.viewer.state = false
      }

      this.viewer.createOrderProcessing = false
      this.updateOrders()
    },
    async editItemFromOrder(form) {
      this.viewer.editOrderItemProcessing = true
      let response = await this.$axios.post('/v1/sls-item/edit-item', {form: JSON.stringify(form)})
      if (isPostSuccessful(response)) {
        this.viewer.state = false
      }
      this.viewer.editOrderItemProcessing = false
      this.updateOrders()
    },
    async itemDelete(id) {
      this.viewer.deleteOrderItemProcessing = true
      let response = await this.$axios.post('/v1/sls-item/delete-item', {id})
      if (isPostSuccessful(response)) {
        this.viewer.state = false
      }
      this.viewer.deleteOrderItemProcessing = false
      this.updateOrders()
    },
    openSendOrderDialog() {
      this.sendOrderDialog.state = true
    },
    async sendOrder() {
      this.sendOrderDialog.postIndicator = true
      this.sendOrderDialog.form.active_order_id = this.activeOrder.id
      let response = await this.$axios.post('/v1/sls-order/send-order', {form: JSON.stringify(this.sendOrderDialog.form)})
      if (isPostSuccessful(response)) {
        this.sendOrderDialog.state = false
      }
      await this.updateOrders()
      this.sendOrderDialog.postIndicator = false
    },
    openInfoOrderDialog() {
      return new Promise((resolve, reject) => {
        this.infoOrderDialog.resolve = resolve
        this.infoOrderDialog.reject = reject
        this.infoOrderDialog.state = true
      })
    },
    async downloadPrice() {
      this.price.loading = true

      const prods = this.$store.state.filters.prods
      const refArtBlanks = []
      const refProductPrints = []

      for (const prod of prods) {
        if (prod.printId === 1) {
          refArtBlanks.push(prod.prodId)
        } else {
          refProductPrints.push([prod.prodId, prod.printId])
        }
      }

      const {data: generatedUrl} = await this.$axios.post('/v1/generate/price', {
        refArtBlanks,
        refProductPrints,
        mode: this.catalogMode
      })

      window.open(generatedUrl)

      this.price.loading = false
    },
    getTouchBehavior() {
      if (this.phoneFiltersIsFullScreen) {
        return {}
      } else {
        return {
          'scroll': () => {
            this.hidePhoneFilterItems = true
          },
          'click': () => {
            this.hidePhoneFilterItems = true
          }
        }
      }
    },
    async orderGetMoreTime() {
      this.getMoreTimeButtonLoading = true
      await this.$axios.post('/v1/sls-order/extend-time', {orderId: this.activeOrder.id})
      await this.updateOrders()
      this.getMoreTimeButtonLoading = false
    }
  }
}
</script>

<style scoped>
</style>
