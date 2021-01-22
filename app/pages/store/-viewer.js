import Vue from 'vue'
import ZoomOnHover from 'vue-zoom-on-hover'
//
Vue.use(ZoomOnHover)

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    orderCreateProcessing: {
      type: Boolean,
      default: () => false
    },
    orderEditItemProcessing: {
      type: Boolean,
      default: () => false
    },
    orderDeleteItemProcessing: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      selectImg: 0,
      sizesForOrder: {},
      details: {
        infoArr: [],
        discountBiggerThan29Flag: false
      }
    }
  },
  computed: {
    themeStr () {
      if (this.value.prod.themeFk.title_price === this.value.prod.themeFk.title) {
        return this.value.prod.themeFk.title_price
      } else {
        return this.value.prod.themeFk.title_price + ' / ' + this.value.prod.themeFk.title
      }
    }
  },
  watch: {
    async 'value.state' (n) {
      if (n) {
        this.selectImg = 0
        this.details = {}
        const { data } = await this.$axios.get('/v1/card-prod/get-details', {
          params: {
            prodId: this.value.prod.prodId,
            printId: this.value.prod.printFk ? this.value.prod.printFk.id : 1
          }
        })
        this.sizesForOrder = this.value.sizesForOrder
        this.details = data
      }
    }
  },
  mounted () {
  },
  methods: {
    getAverageImageColor () {
      // const canvas = document.createElement('canvas')
      // const context = canvas.getContext('2d')
      // const img = document.createElement('img')
      // img.crossOrigin = 'anonymous'
      // img.src = this.value.prod.photos.small[0]
      // img.addEventListener('load', () => {
      //   canvas.width = img.naturalWidth
      //   canvas.height = img.naturalHeight
      //   context.drawImage(img, 0, 0)
      //   const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      //   console.log(imageData)
      // })
    },
    canCreateOrder () {
      return Object.entries(this.sizesForOrder).some(value => value[1])
    },
    addBtnClicked () {
      if (this.value.slsItemId) {
        this.editItemFromOrder()
      } else {
        this.addItemToOrder()
      }
    },
    addItemToOrder () {
      const form = {
        blank_fk: this.value.prod.prodId,
        print_fk: this.value.prod.printFk ? this.value.prod.printFk.id : 1,
        ...this.sizesForOrder
      }
      this.$emit('add-item-to-order', form)
    },
    editItemFromOrder () {
      const form = {
        sls_item_id: this.value.slsItemId,
        ...this.sizesForOrder
      }
      this.$emit('edit-item-from-order', form)
    },
    clone (object) {
      return JSON.parse(JSON.stringify(object))
    },
    windowOpen (link) {
      window.open(link)
    }
  }
}
