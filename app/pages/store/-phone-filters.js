import { mapState } from 'vuex'
import Filters from './-filters.vue'
import GalleryActiveOrder from './-gallery-active-order.vue'

const SHOW_NOTHING = 0
const SHOW_MATRIX = 1
const SHOW_CATEGORY = 2
const SHOW_ACTIVE_ORDER = 3
const CATEGORY_NODE_IS_OPEN = Symbol('CATEGORY_NODE_IS_OPEN')

export default {
  name: 'PhoneFilters',
  components: {
    GalleryActiveOrder,
    Filters
  },
  props: {
    activeOrder: {
      type: Object,
      default: () => ({})
    },
    prepOrders: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      show: SHOW_NOTHING,
      treeAssortCopy: {},
      treeDiscountCopy: {}
    }
  },
  computed: {
    ...mapState('filters', [
      'catalogMode',
      'treeAssort',
      'treeDiscount'
    ]),
    prods () {
      return this.$store.state.filters.prods
    },
    userCatalogInteraction () {
      return this.$store.state.filters.userCatalogInteraction
    },
    prodsCount () {
      return this.$store.state.filters.prodsCount
    },
    fetching () {
      return this.$store.state.filters.fetching
    }
  },
  watch: {
    treeAssort (n) {
      this.treeAssortCopy = JSON.parse(JSON.stringify(n))
    },
    treeDiscount (n) {
      this.treeDiscountCopy = JSON.parse(JSON.stringify(n))
    },
    show (n) {
      this.$emit('show-change', n)
    }
  },
  created () {
    this.SHOW_NOTHING = SHOW_NOTHING
    this.SHOW_MATRIX = SHOW_MATRIX
    this.SHOW_CATEGORY = SHOW_CATEGORY
    this.SHOW_ACTIVE_ORDER = SHOW_ACTIVE_ORDER
    this.CATEGORY_NODE_IS_OPEN = CATEGORY_NODE_IS_OPEN
  },
  mounted () {
    this.treeAssortCopy = JSON.parse(JSON.stringify(this.$store.state.filters.treeAssort))
    this.treeDiscountCopy = JSON.parse(JSON.stringify(this.$store.state.filters.treeDiscount))
  },
  methods: {
    setFilters (sex, category, group, _class) {
      this.show = SHOW_NOTHING
      this.$store.commit('filters/clearAll')
      this.$store.commit('filters/setSexName', sex)
      this.$store.commit('filters/setCategoryName', category)
      this.$store.commit('filters/setGroupName', group)
      this.$store.commit('filters/setClassName', _class)
      this.$router.push('/store')
      this.sexName = ''
    },
    openCloseAction (node) {
      this.$set(node, CATEGORY_NODE_IS_OPEN, !node[CATEGORY_NODE_IS_OPEN])
    }
  }
}
