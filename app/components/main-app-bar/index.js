import config from '~/config/base-config'

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

const mobileTabs = [
  {
    name: 'Главная',
    path: config.PAGES.Common.url,
    slide: 1
  },
  {
    name: 'Кабинет клиента',
    path: config.PAGES.Catalog.url,
    slide: 1
  },
  {
    name: 'Журнал заказов',
    path: config.PAGES.Orders.url,
    slide: 1
  },
  {
    name: 'Карточка клиента',
    path: config.PAGES.ClientCard.url
  }
]

export default {
  name: 'MainAppBar',
  data () {
    return {
      drawer: false,
      showMoves: false
    }
  },
  computed: {
    showAuthorizedTabs () {
      return this.$route.fullPath !== config.PAGES.Index.url &&
        this.$route.fullPath !== config.PAGES.Registration.url
    },
    tabs () {
      return unauthorizedTabs
        .concat(this.showAuthorizedTabs ? authorizedTabs : [])
    }
  },
  beforeCreate () {
    this.mobileTabs = mobileTabs
  },
  mounted () {
  },
  methods: {
    beginLogin () {
      this.$router.push(config.PAGES.Index.url)
      this.$store.commit('setShowLoginDialog', true)
    },
    logout () {
      this.$logout()
    },
    clickTab (tab) {
      if (this.showAuthorizedTabs) {
        this.$router.push(tab.path)
      } else {
        this.setCurrentSlide(tab.slide)
      }
    },
    setCurrentSlide (number) {
      if (this.$route.fullPath === config.PAGES.Index.url) {
        this.$root.$emit('currentSlide', number)
      } else {
        this.$router.push(config.PAGES.Index.url)
        this.$root.$once('homePageDone', () => {
          this.$root.$emit('currentSlide', number)
        })
      }
    },
    isCurrentTab (tab) {
      if (this.showAuthorizedTabs) {
        if (tab.path === config.PAGES.Unrealized.url) {
          return false
        }
        return this.$route.fullPath.startsWith(tab.path)
      } else {
        return this.$store.state.currentSlide === tab.slide
      }
    },
    openInstagram () {
      window.open('https://www.instagram.com/oxouno/?hl=ru')
    }
  }
}
