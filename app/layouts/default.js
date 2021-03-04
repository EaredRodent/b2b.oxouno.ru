import { mapState } from 'vuex'
import AlertPolicyChanges from '../components/alert-policy-changes/index.vue'
import MainAppBar from '../components/main-app-bar/index.vue'
import Event from '../components/event/index.vue'
import NotFound from '~/components/notfound/index.vue'
import SnackbarEx from '~/components/snackbar-ex/index.vue'
import DebugBar from '~/components/debug-bar/index.vue'

export default {
  components: {
    Event,
    MainAppBar,
    AlertPolicyChanges,
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
      notFound: state => state.middleware.notFound
    }),
    calcPadding () {
      const defaultPadding = 50
      let resultPadding = 0

      const isHome = this.$route.fullPath === '/common' ||
        this.$route.fullPath === '/'

      if (isHome) {
        resultPadding = 0
      } else {
        resultPadding = defaultPadding
      }

      const backgroundImage = null
      const backgroundSize = null
      const backgroundPosition = null

      // if (this.$route.fullPath.startsWith('/store') ||
      //   this.$route.fullPath.startsWith('/common/client-card') ||
      //   this.$route.fullPath.startsWith('/common/documents')
      // ) {
      //   backgroundImage = 'url("/layout.jpg")'
      //   backgroundSize = 'contain'
      //   backgroundPosition = 'bottom'
      // }

      return {
        paddingTop: `${resultPadding}px`,
        backgroundImage,
        backgroundSize,
        backgroundPosition
      }
    }
  },
  async mounted () {
  },
  methods: {
    alertPolicyChanges () {
      // Оферта 11.08.2020

      // this.oferta11082020 = localStorage.getItem('oferta11082020_seen') === null

      // ...
    },
    alertPolicyChangesOk () {
      // localStorage.setItem('oferta11082020_seen', 'true')
      // this.alertPolicyChanges()
    },
    initEventBlock () {
      // this.event2021 = localStorage.getItem('event2021') === null
      // localStorage.setItem('event2021', 'event2021')
    }
  }
}
