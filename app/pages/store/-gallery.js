export default {
  name: 'Gallery',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    items: {
      type: Array,
      default: () => []
    },
    mode: {
      type: String,
      default: () => 'table'
    },
    mobile: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      groups: [],
      items2: []
    }
  },
  watch: {
    items: {
      deep: true,
      handler () {
        this.groupItems()
      }
    }
  },
  methods: {
    groupItems () {
      const groups = {}

      const itemsHaveCollection = []
      const itemsHaveNotCollection = []

      this.items.forEach((item) => {
        if (item.collectionStr) {
          itemsHaveCollection.push(item)
        } else {
          itemsHaveNotCollection.push(item)
        }
      })

      itemsHaveCollection.forEach((item) => {
        if (!groups[item.categoryStr]) {
          groups[item.categoryStr] = {}
        }

        const category = groups[item.categoryStr]

        if (!category[item.collectionStr]) {
          category[item.collectionStr] = []
        }

        const collection = category[item.collectionStr]
        collection.push(item)
      })

      itemsHaveNotCollection.forEach((item) => {
        const discountKey = 'Изделия со скидкой ' + item.discount + '%'
        if (!groups[discountKey]) {
          groups[discountKey] = {}
        }

        const discount = groups[discountKey]

        if (!discount[item.groupStr]) {
          discount[item.groupStr] = []
        }

        const group = discount[item.groupStr]
        group.push(item)
      })

      this.groups = groups
    }
  }
}
