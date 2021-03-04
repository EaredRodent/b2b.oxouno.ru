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
      <div class="header page-title">
        Черновик
        <v-btn outline @click="publish">
          Опубликовать
        </v-btn>
      </div>
      <div class="subject-list">
        <div class="subject-meta">
          <v-text-field v-model="name" label="Тема" color="black" />
          <v-text-field v-model="author" class="subject-margin" label="Автор" color="black" />
        </div>
        <editor
          v-model="html"
          api-key="qfyuzw7frlrn8gpyxdqjqogkk8nfg7568xy1ncs1clc0a7rb"
          class="subject-editor"
          :init="editorConfig"
        />
        <div class="pre-title">
          Предпросмотр
        </div>
        <div class="pre-view" v-html="html" />
      </div>
    </div>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import VueCustomScrollbar from 'vue-custom-scrollbar'
import config from '~/config/base-config'

export default {
  name: 'Index',
  components: {
    Editor,
    VueCustomScrollbar
  },
  data () {
    return {
      name: '',
      author: '',
      html: '',
      editorConfig: {
        plugins: 'autoresize paste',
        images_upload_url: config.API_SOCIETY_URL + '/society/save-image',
        paste_data_images: true
      }
    }
  },
  beforeCreate () {
  },
  methods: {
    async publish () {
      if (!(this.name && this.author)) {
        alert('Нужно заполнить поля "Тема" и "Автор".')
        return
      }

      await this.$axios.post(config.API_SOCIETY_URL + '/society/page', {
        name: this.name,
        author: this.author,
        html: this.html
      })

      this.$router.push('/society')
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
  overflow: auto;
}

.content {
  flex: 0 0 900px;
  border-radius: 5px;
  display: flex;
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
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  padding: 5px 10px;
  font-size: 1.3rem;
}

.subject-list {
  flex: 1 1 0;
  display: flex;
  flex-flow: column;
  padding: 0 20px 0 10px;
}

.subject-meta {
  display: flex;
}

.subject-margin {
  margin-left: 10px;
}

.subject-editor {
  margin-bottom: 20px;
}

.pre-view {
  margin-bottom: 20px;
}

.pre-title {
  flex: 0 0 50px;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #888;
  margin-bottom: 20px;
}
</style>
