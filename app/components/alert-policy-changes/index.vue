<template>
  <v-dialog
    :value="showState"
    :width="400"
    :persistent="true"
    class="x-AlertPolicyChanges"
  >
    <div class="x-dialog">
      <div class="x-head">
        Уведомление клиенту
      </div>
      <div class="x-body">
        Просим вас обратить внимание на изменения в договоре оферты.<br>
        С действубщим договором Вы можете ознакомиться <a href="/documents" target="_blank">здесь</a>, выбрав пункт
        "Договор оферты".<br>
      </div>
      <div class="x-foot">
        <v-btn
          class="x-m0"
          outline
          color="black"
          @click="$emit('ok')"
        >
          Ок
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'AlertPolicyChanges',
  computed: {
    showState () {
      const isNotDocumentPage = this.$route.fullPath !== '/documents'
      const isNotGuest = !this.$isGuest()

      return isNotDocumentPage && isNotGuest
    }
  }
}
</script>

<style scoped lang="less">
.x-AlertPolicyChanges {
}

.x-dialog {
  background: white;
}

.x-head {
  padding: 10px;
  font-size: 18px;
  color: white;
  background: black;
  font-weight: 300;
}

.x-body {
  padding: 10px;
  font-size: 16px;
}

.x-foot {
  padding: 10px;
  display: flex;
  justify-content: center;
}

.x-m0 {
  margin: 0;
}
</style>
