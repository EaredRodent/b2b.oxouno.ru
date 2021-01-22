import VueCustomScrollbar from 'vue-custom-scrollbar'
import Filters from './-filters.vue'
import Gallery from './-gallery.vue'
import Viewer from './-viewer.vue'
import GalleryActiveOrder from './-gallery-active-order.vue'
import Dialogs from './-dialogs.vue'
import CollectionDescript from './-collection-description.vue'
import PhoneFilters from './-phone-filters.vue'
import config from '~/config/base-config.js'
import Loading from '~/components/loading/index.vue'
import { isPostSuccessful } from '~/plugins/axios-prepare.js'

export default {
  name: 'Index',
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
  data () {
    return {
      mode: 'cards', // cards / table
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
      sendOrderDialog: {
        state: false,
        form: {},
        postIndicator: false,
        legalEntities: []
      },
      infoOrderDialog: { // Окно с предупреждением о удалении заказа через определенное время
        state: false,
        resolve () {
        },
        reject () {
        }
      },
      price: {
        loading: false
      },
      filtersLoading: true,
      hidePhoneFilterItems: false,
      phoneFiltersIsFullScreen: false,
      getMoreTimeButtonLoading: false,
      createLegalEntityDialog: {
        state: false,
        active: 0,
        form: {
          legalEntities: []
        },
        id: Symbol('ID'),
        postIndicator: false
      },
      createOrderProcessing: false,
      organization: {}
    }
  },
  computed: {
    prods () {
      return this.$store.state.filters.prods
    },
    activeOrderProds () {
      return this.$store.state['active-order'].prods
    },
    userCatalogInteraction () {
      return this.$store.state.filters.userCatalogInteraction
    },
    prodsCount () {
      return this.$store.state.filters.prodsCount
    },
    fetching () {
      return this.$store.state.filters.fetching
    },
    model () {
      return this.$store.state.filters.model
    },
    collection () {
      return this.$store.state.filters.collection
    },
    catalogMode () {
      return this.$store.state.filters.catalogMode
    },
    search () {
      return this.$store.state.filters.search
    },
    disabledFilters () {
      return this.$store.state.filters.disabledFilters
    }
  },
  async created () {
    await this.updateOrders()
    await this.updateOrganization()
    await this.updateLegalEntities()
  },
  methods: {
    async updateOrders () {
      this.prepOrders = await new Promise(this.apiGetPrepOrders)
      this.getActiveOrder()
    },
    setActiveOrder (orderID) {
      localStorage.setItem('activeOrderId', orderID)
      this.getActiveOrder()
    },
    getActiveOrder () {
      const activeOrderId = Number(localStorage.getItem('activeOrderId'))
      this.activeOrder = this.prepOrders.find(e => Number(e.id) === activeOrderId) ||
        (this.prepOrders.length ? this.prepOrders[this.prepOrders.length - 1] : {})
    },
    async createOrder () {
      await this.$axios.post('/v1/sls-order/create-order')
      await this.updateOrders()
    },
    async apiGetPrepOrders (resolve, reject) {
      const { data } = await this.$axios.get('/v1/sls-order/get-prep-2')
      resolve(data)
    },
    prodView (cardProd) {
      let slsItem

      // Поиск открываемого на просмотр изделия в активном заказе
      if (this.activeOrder.items) {
        slsItem = this.activeOrder.items.find((slsItem) => {
          return (slsItem.cardProd.prodId === cardProd.prodId) &&
            (slsItem.cardProd.printFk.id === cardProd.printFk.id)
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
    async addItemToOrder (form) {
      this.viewer.createOrderProcessing = true

      if (!this.activeOrder.id) {
        try {
          await this.openInfoOrderDialog()
        } catch (e) {
          this.viewer.createOrderProcessing = false
          return
        }
      }

      form.order_fk = this.activeOrder.id
      const response = await this.$axios.post('/v1/sls-item/create-item', { form: JSON.stringify(form) })
      if (isPostSuccessful(response)) {
        this.viewer.state = false
      }

      this.viewer.createOrderProcessing = false
      this.updateOrders()
    },
    async editItemFromOrder (form) {
      this.viewer.editOrderItemProcessing = true
      const response = await this.$axios.post('/v1/sls-item/edit-item', { form: JSON.stringify(form) })
      if (isPostSuccessful(response)) {
        this.viewer.state = false
      }
      this.viewer.editOrderItemProcessing = false
      this.updateOrders()
    },
    async itemDelete (id) {
      this.viewer.deleteOrderItemProcessing = true
      const response = await this.$axios.post('/v1/sls-item/delete-item', { id })
      if (isPostSuccessful(response)) {
        this.viewer.state = false
      }
      this.viewer.deleteOrderItemProcessing = false
      this.updateOrders()
    },
    async sendOrder () {
      this.sendOrderDialog.postIndicator = true
      this.sendOrderDialog.form.active_order_id = this.activeOrder.id
      const response = await this.$axios.post('/v1/sls-order/send-order', { form: JSON.stringify(this.sendOrderDialog.form) })
      if (isPostSuccessful(response)) {
        this.sendOrderDialog.state = false
      }
      await this.updateOrders()
      this.sendOrderDialog.postIndicator = false
    },
    openInfoOrderDialog () {
      return new Promise((resolve, reject) => {
        this.createOrderProcessing = true
        this.infoOrderDialog.resolve = async () => {
          await this.createOrder()
          this.createOrderProcessing = false
          resolve()
        }
        this.infoOrderDialog.reject = () => {
          this.createOrderProcessing = false
          reject()
        }
        this.infoOrderDialog.state = true
      })
    },
    async downloadPrice () {
      this.price.loading = true

      let prods = this.$store.state.filters.prods

      if (!prods.length) {
        const tryGetProds = (prods) => {
          let resProds = []

          for (const prod of prods) {
            if (prod.children) {
              resProds = resProds.concat(tryGetProds(prod.children))
            } else {
              resProds = resProds.concat(prod.prodArr)
            }
          }

          return resProds
        }

        prods = [
          ...tryGetProds(this.$store.state.filters.topTree.items),
          ...tryGetProds(this.$store.state.filters.bottomTree.items)
        ]
      }

      const refArtBlanks = []
      const refProductPrints = []

      for (const prod of prods) {
        if (prod.printId === 1) {
          refArtBlanks.push(prod.prodId)
        } else {
          refProductPrints.push([prod.prodId, prod.printId])
        }
      }

      const { data: generatedUrl } = await this.$axios.post('/v1/generate/price', {
        refArtBlanks,
        refProductPrints,
        mode: this.catalogMode
      })

      window.open(generatedUrl)

      this.price.loading = false
    },
    getTouchBehavior () {
      if (this.phoneFiltersIsFullScreen) {
        return {}
      } else {
        return {
          scroll: () => {
            this.hidePhoneFilterItems = true
          },
          click: () => {
            this.hidePhoneFilterItems = true
          }
        }
      }
    },
    async orderGetMoreTime () {
      this.getMoreTimeButtonLoading = true
      await this.$axios.post('/v1/sls-order/extend-time', { orderId: this.activeOrder.id })
      await this.updateOrders()
      this.getMoreTimeButtonLoading = false
    },
    addLegalEntity (noMoreThanOne = false) {
      if (noMoreThanOne && this.createLegalEntityDialog.form.legalEntities.length) {
        return
      }

      const firstLegalEntity = {
        [this.createLegalEntityDialog.id]: Math.random()
      }
      this.createLegalEntityDialog.form.legalEntities.push(firstLegalEntity)
    },
    openCreateLegalEntityDialog () {
      this.addLegalEntity(true)
      this.createLegalEntityDialog.state = true
    },
    removelegalEntity (i) {
      this.createLegalEntityDialog.form.legalEntities.splice(i, 1)
    },
    async createlegalEntities (callback) {
      // createLegalEntityDialog.form
      try {
        this.createLegalEntityDialog.postIndicator = true
        const response = await this.$axios.post(
          '/v1/anx-user/b2b-reg-complete',
          this.createLegalEntityDialog.form
        )
        if (isPostSuccessful(response)) {
          await this.updateOrganization()
          await this.updateLegalEntities()
          this.createLegalEntityDialog.state = false
          this.beginOrderSending()
        }
      } catch (e) {
      } finally {
        this.createLegalEntityDialog.postIndicator = false
      }
    },
    async deleteOrderByID (id) {
      await this.$axios.post('/v1/sls-order/delete-order', { orderID: id })
      this.updateOrders()
    },
    beginOrderSending () {
      if (this.organization.demoUser) {
        this.openCreateLegalEntityDialog()
      } else {
        this.sendOrderDialog.state = true
      }
    },
    async updateOrganization () {
      const promiseOrg = this.$axios.get('/v1/sls-org/get-for-contact')
      this.organization = (await promiseOrg).data
    },
    async updateLegalEntities (resolve, reject) {
      const { data } = await this.$axios.get('/v1/sls-client/get-legal-entities')
      this.sendOrderDialog.legalEntities = data
    }
  }
}
