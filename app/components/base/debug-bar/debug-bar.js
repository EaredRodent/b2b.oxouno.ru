import { mapState, mapMutations } from 'vuex'
import config from '~/config/base-config'

export const initStoreData = function (axios, store) {
  let data = JSON.parse(localStorage.getItem('x1-debug-bar'))

  if (data) {
    store.commit('base/debug-bar/setData', data)
  }

  if (data && data.xdebug) {
    axios.defaults.params = axios.defaults.params || {}
    axios.defaults.params['XDEBUG_SESSION_START'] = 'PHPSTORM'
  } else {
    if (axios.defaults.params && axios.defaults.params['XDEBUG_SESSION_START']) {
      delete axios.defaults.params['XDEBUG_SESSION_START']
    }
  }
}

export default {
  data () {
    return {
      config
    }
  },
  computed: {
    ...mapState({
      data: (state) => state.base['debug-bar'].data
    })
  },
  methods: {
    ...mapMutations({
      setData: 'base/debug-bar/setData'
    }),
    cloneObject (obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    saveData (value) {
      localStorage.setItem('x1-debug-bar', JSON.stringify(value))
      initStoreData(this.$axios, this.$store)
    },
    saveXDebug (value) {
      let data = this.cloneObject(this.data)
      data.xdebug = value
      this.saveData(data)
    }
  }
}
