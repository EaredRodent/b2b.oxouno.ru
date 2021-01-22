import VueCustomScrollbar from 'vue-custom-scrollbar'
// eslint-disable-next-line import/no-webpack-loader-syntax
import htmlHelloMessage from 'raw-loader!./hello-message.html'
import ServicesInfo from './-services-info.vue'
import { MixinClientOrdersMethods } from '~/pages/store/orders/index.js'
import config from '~/config/base-config.js'

export const MixinEvent = {
  data () {
    return {
      event: config.APP.event
    }
  },
  methods: {
    bannerClick () {
      window.open(this.event.banner.bigImage)
    }
  }
}

export default {
  name: 'Index',
  components: {
    ServicesInfo,
    VueCustomScrollbar
  },
  mixins: [MixinClientOrdersMethods, MixinEvent],
  data () {
    return {
      sexTags: [],
      org: {},
      wall: {
        timer: 0, // setTimeout
        onRead: false
      },
      htmlHelloMessage
    }
  },
  async mounted () {
    let promiseOrg = this.$axios.get('/v1/sls-org/get-for-contact')
    const promiseClient = this.apiGetForClient()
    promiseOrg = await promiseOrg
    await promiseClient
    this.org = promiseOrg.data
  },
  methods: {
    wallEnter () {
      clearTimeout(this.wall.timer)
      this.wall.timer = setTimeout(() => {
        this.wall.onRead = true
      }, 400)
    },
    wallLeave () {
      clearTimeout(this.wall.timer)
      this.wall.timer = setTimeout(() => {
        this.wall.onRead = false
      }, 500)
    }
  }
}
