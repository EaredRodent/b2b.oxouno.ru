<template>
  <div class="a16-Outlook">
    <viewer :name="viewerShow" v-if="viewerShow"
            @return-btn-click="viewerClose"/>
    <div class="a16-outlook-box" v-else>
      <div class="a16-outlook-title">
        Выберите интересующий вас журнал:
      </div>

      <div class="a16-outlook-area" ref="area">
        <carousel-3d class="a16-carousel" :key="archives.length" ref="carousel"
                     :width="width" :height="height" :space="space"
                     :perspective="15" :border="0" :min-swipe-distance="20" :onMainSlideClick="mainSlideClick">
          <slide v-for="(archive, i) in archives" :key="i" :index="i" class="a16-slide">
            <img :src="archive.previewImg" alt="img">
          </slide>
        </carousel-3d>
      </div>
      <!--    <div class="a16-btn-box">-->
      <!--      <v-btn outline large>-->
      <!--        Читать-->
      <!--        <v-icon>-->
      <!--          import_contacts-->
      <!--        </v-icon>-->
      <!--      </v-btn>-->
      <!--    </div>-->
    </div>
  </div>
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d'
import Viewer from './-viewer'

export default {
  name: 'index',
  components: { Viewer, Carousel3d, Slide },
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
  methods: {
    async fetchArchives () {
      let { data } = await this.$axios.get('/v1/outlook/get-outlook-meta')
      this.archives = data
    },
    calcCarouselSize () {
      if (!this.archives.length) {
        return
      }

      let maxHeight = this.$refs.area.offsetHeight

      let firstArchive = this.archives[0]
      let archW = firstArchive.width
      let archH = firstArchive.height
      let archRatio = archH / archW

      if (maxHeight < archH) {
        this.height = maxHeight
        this.width = (maxHeight / archH) * archW
      } else {
        this.height = archH
        this.width = archW
      }
    },
    mainSlideClick () {
      let curSlide = this.$refs.carousel.currentIndex
      this.viewerShow = this.archives[curSlide].name
    },
    viewerClose () {
      this.viewerShow = ''
    }
  },
  beforeDestroy () {
    document.getElementsByTagName('html')[0].style.overflow = this.oldOverflow
  }
}
</script>

<style scoped>

</style>
