<template>
  <div v-if="$isDesktop()" class="x-AppBar x-app-bar-padding" :shadow="$route.fullPath === '/'">
    <div class="x-top">
      <!--      <div class="x-brand" @click="$router.push('/')">-->
      <!--        <img class="x-brand-img" src="/oxouno_appbar-black.svg"/>-->
      <!--        <span class="x-brand-b2b">B2B</span>-->
      <!--      </div>-->
      <div
        class="x-category x-left-margin-min"
        :matrix-selected="$route.fullPath === '/store' && catalogMode === 'assort'"
        @click="toCatalog('assort')"
      >
        Ассортиментная матрица
      </div>
      <div
        class="x-category"
        :matrix-selected="$route.fullPath === '/store' && catalogMode === 'discount'"
        @click="toCatalog('discount')"
      >
        Акционный товар
      </div>
      <!--      <div class="x-category" @click="$router.push('/store/outlook')"-->
      <!--           :matrix-selected="$route.fullPath === '/store/outlook'">-->
      <!--        Осень-Зима 2020/2021-->
      <!--      </div>-->
      <div class="x-category" @click="$router.push('/store/orders')">
        Журнал заказов
      </div>
      <!--      <div class="x-category" @click="$router.push('/services/client-card')">Карточка клиента</div>-->
      <!--      <div class="x-category" @click="$router.push('/services/documents')">Документы OXOUNO</div>-->
      <!--      <div class="x-right">-->
      <!--        <div class="x-pesr-manager">Ваш менеджер {{ org.managerFk && org.managerFk.name }}</div>-->

      <!--        <v-btn class="x-messaging" icon @click="displayMessaging">-->
      <!--          <v-icon color="blue-grey darken-3">question_answer</v-icon>-->
      <!--          <div class="x-messaging-new red accent-4" v-if="messageState.unreadCount">-->
      <!--            {{ messageState.unreadCount }}-->
      <!--          </div>-->
      <!--        </v-btn>-->

      <!--        <div class="x-user">{{ $userProperty('name') }}</div>-->
      <!--        <v-btn class="x-exit" icon @click="logout">-->
      <!--          <v-icon color="blue-grey darken-3">power_settings_new</v-icon>-->
      <!--        </v-btn>-->

      <!--      </div>-->
    </div>

    <div class="x-bottom">
      <div
        v-for="(sex, _, i) in treeAssort"
        v-if="catalogMode === 'assort'"
        :key="i"
        class="x-category"
        :style="styleForSexBlock"
        cursor-default
        :selected="sexName === sex.name"
        @mouseenter="catOnMouseEnter(sex.name)"
        @mouseleave="catOnMouseLeave"
      >
        {{ sex.name }}
      </div>

      <div
        v-for="(sex, _, i) in treeDiscount"
        v-if="catalogMode === 'discount'"
        :key="i"
        class="x-category"
        :style="styleForSexBlock"
        cursor-default
        :selected="sexName === sex.name"
        @mouseenter="catOnMouseEnter(sex.name)"
        @mouseleave="catOnMouseLeave"
      >
        {{ sex.name }}
      </div>

      <div
        v-for="(sex, _, i) in treeAssort"
        v-if="catalogMode === 'assort'"
        v-show="sexName === sex.name"
        :key="'drpbl-a' + i"
        class="x-droppable"
        @mouseenter="catOnMouseEnter(sex.name)"
        @mouseleave="catOnMouseLeave"
      >
        <div v-for="(category, _, i) in sex.categoryArr" :key="i" class="x-group">
          <div class="x-group-name">
            {{ category.name }}
          </div>
          <div
            v-for="(_class, i) in category.classArr"
            class="x-class"
            @click="setFilters(sex.name, category.name, undefined, _class)"
          >
            {{ _class }}
          </div>
        </div>
      </div>

      <div
        v-for="(sex, _, i) in treeDiscount"
        v-if="catalogMode === 'discount'"
        v-show="sexName === sex.name"
        :key="'drpbl-d' + i"
        class="x-droppable"
        @mouseenter="catOnMouseEnter(sex.name)"
        @mouseleave="catOnMouseLeave"
      >
        <div v-for="(group, _, i) in sex.groupArr" :key="i" class="x-group">
          <div class="x-group-name">
            {{ group.name }}
          </div>
          <div
            v-for="(_class, i) in group.classArr"
            class="x-class"
            @click="setFilters(sex.name, undefined, group.name, _class)"
          >
            {{ _class }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="$isMobile()" class="xm-AppBar">
    <div class="xm-app-bar" :opacity="$route.fullPath === '/'">
      <button v-ripple class="xm-menu-btn" @click="showNavigationDrawer">
        <v-icon class="xm-menu-btn-icon" color="white">
          menu
        </v-icon>

        <div v-if="toolTipHelper" class="xm-btn-tooltip" @click.stop>
          <div class="xm-btn-tooltip-icon-box">
            <v-icon class="xm-btn-tooltip-icon" color="white">
              arrow_upward
            </v-icon>
          </div>
          <div>Нажмите эту иконку, чтобы вызвать навигацию по сайту.</div>
          <div>
            <v-btn color="white" @click="hideToolTipHelper">
              Понятно
            </v-btn>
          </div>
        </div>
      </button>
      <img class="xm-svg" src="/oxouno.svg" @click="$router.push('/')">
    </div>

    <v-navigation-drawer v-model="drawer" class="xm-drawer" absolute>
      <div
        class="xm-category"
        :matrix-selected="$route.fullPath === '/catalog' && catalogMode === 'assort'"
        @click="toCatalog('assort')"
      >
        Ассортиментная матрица
      </div>
      <div
        class="xm-category"
        :matrix-selected="$route.fullPath === '/catalog' && catalogMode === 'discount'"
        @click="toCatalog('discount')"
      >
        Акционный товар
      </div>
      <div class="xm-category" @click="$router.push('/store/orders')">
        Журнал заказов
      </div>
      <!--      <div @click.capture="$event.stopPropagation()">-->
      <!--        <div class="xm-category" @click="$router.push('/store/outlook')"-->
      <!--             :matrix-selected="$route.fullPath === '/outlook'">-->
      <!--          Осень-Зима 2020/2021-->
      <!--        </div>-->
      <!--        <div class="xm-category" @click="$router.push('/client-card')">Карточка клиента</div>-->
      <!--        <div class="xm-category" @click="$router.push('/documents')">Документы OXOUNO</div>-->
      <!--      </div>-->

      <div v-ripple class="xm-pre-bottom">
        <div class="xm-profile" @click="$router.push('/')">
          <v-icon large color="black">
            account_circle
          </v-icon>
          <span class="xm-profile-name">{{ $userProperty('name') }}</span>
        </div>
      </div>
      <div class="xm-bottom">
        <div class="xm-category" @click="logout">
          Выход
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppBar',
  data () {
    return {
      dropTimer: 0,
      sexName: '',
      showAnimClass: false,
      messageState: {},
      org: {},
      sound: new Audio('/mp3/alert_19.mp3'),
      // sound: new Audio('/mp3/plink_17.mp3')
      // sound: new Audio('/mp3/alert_49.mp3')
      drawer: false,
      toolTipHelper: false
    }
  },
  computed: {
    styleForSexBlock () {
      return {
        visibility: this.$route.path.startsWith('/store') ? 'visible' : 'hidden'
      }
    },
    catalogMode () {
      return this.$store.state.filters.catalogMode
    },
    ...mapState('filters', [
      'treeAssort',
      'treeDiscount'
    ])
  },
  async mounted () {
    this.fetchToolTipHelper()
    const promiseTreeAssort = this.$axios.get('/v1/card-prod/get-app-bar-assort')
    const promiseTreeDiscount = this.$axios.get('/v1/card-prod/get-app-bar-discount')
    const promiseMsgState = this.$axios.get('/v1/sls-message-state/get-for-contact')
    const promiseOrg = this.$axios.get('/v1/sls-org/get-for-contact')
    this.$store.commit('filters/setTreeAssort', (await promiseTreeAssort).data)
    this.$store.commit('filters/setTreeDiscount', (await promiseTreeDiscount).data)
    this.messageState = (await promiseMsgState).data
    this.org = (await promiseOrg).data
    // this.$registerWsSubscription(['sls_message_state'], [async () => {
    //   let messageState = (await this.$axios.get('/v1/sls-message-state/get-for-contact')).data
    //   if (messageState.unreadCount && (this.messageState.unreadCount !== messageState.unreadCount)) {
    //     this.sound.play()
    //   }
    //   this.messageState = messageState
    // }])
  },
  methods: {
    logout () {
      this.$logout()
    },
    catOnMouseEnter (sexName) {
      clearTimeout(this.dropTimer)
      this.dropTimer = setTimeout(() => {
        this.sexName = sexName
      }, 100)
    },
    catOnMouseLeave () {
      clearTimeout(this.dropTimer)
      this.dropTimer = setTimeout(() => {
        this.sexName = ''
      }, 100)
    },
    toCatalog (mode) {
      this.$store.commit('filters/clearAll')
      this.$store.commit('filters/setCatalogMode', mode)
      this.$root.$emit('filters/clearAll')
      this.$router.push('/store')
      this.drawer = false
    },
    setFilters (sex, category, group, _class) {
      this.$store.commit('filters/clearAll')
      this.$store.commit('filters/setSexName', sex)
      this.$store.commit('filters/setCategoryName', category)
      this.$store.commit('filters/setGroupName', group)
      this.$store.commit('filters/setClassName', _class)
      this.$router.push('/store')
      this.sexName = ''
    },
    displayMessaging () {
      if (this.$route.fullPath !== '/messages') {
        this.$store.commit('setMessaging', !this.$store.state.messaging)
      }
    },
    openOxouno () {
      window.open('//oxouno.ru')
    },
    showNavigationDrawer () {
      this.drawer = true
    },
    fetchToolTipHelper () {
      // let tthState = localStorage.getItem('xm-ToolTipHelper')
      // if (tthState) {
      //   this.toolTipHelper = JSON.parse(tthState)
      // } else {
      //   this.toolTipHelper = true
      // }
    },
    hideToolTipHelper () {
      localStorage.setItem('xm-ToolTipHelper', JSON.stringify(false))
      this.fetchToolTipHelper()
    }
  }
}
</script>

<style scoped lang="less">
@import "index";
@import "index-mobile";
</style>
