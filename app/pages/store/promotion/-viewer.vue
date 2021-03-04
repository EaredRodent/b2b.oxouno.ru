<template>
  <v-dialog :value="true" fullscreen>
    <div class="x-viewer">
      <div class="x-top">
        <div
          v-if="item.type === IMG"
          class="x-content"
          :style="{background: `url('${ item.src }')`}"
        />
        <iframe
          v-if="item.type === DOC"
          :src="item.src"
          class="x-content"
        />
        <video
          v-if="item.type === VIDEO"
          :src="item.src"
          controls
          class="x-content x-video"
        />
      </div>
      <div class="x-bottom">
        <v-btn class="x-close-btn x-btn" color="#800" flat @click="close">
          Закрыть
          <v-icon>
            close
          </v-icon>
        </v-btn>

        <v-btn outline class="x-bottom-item x-btn" @click="previous">
          <v-icon>
            keyboard_arrow_left
          </v-icon>
          Предыдущий слайд
        </v-btn>
        <a class="x-bottom-item" :href="item.src" download="">
          <v-btn outline class="x-btn">
            Скачать
            <v-icon color="#444">
              mdi-download
            </v-icon>
          </v-btn>
        </a>
        <v-btn outline class="x-bottom-item x-btn" @click="next">
          Следующий слайд
          <v-icon>
            keyboard_arrow_right
          </v-icon>
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'Viewer',
  props: {
    current: {
      type: Number,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    item () {
      return this.items[this.current]
    }
  },
  beforeCreate () {
    this.UNKNOWN = 'unknown'
    this.IMG = 'img'
    this.VIDEO = 'video'
    this.DOC = 'doc'
  },
  methods: {
    download () {
      window.open(this.item.src, '_blank')
    },
    close () {
      this.$emit('close')
    },
    previous () {
      let current = this.current - 1
      if (current < 0) {
        current = this.items.length - 1
      }
      this.$emit('update-current', current)
    },
    next () {
      let current = this.current + 1
      if (this.items.length === current) {
        current = 0
      }
      this.$emit('update-current', current)
    }
  }
}
</script>

<style scoped lang="less">
  .x-viewer {
    background: white;
    height: 100%;
    display: flex;
    flex-flow: column;
    overflow: hidden;
  }

  .x-top {
    flex: 1 1 0;
    //background: lightblue;
    overflow: hidden;
  }

  .x-bottom {
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    padding: 10px;
    position: relative;
  }

  .x-content {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat !important;
    background-position: center !important;
    background-size: contain !important;
    outline: none;
  }

  .x-btn {
    width: 200px;
  }

  .x-bottom-item {
    margin-right: 10px;
    text-decoration: none;
  }

  .x-close-btn {
    position: absolute;
    width: auto;
    right: 10px;
    top: 10px;
  }

  .x-video {
    background: black;
  }
</style>
