import GalleryActiveOrder from '../-gallery-active-order.vue'
import Loading from '../../../components/loading/index.vue'

export const MixinClientOrdersMethods = {
  data () {
    return {
      orders: [], // Все заказы клиента (со всеми статусами)
      loading: false
    }
  },
  computed: {
    prepOrders () {
      return this.orders.filter(elem => elem.status === 's1_client_prep')
    },
    processOrders () {
      return this.orders.filter(elem => (elem.status === 's1_prep') ||
        (elem.status === 's1_wait_assembl') ||
        (elem.status === 's5_assembl') ||
        (elem.status === 's2_wait') ||
        (elem.status === 's6_allow') ||
        (elem.status === 's3_accept'))
    },
    sendOrders () {
      return this.orders.filter(elem => elem.status === 's7_send')
    },
    deletedOrders () {
      return this.orders.filter(elem => elem.status === 's0_del')
    },
    allOrders () {
      return this.prepOrders.concat(this.processOrders, this.sendOrders)
    },
    mobileGroups () {
      const groups = []

      if (this.showDeletedOrders) {
        groups.push({ name: 'Заказы удаленные', orders: this.deletedOrders })
      } else {
        groups.push(
          { name: 'Заказы на подготовке', orders: this.prepOrders },
          { name: 'Заказы в работе', orders: this.processOrders },
          { name: 'Заказы отправленные', orders: this.sendOrders }
        )
      }

      groups.forEach(group => (group.orders = [...group.orders].reverse()))

      return groups
    }
  },
  methods: {
    apiGetForClient () {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        this.loading = true
        const { data } = await this.$axios.get('/v1/sls-order/get-for-client')
        this.orders = data
        this.loading = false
        resolve()
      })
    },
    async downloadOrderDescription (orderId) {
      const { data: generatedFileUrl } = await this.$axios.post('/v1/generate/description', {
        orderId
      })

      window.open(generatedFileUrl)
    }
  }
}

export default {
  name: 'Index',
  components: {
    Loading,
    GalleryActiveOrder
  },
  mixins: [MixinClientOrdersMethods],
  data () {
    return {
      selectedOrder: {},
      timeStamp: 0,
      showDeletedOrders: false
    }
  },
  watch: {
    orders () {
      this.scrollEveryArea()
    },
    showDeletedOrders () {
      this.scrollEveryArea()
    }
  },
  mounted () {
    this.updateAll()
  },
  methods: {
    async updateAll () {
      await this.apiGetForClient()
      this.selectOrder()
    },

    async selectOrder (id) {
      if (id) {
        const timeStamp = Date.now()
        this.timeStamp = timeStamp
        const { data } = await this.$axios.get('/v1/sls-order/get-details', { params: { id } })
        if (this.timeStamp === timeStamp) {
          this.selectedOrder = data
        }
      } else {
        this.selectedOrder = {}
      }
    },
    creatorName (order) {
      return (order.contactFk && order.contactFk.name) || (order.userFk && order.userFk.name) || '-'
    },
    editOrder (order) {
      this.$router.push('/store')
    },
    async deleteOrderByID (id) {
      await this.$axios.post('/v1/sls-order/delete-order', { orderID: id })
      this.updateAll()
    },
    scrollEveryArea () {
      this.$nextTick(() => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            for (let i = 0; i < 4; i++) {
              const ref = this.$refs[`scrollArea${i}`]
              if (ref) {
                try {
                  ref.scrollTo({
                    top: ref.scrollHeight,
                    behavior: 'smooth'
                  })
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
