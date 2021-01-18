<template>
  <vue-custom-scrollbar class="a8-Messaging" ref="scrollArea" v-if="messages.length">
    <div class="a8-list">
      <div class="a8-list-item" v-for="msg in messages" :key="msg.id">
        <div class="a8-avatar darken-4" :class="colors[msg.user_fk % colors.length]">
          {{ (msg.userFk && getSuperShortString(msg.userFk.name)) || 'NN' }}
        </div>
        <div class="a8-message">
          <div class="a8-user-name text--darken-4"
               :class="colors[msg.user_fk % colors.length] + '--text'">
            {{ msg.userFk.name }}
          </div>
          <div class="a8-message-text" v-html="msg.message.replace(/\n/g, '<br>')"/>
          <div class="a8-message-date">{{ msg.ts_create | formatDateYmdHi }}</div>
          <div class="a8-decoration"/>
        </div>
      </div>
    </div>
  </vue-custom-scrollbar>
  <div class="a8-no-messages" v-else>
    Сообщений нет
  </div>
</template>

<script>
import VueCustomScrollbar from 'vue-custom-scrollbar'

export default {
  name: 'messaging',
  components: {
    VueCustomScrollbar
  },
  data () {
    return {
      messages: [],
      colors: [
        'red', 'pink', 'purple', 'deep-purple', 'indigo',
        'blue', 'light-blue', 'cyan', 'teal', 'green',
        'light-green', 'lime', 'yellow', 'amber', 'orange',
        'deep-orange', 'brown', 'blue-grey'
      ]
    }
  },
  async mounted () {
    this.updateMessages()
    // this.$registerWsSubscription(['sls_message'], [() => {
    //   this.updateMessages()
    // }])
  },
  methods: {
    async updateMessages () {
      this.messages = await new Promise(this.apiGetMessages)
      this.$nextTick(() => {
        let scrollArea = this.$refs.scrollArea && this.$refs.scrollArea.$el
        if (scrollArea) {
          if(/Google Inc./.test(navigator.vendor)) {
            scrollArea.scrollTo({
              left: 0,
              top: scrollArea.scrollHeight,
              behavior: 'smooth'
            })
          } else {
            scrollArea.scrollTop = scrollArea.scrollHeight
          }
        }
      })
    },
    async apiGetMessages (resolve, reject) {
      let { data } = await this.$axios.get('/v1/sls-message/get-messages-for-client')
      resolve(data)
    },
    getSuperShortString (str) {
      return str.split(' ').map(e => e[0]).slice(0, 2).join('')
    }
  }
}
</script>

<style scoped>

</style>
