<template>
  <div class="a2-AppBar a2-app-bar-padding" v-if="$isDesktop()" :shadow="$route.fullPath === '/'">
    <div class="a2-top">
      <!--      <div class="a2-brand" @click="$router.push('/')">-->
      <!--        <img class="a2-brand-img" src="/oxouno_appbar-black.svg"/>-->
      <!--        <span class="a2-brand-b2b">B2B</span>-->
      <!--      </div>-->
      <div class="a2-category a2-left-margin-min" @click="toCatalog('assort')"
           :matrix-selected="$route.fullPath === '/store' && catalogMode === 'assort'">
        Ассортиментная матрица
      </div>
      <div class="a2-category" @click="toCatalog('discount')"
           :matrix-selected="$route.fullPath === '/store' && catalogMode === 'discount'">
        Акционный товар
      </div>
<!--      <div class="a2-category" @click="$router.push('/store/outlook')"-->
<!--           :matrix-selected="$route.fullPath === '/store/outlook'">-->
<!--        Осень-Зима 2020/2021-->
<!--      </div>-->
      <div class="a2-category" @click="$router.push('/store/orders')">Журнал заказов</div>
<!--      <div class="a2-category" @click="$router.push('/services/client-card')">Карточка клиента</div>-->
<!--      <div class="a2-category" @click="$router.push('/services/documents')">Документы OXOUNO</div>-->
      <!--      <div class="a2-right">-->
      <!--        <div class="a2-pesr-manager">Ваш менеджер {{ org.managerFk && org.managerFk.name }}</div>-->

      <!--        <v-btn class="a2-messaging" icon @click="displayMessaging">-->
      <!--          <v-icon color="blue-grey darken-3">question_answer</v-icon>-->
      <!--          <div class="a2-messaging-new red accent-4" v-if="messageState.unreadCount">-->
      <!--            {{ messageState.unreadCount }}-->
      <!--          </div>-->
      <!--        </v-btn>-->

      <!--        <div class="a2-user">{{ $userProperty('name') }}</div>-->
      <!--        <v-btn class="a2-exit" icon @click="logout">-->
      <!--          <v-icon color="blue-grey darken-3">power_settings_new</v-icon>-->
      <!--        </v-btn>-->

      <!--      </div>-->
    </div>

    <div class="a2-bottom">
      <div class="a2-category" v-if="catalogMode === 'assort'" :style="styleForSexBlock" cursor-default
           v-for="(sex, _, i) in treeAssort" :key="i"
           :selected="sexName === sex.name"
           @mouseenter="catOnMouseEnter(sex.name)" @mouseleave="catOnMouseLeave">
        {{ sex.name }}
      </div>

      <div class="a2-category" v-if="catalogMode === 'discount'" :style="styleForSexBlock" cursor-default
           v-for="(sex, _, i) in treeDiscount" :key="i"
           :selected="sexName === sex.name"
           @mouseenter="catOnMouseEnter(sex.name)" @mouseleave="catOnMouseLeave">
        {{ sex.name }}
      </div>

      <div class="a2-droppable" v-if="catalogMode === 'assort'" v-for="(sex, _, i) in treeAssort" :key="'drpbl-a' + i"
           v-show="sexName === sex.name"
           @mouseenter="catOnMouseEnter(sex.name)" @mouseleave="catOnMouseLeave">
        <div class="a2-group" v-for="(category, _, i) in sex.categoryArr" :key="i">
          <div class="a2-group-name">
            {{ category.name }}
          </div>
          <div class="a2-class" v-for="(_class, i) in category.classArr"
               @click="setFilters(sex.name, category.name, undefined, _class)">
            {{ _class }}
          </div>
        </div>
      </div>

      <div class="a2-droppable" v-if="catalogMode === 'discount'" v-for="(sex, _, i) in treeDiscount"
           :key="'drpbl-d' + i"
           v-show="sexName === sex.name"
           @mouseenter="catOnMouseEnter(sex.name)" @mouseleave="catOnMouseLeave">
        <div class="a2-group" v-for="(group, _, i) in sex.groupArr" :key="i">
          <div class="a2-group-name">
            {{ group.name }}
          </div>
          <div class="a2-class" v-for="(_class, i) in group.classArr"
               @click="setFilters(sex.name, undefined, group.name, _class)">
            {{ _class }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="a14-AppBar-Phone" v-else-if="$isMobile()">
    <div class="a14-app-bar" :opacity="$route.fullPath === '/'">
      <button class="a14-menu-btn" v-ripple @click="showNavigationDrawer">
        <v-icon class="a14-menu-btn-icon" color="white">menu</v-icon>

        <div class="a14-btn-tooltip" v-if="toolTipHelper" @click.stop>
          <div class="a14-btn-tooltip-icon-box">
            <v-icon class="a14-btn-tooltip-icon" color="white">arrow_upward</v-icon>
          </div>
          <div>Нажмите эту иконку, чтобы вызвать навигацию по сайту.</div>
          <div>
            <v-btn color="white" @click="hideToolTipHelper">
              Понятно
            </v-btn>
          </div>
        </div>
      </button>
      <img class="a14-svg" src="/oxouno.svg" @click="$router.push('/')">
    </div>

    <v-navigation-drawer class="a14-drawer" v-model="drawer" absolute>
      <div class="a14-category" @click="toCatalog('assort')"
           :matrix-selected="$route.fullPath === '/catalog' && catalogMode === 'assort'">
        Ассортиментная матрица
      </div>
      <div class="a14-category" @click="toCatalog('discount')"
           :matrix-selected="$route.fullPath === '/catalog' && catalogMode === 'discount'">
        Акционный товар
      </div>
      <div class="a14-category" @click="$router.push('/store/orders')">Журнал заказов</div>
      <!--      <div @click.capture="$event.stopPropagation()">-->
      <!--        <div class="a14-category" @click="$router.push('/store/outlook')"-->
      <!--             :matrix-selected="$route.fullPath === '/outlook'">-->
      <!--          Осень-Зима 2020/2021-->
      <!--        </div>-->
      <!--        <div class="a14-category" @click="$router.push('/client-card')">Карточка клиента</div>-->
      <!--        <div class="a14-category" @click="$router.push('/documents')">Документы OXOUNO</div>-->
      <!--      </div>-->

      <div class="a14-pre-bottom" v-ripple>
        <div class="a14-profile" @click="$router.push('/')">
          <v-icon large color="black">
            account_circle
          </v-icon>
          <span class="a14-profile-name">{{ $userProperty('name') }}</span>
        </div>
      </div>
      <div class="a14-bottom">
        <div class="a14-category" @click="logout">Выход</div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'app-bar',
  data() {
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
    styleForSexBlock() {
      return {
        visibility: this.$route.path.startsWith('/store') ? 'visible' : 'hidden'
      }
    },
    catalogMode() {
      return this.$store.state.filters.catalogMode
    },
    ...mapState('filters', [
      'treeAssort',
      'treeDiscount'
    ])
  },
  async mounted() {
    this.fetchToolTipHelper()
    let promiseTreeAssort = this.$axios.get('/v1/card-prod/get-app-bar-assort')
    let promiseTreeDiscount = this.$axios.get('/v1/card-prod/get-app-bar-discount')
    let promiseMsgState = this.$axios.get('/v1/sls-message-state/get-for-contact')
    let promiseOrg = this.$axios.get('/v1/sls-org/get-for-contact')
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
    logout() {
      this.$logout()
    },
    catOnMouseEnter(sexName) {
      clearTimeout(this.dropTimer)
      this.dropTimer = setTimeout(() => {
        this.sexName = sexName
      }, 100)
    },
    catOnMouseLeave() {
      clearTimeout(this.dropTimer)
      this.dropTimer = setTimeout(() => {
        this.sexName = ''
      }, 100)
    },
    toCatalog(mode) {
      this.$store.commit('filters/clearAll')
      this.$store.commit('filters/setCatalogMode', mode)
      this.$root.$emit('filters/clearAll')
      this.$router.push('/store')
      this.drawer = false
    },
    setFilters(sex, category, group, _class) {
      this.$store.commit('filters/clearAll')
      this.$store.commit('filters/setSexName', sex)
      this.$store.commit('filters/setCategoryName', category)
      this.$store.commit('filters/setGroupName', group)
      this.$store.commit('filters/setClassName', _class)
      this.$router.push('/store')
      this.sexName = ''
    },
    displayMessaging() {
      if (this.$route.fullPath !== '/messages') {
        this.$store.commit('setMessaging', !this.$store.state.messaging)
      }
    },
    openOxouno() {
      window.open('//oxouno.ru')
    },
    showNavigationDrawer() {
      this.drawer = true
    },
    fetchToolTipHelper() {
      // let tthState = localStorage.getItem('a14-ToolTipHelper')
      // if (tthState) {
      //   this.toolTipHelper = JSON.parse(tthState)
      // } else {
      //   this.toolTipHelper = true
      // }
    },
    hideToolTipHelper() {
      localStorage.setItem('a14-ToolTipHelper', JSON.stringify(false))
      this.fetchToolTipHelper()
    }
  }
}
</script>

<style scoped>

</style>
