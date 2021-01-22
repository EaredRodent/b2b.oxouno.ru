<template>
  <div v-if="!config.MODE.envProd" class="_db">
    <div class="_db-hover-area" />
    <div class="_db-buttons">
      <v-tooltip left>
        <template #activator="{ on }">
          <v-btn :color="data.xdebug ? 'green' : 'red'" fab v-on="on" @click="saveXDebug(!data.xdebug)">
            <v-icon color="white">
              fa-times
            </v-icon>
          </v-btn>
        </template>
        {{ data.xdebug ? 'XDebug: ON' : 'XDebug: OFF' }}
      </v-tooltip>
    </div>
  </div>
</template>

<script>
import js from './debug-bar'

export default js
</script>

<style lang="less">
@import "./debug-bar";
</style>
