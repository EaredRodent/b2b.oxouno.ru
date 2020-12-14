<template>
  <v-dialog :value="showState" :width="400"
            :persistent="true"
            class="a20-AlertPolicyChanges">
    <div class="a20-dialog">
      <div class="a20-head">
        Уведомление клиенту
      </div>
      <div class="a20-body">
        Просим Вас обратить внимание на изменения в договоре оферты.<br>
        С действубщим договором Вы можете ознакомиться <a href="/documents" target="_blank">здесь</a>, выбрав пункт "Договор оферты".<br>
      </div>
      <div class="a20-foot">
        <v-btn class="a20-m0" outline color="black"
               @click="$emit('ok')">
          Ок
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'alert-policy-changes',
  computed: {
    showState() {
      const isNotDocumentPage = this.$route.fullPath !== '/documents'
      const isNotGuest = !this.$isGuest()

      return isNotDocumentPage && isNotGuest
    }
  }
}
</script>

<style scoped>

</style>
