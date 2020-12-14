<template>
  <v-app>
    <div class="a1-Default" v-touch="touchControl">
      <div class="a1-wrapper">
        <nuxt v-show="!notFound"/>
        <not-found v-show="notFound"/>
      </div>
      <snackbar-ex/>
      <debug-bar/>

      <main-app-bar/>
      <app-bar :class="($route.fullPath !== '/') && 'a1-app-bar-white'"
               v-if="!$isGuest()" ref="appBar"/>
      <messaging-dialog ref="lol" v-if="messaging"/>
      <alert-policy-changes v-if="oferta11082020" @ok="alertPolicyChangesOk"/>
    </div>
  </v-app>
</template>

<script>
import NotFound from '~/components/base/notfound/index'
import SnackbarEx from '~/components/base/snackbar-ex/index'
import DebugBar from '~/components/base/debug-bar/index'
import { mapState, mapActions } from 'vuex'
import AppBar from '~/components/b2b/app-bar'
import MessagingDialog from '~/components/b2b/messaging-dialog'
import AlertPolicyChanges from '../components/b2b/alert-policy-changes'
import MainAppBar from "../components/b2b/main-app-bar";

export default {
  components: {
    MainAppBar,
    AlertPolicyChanges,
    AppBar,
    NotFound,
    SnackbarEx,
    DebugBar,
    MessagingDialog
  },
  data () {
    return {
      touchControl: {
        right: () => this.$refs.appBar.drawer = true
      },
      oferta11082020: false
    }
  },
  computed: {
    ...mapState({
      notFound: (state) => state['base']['middleware'].notFound,
      messaging: (state) => state.messaging
    }),
    isGuest () {
      return this.$isGuest()
    },
    getAppBarStyle () {
      let style = {}

      if (!this.$isGuest()) {
        if (this.$isDesktop()) {
          style.paddingTop = '104px'
        }
        if (this.$isMobile()) {
          style.paddingTop = '52px'
        }
      }
      return style
    }
  },
  async mounted () {
    // this.$watch('$route.fullPath', this.updateBackground)
    // this.$watch('isGuest', this.updateBackground)
    // this.updateBackground()
    // this.alertPolicyChanges()
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
        //document.documentElement.style.background = 'url("/wallpapers/3.jpg") fixed'
        //document.documentElement.style.backgroundSize = 'cover'

      }
    },
    alertPolicyChanges () {
      // Оферта 11.08.2020

      if (localStorage.getItem('oferta11082020_seen') === null) {
        this.oferta11082020 = true
      } else {
        this.oferta11082020 = false
      }

      // ...
    },
    alertPolicyChangesOk() {
      localStorage.setItem('oferta11082020_seen', 'true')
      this.alertPolicyChanges()
    }
  }
}
</script>

<style>
  @import "../node_modules/vuetify/dist/vuetify.min.css";
  @import "../node_modules/material-design-icons-iconfont/dist/material-design-icons.css";
  @import "../node_modules/@mdi/font/css/materialdesignicons.min.css";
</style>

<style lang="less">
  @import "../pages/pages";
</style>
