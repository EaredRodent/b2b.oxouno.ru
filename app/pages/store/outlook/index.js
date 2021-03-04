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
    fetchArchives () {
      // const { data } = await this.$axios.get('/v1/outlook/get-outlook-meta')
      this.archives = [
        {
          name: '12.02.2021',
          previewImg: '/outlook/12.02.2021/(1).jpg',
          width: 1654,
          height: 2339
        },
        {
          name: '09.02.2021',
          previewImg: '/outlook/09.02.2021/1.min.jpg',
          width: 2126,
          height: 2834
        },
        {
          name: '28.07.2020',
          previewImg: '/outlook/28.07.2020/0001_7WJBn7_k.jpg',
          width: 1754,
          height: 2480
        },
        {
          name: '29.07.2020',
          previewImg: '/outlook/29.07.2020/001t_j9Afccjl.jpg',
          width: 1754,
          height: 2480
        },
        {
          name: '17.08.2020',
          previewImg: '/outlook/17.08.2020/0001_ox4UhuF2.jpg',
          width: 1754,
          height: 2480
        }
      ]
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
