<template>
  <component v-if="!$isGuest()" :is="windowComponent">
    <hsc-window class="a7-MessagingDialog elevation-3" title="Ваш персональный менеджер" ref="messagingDialog"
                :left.sync="left" :top.sync="top">
      <v-btn class="a7-btn a7-btn-full" small icon @click="goToPage">
        <v-icon color="blue darken-4">fullscreen</v-icon>
      </v-btn>
      <v-btn class="a7-btn a7-btn-close" small icon @click="closeMessaging">
        <v-icon color="blue darken-4">close</v-icon>
      </v-btn>

      <messaging class="a7-messaging"/>
      <div class="a7-input-area">
        <textarea class="a7-input" ref="inputArea" v-model="message" placeholder="Введите текст сообщения здесь..."/>
        <v-btn class="a7-send-btn" icon @click="send">
          <v-icon color="primary">send</v-icon>
        </v-btn>
      </div>

    </hsc-window>
  </component>
</template>

<script>
import Vue from 'vue'
import * as VueWindow from '@hscmap/vue-window'
import Messaging from './messaging'
import { isPostSuccessful } from '~/plugins/base/axios-prepare'

Vue.use(VueWindow)

export default {
  name: 'messaging-dialog',
  components: { Messaging },
  data () {
    return {
      windowComponent: {},
      message: '',
      left: 0,
      top: 0
    }
  },
  watch: {
    '$route.fullPath' (n) {
      if (n === '/messages') {
        this.$store.commit('setMessaging', false)
      }
    },
    left (n) {
      localStorage.setItem('messagingDialogLeft', n)
    },
    top (n) {
      localStorage.setItem('messagingDialogTop', n)
    }
  },
  created () {
    this.windowComponent = VueWindow.StyleFactory({})
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.inputArea.focus()
    })

    this.left = Number(localStorage.getItem('messagingDialogLeft'))
    this.top = Number(localStorage.getItem('messagingDialogTop'))
  },
  methods: {
    goToPage () {
      this.$router.push('messages')
    },
    closeMessaging () {
      this.$store.commit('setMessaging', false)
    },
    async send () {
      if (!this.message) {
        return
      }

      let response = await this.$axios.post('/v1/sls-message/send-from-client', { message: this.message })
      if (isPostSuccessful(response)) {
        this.message = ''
      }
    }
  }
}
</script>

<style scoped>

</style>
