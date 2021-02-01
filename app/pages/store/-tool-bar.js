import { mapState } from 'vuex'

export default {
  name: 'ToolBar',
  data () {
    return {
      dropTimer: 0,
      sexName: '',
      drawer: false,
      toolTipHelper: false
    }
  },
  computed: {
    styleForSexBlock () {
      return {
        visibility: this.$route.path.startsWith('/store') ? 'visible' : 'hidden'
      }
    },
    catalogMode () {
      return this.$store.state.filters.catalogMode
    },
    ...mapState('filters', [
      'treeAssort',
      'treeDiscount'
    ])
  },
  async mounted () {
  },
  methods: {
    logout () {
      this.$logout()
    },
    catOnMouseEnter (sexName) {
      clearTimeout(this.dropTimer)
      this.dropTimer = setTimeout(() => {
        this.sexName = sexName
      }, 100)
    },
    catOnMouseLeave () {
      clearTimeout(this.dropTimer)
      this.dropTimer = setTimeout(() => {
        this.sexName = ''
      }, 100)
    },
    toCatalog (mode) {
      this.$store.commit('filters/clearAll')
      this.$store.commit('filters/setCatalogMode', mode)
      this.$root.$emit('filters/clearAll')
      this.$router.push('/store')
      this.drawer = false
    },
    setFilters (sex, category, group, _class) {
      this.$store.commit('filters/clearAll')
      this.$store.commit('filters/setSexName', sex)
      this.$store.commit('filters/setCategoryName', category)
      this.$store.commit('filters/setGroupName', group)
      this.$store.commit('filters/setClassName', _class)
      this.$router.push('/store')
      this.sexName = ''
    }
  }
}
