<template>
  <div>
    <div class="_c4-modal-screen" v-if="modalScreen"/>
    <v-snackbar v-model="userShow" color="#000" :multi-line="false" :bottom="true" :right="true"
                :timeout="userSnackbar.timeout">
      {{ userSnackbar.message }}
      <v-btn _color="black" flat @click="setUserShow(false)">
        Ок
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="debugShow" color="black" :multi-line="false" :bottom="true"
                :left="true" :timeout="debugSnackbar.timeout" auto-height class="_c4-debug" @click.stop>
      <div ref="debugSnackbar" class="_c4-debug-message">
        <json-viewer :value="debugSnackbar.message" :expand-depth="2" theme="_c4-json-viewer"/>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import js from './snackbar-ex'

export default js
</script>

<style lang="less">
  @import "./snackbar-ex";
</style>
