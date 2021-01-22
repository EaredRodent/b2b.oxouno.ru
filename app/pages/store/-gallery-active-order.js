import VueCustomScrollbar from 'vue-custom-scrollbar'

let p3aCurrentModel

export default {
  name: 'GalleryActiveOrder',
  components: { VueCustomScrollbar },
  props: {
    value: {
      type: Object,
      default: () => {
      }
    },
    mode: {
      type: String,
      default: () => 'table'
    },
    actions: {
      type: Boolean,
      default: () => false
    },
    getMoreTimeButtonLoading: {
      type: Boolean,
      default: () => false
    },
    prepareOrders: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      // currentModel: 'empty'
    }
  },
  watch: {
    'value.items' () {
      p3aCurrentModel = ''
    }
  },
  mounted () {
  },
  methods: {
    renderTitle (title) {
      if (p3aCurrentModel !== title) {
        p3aCurrentModel = title
        return true
      } else {
        return false
      }
    },
    fullCount () {
      return (this.value.items && this.value.items.reduce((acc, e) => acc + e.count, 0)) || 0
    },
    fullSum () {
      return (this.value.items && this.value.items.reduce((acc, e) => acc + e.sum, 0)) || 0
    }
  }
}
