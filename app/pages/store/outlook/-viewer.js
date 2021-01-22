import FlipBook from 'flipbook-vue'

export default {
  name: 'Viewer',
  components: { FlipBook },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      imgUrls: [],
      canLeft: false,
      canRight: false,
      page: 1,
      numPages: 1
    }
  },
  computed: {
    pageNavigationStr () {
      let result = `${this.page}`

      if (this.page !== 1 && this.page !== this.numPages) {
        result += `-${this.page + 1}`
      }

      result += ` стр. из ${this.numPages}`

      return result
    }
  },
  watch: {
    name () {
      this.fetchImgUrls(this.name)
    }
  },
  async mounted () {
    await this.fetchImgUrls(this.name)
    this.$emit('ready')
  },
  methods: {
    async fetchImgUrls (archiveNumber) {
      const { data } = await this.$axios.get('v1/outlook/get-outlook', { params: { archiveNumber } })
      this.imgUrls = [null, ...data]
    },
    flipBookMounted () {
      // eslint-disable-next-line no-return-assign
      this.$watch('$refs.flipbook.page', n => this.page = n)
      // eslint-disable-next-line no-return-assign
      this.$watch('$refs.flipbook.numPages', n => this.numPages = n)
    }
  }
}
