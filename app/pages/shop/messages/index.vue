<template>
  <div class="a4-Messages">
    <messaging class="a4-messaging"/>
    <div class="a4-input-area">
      <textarea class="a4-input" ref="inputArea" v-model="message" placeholder="Введите текст сообщения здесь..."/>
      <v-btn class="a4-send-btn" icon @click="send">
        <v-icon color="primary">send</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import Messaging from '../../../components/b2b/messaging'
import { isPostSuccessful } from '~/plugins/base/axios-prepare'

export default {
  name: 'index',
  components: { Messaging },
  data () {
    return {
      message: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.inputArea.focus()
    })
  },
  methods: {
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
