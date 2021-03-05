<template>
  <div class="page">
    <div class="content elevation-3">
      <div class="header">
        Обусждения
        <v-btn
          v-if="$store.state.auth.societyIsAdmin"
          outline
          @click="$router.push('/society/draft')"
        >
          Создать
        </v-btn>
      </div>
      <div class="subject-list">
        <div v-for="(page, i) in pages" :key="i" class="subject-item" @click="$router.push('/society/page?subject=' + page._id)">
          <v-icon large class="subject-icon">
            tab
          </v-icon>
          <div class="subject-name">
            {{ page.name }}
          </div>
          <div class="subject-info">
            <div>
              {{ page.author }}
            </div>
            <div>
              {{ tsToString(page.date) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCustomScrollbar from 'vue-custom-scrollbar'
import config from '~/config/base-config'

export default {
  name: 'Index',
  components: {
    VueCustomScrollbar
  },
  data () {
    return {
      pages: []
    }
  },
  async created () {
    const pages = await this.$axios.get(config.API_SOCIETY_URL + '/society/page')
    this.pages = pages.data
  },
  methods: {
    tsToString (ts) {
      return new Date(ts).toLocaleString()
    }
  }
}
</script>

<style scoped>
.page {
  height: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow-y: scroll;
}

.content {
  flex: 0 0 900px;
  border-radius: 5px;
  display: flex;
  flex-flow: column;
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
  margin-bottom: 20px;
}

.subject-item {
  padding: 5px 20px 5px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.subject-item:hover {
  background: #eaeaea;
}

.subject-icon {
  flex: 0 0 auto;
}

.subject-name {
  flex: 1 1 0;
  padding: 0 10px;
  font-size: 1.1rem;
}

.subject-info {
  flex: 0 0 200px;
}
</style>
