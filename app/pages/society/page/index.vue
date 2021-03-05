<template>
  <div class="page">
    <div class="content elevation-3">
      <v-btn
        icon
        class="back-btn"
        large
        title="Назад"
        @click="$router.push('/society')"
      >
        <v-icon large color="#888">
          arrow_back
        </v-icon>
      </v-btn>
      <div class="header">
        <div>
          {{ page.name }}
        </div>
        <v-btn
          v-if="$store.state.auth.societyIsAdmin"
          outline
          @click="delSubject"
        >
          Удалить
        </v-btn>
      </div>
      <div class="subject-list">
        <div class="html-content" v-html="page.html" />
      </div>
      <div class="subject-comments">
        <div id="vk_comments" />
        <div
          class="fb-comments"
          :data-href="location"
          data-width="auto"
          data-numposts="20"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VueCustomScrollbar from 'vue-custom-scrollbar'
import config from '~/config/base-config'

export default {
  name: 'Id',
  components: {
    VueCustomScrollbar
  },
  data () {
    return {
      page: {},
      location
    }
  },
  async created () {
    const id = this.$route.query.subject
    const page = await this.$axios.get(config.API_SOCIETY_URL + '/society/page', {
      params: { id }
    })
    this.page = page.data
    window.VK.Widgets.Comments('vk_comments', {
      limit: 20,
      attach: '*'
    }, id)

    this.location = window.location.href

    this.$nextTick(() => {
      window.FB.init({
        appId: '295011151968727',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v10.0'
      })
    })
  },
  mounted () {
  },
  methods: {
    async delSubject () {
      const id = this.$route.query.subject

      if (!confirm('Удалить эту страницу?')) {
        return
      }

      await this.$axios.delete(config.API_SOCIETY_URL + '/society/page', {
        params: { id }
      })

      this.$router.push('/society')
    }
  }
}
</script>

<style scoped lang="less">
.page {
  height: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  flex-wrap: wrap;
}

.content {
  flex: 0 0 900px;
  border-radius: 5px;
  display: inline-flex;
  flex-flow: column;
  position: relative;
}

.back-btn {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-120%);
}

.header {
  flex: 0 0 50px;
  padding: 5px 10px;
  font-size: 1.3rem;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.subject-list {
  flex: 1 1 0;
  padding-right: 10px;
  padding-left: 10px;
}

.html-content::v-deep {
  margin: 20px 0 40px 0;

  img {
    max-width: calc(100%);
    height: auto !important;
  }
}

.subject-comments {
  display: flex;
  padding: 40px 10px 0 10px;
  border-top: 1px solid #ccc;
}

#vk_comments {
  margin-bottom: 20px;
  flex: 1 1 0;
}

.fb-comments {
  flex: 1 1 0;
}
</style>
