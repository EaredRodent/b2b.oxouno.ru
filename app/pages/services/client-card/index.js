import VueCustomScrollbar from 'vue-custom-scrollbar'

export default {
  name: 'Index',
  components: { VueCustomScrollbar },
  data () {
    return {
      client: {},
      contacts: [],
      legalEntities: [],
      docsForLegalEntities: [],
      loadState: '',
      typeSaleVariant: {
        wholesale: 'Опт',
        retail: 'Розница',
        eshop: 'Интернет магазин'
      }
    }
  },
  mounted () {
    this.updateAll()
  },
  methods: {
    async updateAll () {
      const client = this.$axios.get('/v1/sls-org/get-for-contact')
      const contacts = this.$axios.get('/v1/anx-user/get-contacts')
      const legalEntities = this.$axios.get('/v1/sls-client/get-legal-entities')

      this.client = (await client).data
      this.contacts = (await contacts).data
      this.legalEntities = (await legalEntities).data
    },

    openFile (url) {
      window.open(url)
    }
  }
}
