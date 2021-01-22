<template>
  <v-dialog :value="true" width="600">
    <div class="content">
      <img src="/events/oxouno_2021.min.jpg">
      <v-btn icon @click="$emit('close')">
        <v-icon large>
          close
        </v-icon>
      </v-btn>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'Event'
}
</script>

<style scoped lang="less">
.content {
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
  }

  .v-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
