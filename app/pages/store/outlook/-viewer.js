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
    name (dirName) {
      this.fetchImgUrls(dirName)
    }
  },
  mounted () {
    this.fetchImgUrls(this.name)
    this.$emit('ready')
  },
  methods: {
    fetchImgUrls (dirName) {
      if (dirName === '09.02.2021') {
        const imgUrls = Array.from({ length: 133 }, (_, i) => `/outlook/${dirName}/${i + 1}.min.jpg`)
        this.imgUrls = [null].concat(imgUrls)
      } else if (dirName === '12.02.2021') {
        const imgUrls = Array.from(
          { length: 71 },
          (_, i) => `/outlook/${dirName}/(${i + 1}).jpg`)
        this.imgUrls = [null].concat(imgUrls)
      } else if (dirName === '28.07.2020') {
        const imgUrls = Array.from(
          { length: 71 },
          (_, i) => `/outlook/${dirName}/${String((i + 1)).padStart(4, '0')}_7WJBn7_k.jpg`)
        this.imgUrls = [null].concat(imgUrls)
      } else if (dirName === '29.07.2020') {
        const imgUrls = Array.from(
          { length: 67 },
          (_, i) => `/outlook/${dirName}/${String((i + 1)).padStart(3, '0')}t_j9Afccjl.jpg`)
        this.imgUrls = [null].concat(imgUrls)
      } else if (dirName === '17.08.2020') {
        const imgUrls = Array.from(
          { length: 63 },
          (_, i) => `/outlook/${dirName}/${String((i + 1)).padStart(4, '0')}_ox4UhuF2.jpg`)
        this.imgUrls = [null].concat(imgUrls)
      } else {
        this.imgUrls = [null]
      }
      // const { data } = await this.$axios.get('v1/outlook/get-outlook', { params: { dirName } })
      // this.imgUrls = [null, ...data] 28.07.2020
    },
    flipBookMounted () {
      // eslint-disable-next-line no-return-assign
      this.$watch('$refs.flipbook.page', n => this.page = n)
      // eslint-disable-next-line no-return-assign
      this.$watch('$refs.flipbook.numPages', n => this.numPages = n)
    },
    download () {
      const dirName = this.name
      if (dirName === '09.02.2021') {
        window.open(`/outlook/${this.name}/spring_summer_2021.pdf`)
      } else if (dirName === '12.02.2021') {
        window.open(`/outlook/${this.name}/BRANDBOOK OXOUNO.pdf`)
      } else if (dirName === '28.07.2020') {
        window.open(`/outlook/${this.name}/fall_winter_2020-21.pdf`)
      } else if (dirName === '29.07.2020') {
        window.open(`/outlook/${this.name}/thermals_fall_winter_2020-21.pdf`)
      } else if (dirName === '17.08.2020') {
        window.open(`/outlook/${this.name}/document.pdf`)
      }
    }
  }
}
