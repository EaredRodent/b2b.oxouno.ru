<template>
  <div class="page">
    <div class="content elevation-3">
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
      <v-btn
        icon
        class="back-btn"
        large
        title="Назад"
        @click="back"
      >
        <v-icon large color="#888">
          arrow_back
        </v-icon>
      </v-btn>
    </div>

    <dialog-ex v-model="insertVideoDialog.state" title="Вставка видео" @ok="insertVideo">
      <v-text-field v-model="insertVideoDialog.form.url" label="Укажите ссылку на видео с YouTube." />
      <div v-if="insertVideoDialog.showError" class="x-errors">
        Ссылка не является URL видео с YouTube.
      </div>
    </dialog-ex>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import VueCustomScrollbar from 'vue-custom-scrollbar'
import config from '~/config/base-config'
import DialogEx from '~/components/dialog-ex/index.vue'

export default {
  name: 'Index',
  components: {
    DialogEx,
    Editor,
    VueCustomScrollbar
  },
  data () {
    return {
      name: '',
      author: '',
      html: '',
      editorConfig: {
        content_css: '/css/tiny-mce.css',
        plugins: 'autoresize paste',
        toolbar: 'addyt',
        images_upload_url: config.API_SOCIETY_URL + '/society/save-image',
        paste_data_images: true,
        setup: (editor) => {
          editor.ui.registry.addButton('addyt', {
            text: 'Вставить видео',
            icon: 'youtube',
            onAction: () => {
              this.insertVideoDialog.state = true
            }
          })
          editor.ui.registry.addIcon(
            'youtube',
            // eslint-disable-next-line no-multi-str
            '<svg style="width:24px;height:24px" viewBox="0 0 24 24">\
            <path fill="currentColor" d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64\
            21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19\
            21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78\
            17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84\
            4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73\
            2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69\
            4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16\
            19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" />\
            </svg>'
          )
        }
      },
      messageConfirm: 'Вы хотите уйти? У вас есть несохранённые изменения!',
      insertVideoDialog: {
        state: false,
        showError: false,
        form: {
          url: ''
        }
      }
    }
  },
  beforeCreate () {
  },
  mounted () {
    window.addEventListener('beforeunload', (e) => {
      if (this.html) {
        e.returnValue = this.messageConfirm
        return this.messageConfirm
      }
    })
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
    },
    back () {
      if (this.html && !confirm(this.messageConfirm)) { return }
      this.$router.push('/society')
    },
    insertVideo () {
      this.insertVideoDialog.showError = false
      const regExec = /v=([\w\d]+)/.exec(this.insertVideoDialog.form.url) ||
          /be\/([\w\d]+)/.exec(this.insertVideoDialog.form.url)
      if (!regExec) {
        this.insertVideoDialog.showError = true
        return
      }
      window.tinymce.activeEditor.insertContent(`\
      <iframe style="width: 100%; height: 400px;" \
      src="https://www.youtube.com/embed/${regExec[1]}" \
      frameborder="0" allow="accelerometer; autoplay; \
      clipboard-write; encrypted-media; gyroscope; \
      picture-in-picture" allowfullscreen \
      ></iframe>
      `)
      this.insertVideoDialog.state = false
      this.insertVideoDialog.form.url = ''
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
  flex-wrap: wrap;
  overflow-y: scroll;
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
  padding: 0 10px 0 10px;
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

.pre-view::v-deep {
  margin-bottom: 20px;

  img {
    max-width: calc(100%);
    height: auto !important;
  }
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

.x-errors {
  margin-top: 10px;
  background: #fee;
  color: #e33;
  padding: 10px;
}
</style>
