import { mapState } from 'vuex'
import AlertPolicyChanges from '../components/alert-policy-changes/index.vue'
import MainAppBar from '../components/main-app-bar/index.vue'
import Event from '../components/event/index.vue'
import NotFound from '~/components/notfound/index.vue'
import SnackbarEx from '~/components/snackbar-ex/index.vue'
import DebugBar from '~/components/debug-bar/index.vue'
import AppBar from '~/components/app-bar/index.vue'

export default {
  components: {
    Event,
    MainAppBar,
    AlertPolicyChanges,
    AppBar,
    NotFound,
    SnackbarEx,
    DebugBar
  },
  data () {
    return {
      touchControl: {
        // right: () => this.$refs.appBar.drawer = true
      },
      oferta11082020: false,
      event2021: false
    }
  },
  computed: {
    ...mapState({
      notFound: state => state.middleware.notFound,
      messaging: state => state.messaging
    }),
    isGuest () {
      return this.$isGuest()
    },
    getAppBarStyle () {
      const style = {}

      if (!this.$isGuest()) {
        if (this.$isDesktop()) {
          style.paddingTop = '104px'
        }
        if (this.$isMobile()) {
          style.paddingTop = '52px'
        }
      }
      return style
    },
    calcPadding () {
      const defaultPadding = 50
      let resultPadding = 0

      const isHome = this.$route.fullPath === '/services' ||
        this.$route.fullPath === '/'

      const isServiceStore = this.$route.fullPath.startsWith('/store')

      if (isHome) {
        resultPadding = 0
      } else if (isServiceStore) {
        if (this.$isMobile()) {
          resultPadding = defaultPadding
        } else {
          resultPadding = defaultPadding + 74
        }
      } else {
        resultPadding = defaultPadding
      }

      return {
        paddingTop: `${resultPadding}px`
      }
    }
  },
  async mounted () {
    // this.$watch('$route.fullPath', this.updateBackground)
    // this.$watch('isGuest', this.updateBackground)
    // this.updateBackground()
    // this.alertPolicyChanges()
    // this.initEventBlock()
  },
  methods: {
    updateBackground () {
      if (this.$route.fullPath === '/' && this.$isGuest()) {
        document.documentElement.style.background = 'url("/wallpapers/3.jpg") fixed'
        document.documentElement.style.backgroundSize = 'cover'
      } else if (this.$route.fullPath === '/' && !this.$isGuest()) {
        document.documentElement.style.background = 'url("/wallpapers/9_4.jpg") fixed'
        document.documentElement.style.backgroundSize = 'cover'
      } else if (this.$route.fullPath.split('?')[0] === '/restore' && this.$isGuest()) {
        document.documentElement.style.background = 'url("/wallpapers/3.jpg") fixed'
        document.documentElement.style.backgroundSize = 'cover'
      } else {
        document.documentElement.style.background = 'white'
        // document.documentElement.style.background = 'url("/wallpapers/3.jpg") fixed'
        // document.documentElement.style.backgroundSize = 'cover'
      }
    },
    alertPolicyChanges () {
      // Оферта 11.08.2020

      // this.oferta11082020 = localStorage.getItem('oferta11082020_seen') === null

      // ...
    },
    alertPolicyChangesOk () {
      localStorage.setItem('oferta11082020_seen', 'true')
      this.alertPolicyChanges()
    },
    initEventBlock () {
      this.event2021 = localStorage.getItem('event2021') === null
      localStorage.setItem('event2021', 'event2021')
    }
  }
}
