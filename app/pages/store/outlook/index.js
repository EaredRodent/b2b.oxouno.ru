import { Carousel3d, Slide } from 'vue-carousel-3d'
import Viewer from './-viewer.vue'

export default {
  name: 'Index',
  components: {
    Viewer,
    Carousel3d,
    Slide
  },
  data () {
    return {
      archives: [],
      width: 0,
      height: 0,
      oldOverflow: '',
      viewerShow: ''
    }
  },
  computed: {
    space () {
      return this.width * 1.33
    }
  },
  async mounted () {
    await this.fetchArchives()
    this.calcCarouselSize()

    window.addEventListener('resize', this.calcCarouselSize)

    this.oldOverflow = document.getElementsByTagName('html')[0].style.overflow
    document.getElementsByTagName('html')[0].style.overflow = 'hidden'
  },
  beforeDestroy () {
    document.getElementsByTagName('html')[0].style.overflow = this.oldOverflow
  },
  methods: {
    async fetchArchives () {
      const { data } = await this.$axios.get('/v1/outlook/get-outlook-meta')
      this.archives = data
    },
    calcCarouselSize () {
      if (!this.archives.length) {
        return
      }

      const maxHeight = this.$refs.area.offsetHeight

      const firstArchive = this.archives[0]
      const archW = firstArchive.width
      const archH = firstArchive.height

      if (maxHeight < archH) {
        this.height = maxHeight
        this.width = (maxHeight / archH) * archW
      } else {
        this.height = archH
        this.width = archW
      }
    },
    mainSlideClick () {
      const curSlide = this.$refs.carousel.currentIndex
      this.viewerShow = this.archives[curSlide].name
    },
    viewerClose () {
      this.viewerShow = ''
    }
  }
}
