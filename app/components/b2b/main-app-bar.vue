<template>
  <div v-if="$isDesktop()"
       class="app-bar"
       :dark="!$isGuest()"
       :total-black="$route.fullPath !== '/services'">
    <img class="brand" v-if="$isGuest()" src="/base/oxouno-black.svg"
         @click="setCurrentSlide(0)"/>
    <img class="brand" v-else src="/base/oxouno-white.svg"
         @click="$router.push('/services')"/>


    <div class="tabs">
      <div class="tabs-area" ref="tabs">
        <div class="action"
             v-for="(tab, i) in tabs"
             :key="i"
             :is-current="isCurrentTab(tab)"
             @click="clickTab(tab)">
          {{ tab.name }}
          <div class="action-bottom"></div>
        </div>
      </div>
    </div>

    <div class="contact">
      Тел:
      <nobr>8 800 201 01 09</nobr>
    </div>

    <v-btn class="login"
           v-if="$isGuest()"
           outline
           title="Войти"
           @click="beginLogin">
      Войти
    </v-btn>
    <v-btn class="login"
           v-else
           icon title="Выйти"
           @click="$logout()">
      <v-icon color="white">power_settings_new</v-icon>
    </v-btn>
  </div>
  <div v-else-if="$isMobile()">
    <div class="app-bar-mobile" :dark="!$isGuest()">
      <v-btn icon large v-if="!$isGuest()" @click="drawer = true">
        <v-icon color="white" large>
          menu
        </v-icon>
      </v-btn>
      <img class="brand-mobile" v-if="$isGuest()" src="/base/oxouno-black.svg"
           @click="setCurrentSlide(0)"/>
      <img class="brand-mobile" v-else src="/base/oxouno-white.svg"/>
      <v-btn class="menu-btn" outline v-if="$isGuest()"
             @click="beginLogin">
        Войти
      </v-btn>
    </div>

    <v-navigation-drawer v-model="drawer"
                         absolute
                         class="a14-drawer">
      <div v-for="(tab, i) in tabs"
           class="a14-category"
           :is-current="isCurrentTab(tab)"
           :key="i"
           @click="clickTab(tab)">
        {{ tab.name }}
      </div>

      <div v-ripple class="a14-pre-bottom">
        <div class="a14-profile" @click="$router.push('/')">
          <v-icon color="black" large>
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
import config from "~/config/base-config";

const unauthorizedTabs = [
  {
    name: 'Кабинет клиента',
    path: config.PAGES.Catalog.url,
    slide: 1
  },
  {
    name: 'Дропшиппинг',
    path: config.PAGES.Unrealized.url,
    slide: 2
  },
  {
    name: 'Предзаказы',
    path: config.PAGES.Unrealized.url,
    slide: 3
  },
  {
    name: 'Региональным дилерам',
    path: config.PAGES.Unrealized.url,
    slide: 4
  },
  {
    name: 'Социальная сеть',
    path: config.PAGES.Unrealized.url,
    slide: 5
  }
]
const authorizedTabs = [
  {
    name: 'Карточка клиента',
    path: config.PAGES.ClientCard.url
  },
  {
    name: 'Документы',
    path: config.PAGES.Documents.url
  }
]

export default {
  name: "main-app-bar",
  data() {
    return {
      drawer: false,
      showMoves: false
    }
  },
  computed: {
    showAuthorizedTabs() {
      return this.$route.fullPath !== config.PAGES.Index.url
          && this.$route.fullPath !== config.PAGES.Registration.url
    },
    tabs() {
      return unauthorizedTabs
          .concat(this.showAuthorizedTabs ? authorizedTabs : [])
    }
  },
  mounted() {
  },
  methods: {
    beginLogin() {
      this.$router.push(config.PAGES.Index.url)
      this.$store.commit('setShowLoginDialog', true)
    },
    logout() {
      this.$logout()
    },
    clickTab(tab) {
      if (this.showAuthorizedTabs) {
        this.$router.push(tab.path)
      } else {
        this.setCurrentSlide(tab.slide)
      }
    },
    setCurrentSlide(number) {
      if (this.$route.fullPath === config.PAGES.Index.url) {
        this.$root.$emit('currentSlide', number)
      } else {
        this.$router.push(config.PAGES.Index.url)
        this.$root.$once('homePageDone', () => {
          this.$root.$emit('currentSlide', number)
        })
      }
    },
    isCurrentTab(tab) {
      if (this.showAuthorizedTabs) {
        if (tab.path === config.PAGES.Unrealized.url) {
          return false
        }
        return this.$route.fullPath.startsWith(tab.path)
      } else {
        return this.$store.state.currentSlide === tab.slide
      }
    }
  }
}
</script>

<style scoped lang="less">
.app-bar {
  transition: background-color 1s linear;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: #ffffffb8;
  backdrop-filter: saturate(180%) blur(15px);
  border-bottom: 1px solid darkgrey;
  display: flex;
  align-items: center;
  padding: 0 40px;
}

.app-bar-mobile:extend(.app-bar all) {
  padding: 0 10px;
}

.app-bar[dark] {
  color: #f5f5f7;
  opacity: 0.8;
  background: #000b;
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: none;
}

.brand {
  height: 50%;
  margin-right: 12px;
  cursor: pointer;
  margin-top: -2px;
}

.menu-btn {
  line-height: 1;
  margin: 0;
  margin-left: auto;
}

.brand-mobile:extend(.brand all) {
  height: 50%;
  cursor: pointer;
  margin-top: -2px;
}

.app-bar-mobile[dark] {
  .brand-mobile {
    margin: 0 auto;
    transform: translateX(-18px);
  }
}

.right {
  margin-left: auto;
}

.action {
  padding: 0 12px 0 12px;
  font-size: 14px;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  flex: 0 1 auto;
  text-align: center;
  white-space: nowrap;
}

.action:hover, .action[is-current] {
  background-color: hsla(0, 0%, 100%, .66667);
  cursor: pointer;
  //color: #063c75;

  .action-bottom {
    display: block;
  }
}

.action-bottom {
  display: none;
  position: absolute;
  top: calc(100% - 1px);
  left: 0;
  height: 3px;
  width: 100%;
  background: #000;
}

.app-bar[dark] {
  .action:hover, .action[is-current] {
    background-color: #fffb;
    color: black;
  }

  .action-bottom {
    background: grey;
  }
}

.app-bar[dark][total-black] {
  background: #000;
  opacity: 1;
}

.login {
  margin: 0 0 0 24px;
  box-shadow: none !important;
}

.tabs {
  flex: 1 1 0;
  display: flex;
  height: 100%;
  overflow: hidden;
}

.tabs-area {
  flex: 1 1 0;
  display: flex;
  height: 100%;
  overflow: hidden;
}
</style>