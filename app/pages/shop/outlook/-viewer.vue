<template>
  <div class="a13-Outlook">
    <v-btn class="a13-back-btn" outline color="#263238"
           title="Вернуться к выбору журнала"
           @click="$emit('return-btn-click')">
      <v-icon>
        mdi-undo
      </v-icon>
      &nbsp;К журналам
    </v-btn>

    <div style="display: none">
      <img v-for="(src, i) in imgUrls" :key="i" :src="src" alt="image">
    </div>
    <flip-book ref="flipbook" :pages="imgUrls" :n-polygons="15"
               v-slot="flipbook" @hook:mounted="flipBookMounted"
               :class="{'a13-flipbook': true, 'a13-flipbook-anti-translate': 2 < page}">
      <!--      <v-icon class="a13-n-btn a13-n-btn-left" large>-->
      <!--        keyboard_arrow_left-->
      <!--      </v-icon>-->
      <!--      <v-icon class="a13-n-btn a13-n-btn-right" large>-->
      <!--        keyboard_arrow_right-->
      <!--      </v-icon>-->
      <div class="a13-n-btn a13-n-btn-left" v-if="page !== 1"/>
      <div class="a13-n-btn a13-n-btn-right" v-if="page < numPages - 1"/>
    </flip-book>
    <div class="a13-navigation">
      {{ pageNavigationStr }}
    </div>
  </div>
</template>

<script>
import FlipBook from 'flipbook-vue'

export default {
  name: '-viewer',
  components: { FlipBook },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      imgUrls: [],
      canLeft: false,
      canRight: false,
      page: 1,
      numPages: 1
    }
  },
  computed: {
    pageNavigationStr () {
      let result = `${this.page}`

      if (this.page !== 1 && this.page !== this.numPages) {
        result += `-${this.page + 1}`
      }

      result += ` стр. из ${this.numPages}`

      return result
    }
  },
  watch: {
    name() {
      this.fetchImgUrls(this.name)
    }
  },
  async mounted () {
    await this.fetchImgUrls(this.name)
    this.$emit('ready')
  },
  methods: {
    async fetchImgUrls (archiveNumber) {
      let { data } = await this.$axios.get('v1/outlook/get-outlook', { params: { archiveNumber } })
      this.imgUrls = [null, ...data]
    },
    flipBookMounted () {
      this.$watch('$refs.flipbook.page', n => this.page = n)
      this.$watch('$refs.flipbook.numPages', n => this.numPages = n)
    }
  }
}
</script>

<style scoped>

</style>
