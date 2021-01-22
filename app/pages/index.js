import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css'
import FormLogin from './-form-login.vue'
import SlideIndicator from './slide-indicator.vue'

export default {
  name: 'Index',
  components: {
    SlideIndicator,
    FormLogin,
    Hooper,
    Slide
  },
  data () {
    return {
      showDownBtn: true
    }
  },
  created () {
    this.$root.$on('currentSlide', this.slideTo)
  },
  mounted () {
    this.$refs.hooper.$el.addEventListener('touchstart', (e) => {
      e.preventDefault()
    })
    this.$root.$emit('homePageDone')
  },
  destroyed () {
    this.$root.$off('currentSlide', this.slideTo)
    this.$store.commit('setCurrentSlide', 0)
  },
  methods: {
    slide (info) {
      this.$store.commit('setCurrentSlide', info.currentSlide)
    },
    slideTo (number) {
      this.$refs.hooper.slideTo(number)
    }
  }
}
