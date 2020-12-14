import { mapState, mapMutations, mapActions } from 'vuex'
import JsonViewer from 'vue-json-viewer'

export default {
  props: {},
  components: {
    JsonViewer
  },
  computed: {
    ...mapState({
      userSnackbar: state => state['base']['snackbar'].user,
      debugSnackbar: state => state['base']['snackbar'].debug,
      modalScreen: state => state['base']['snackbar'].modalScreen
    }),
    userShow: {
      get () {
        return this.userSnackbar.show
      },
      set (value) {
        this.setUserShow(value)
      }
    },
    debugShow: {
      get () {
        return this.debugSnackbar.show
      },
      set (value) {
        this.setDebugShow(value)
      }
    }
  },
  mounted () {
    window.addEventListener('click', (e) => {
      if (this.$refs.debugSnackbar) {
        let bar = this.$refs.debugSnackbar.parentElement.getBoundingClientRect()
        console.log(JSON.parse(JSON.stringify(bar)))
        if (!(((bar.x <= e.x) && (e.x < (bar.x + bar.width))) &&
          ((bar.y <= e.y) && (e.y < (bar.y + bar.height))))) {
          this.setDebugShow(false)
        }
      }
    })
  },
  methods: {
    ...mapMutations({
      setUserShow: 'base/snackbar/setUserShow',
      setDebugShow: 'base/snackbar/setDebugShow'
    })
  }
}
