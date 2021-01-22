<template>
  <v-dialog
    :key="value"
    :value="value"
    :width="width"
    class="elevation-3"
    :persistent="persistent"
    :fullscreen="fullscreen"
    @input="$emit('input', $event)"
  >
    <div class="x-DialogEx" :fullscreen="fullscreen">
      <div class="x-header">
        {{ title }}
      </div>
      <div class="x-body" :class="{ 'x-body-padding': !noBodyPadding }">
        <slot />
      </div>
      <div class="x-footer">
        <v-btn v-if="cancelButton" class="x-btn x-btn-cancel" outline color="black" @click="emitCancel">
          {{ cancelLabel }}
        </v-btn>
        <v-btn
          v-if="okButton"
          class="x-btn x-btn-ok"
          outline
          color="primary"
          :disabled="!valid"
          :loading="loading"
          @click="emitOk"
        >
          {{ okLabel }}
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export { default } from './index.js'
</script>

<style scoped lang="less">
@import "index";
</style>
