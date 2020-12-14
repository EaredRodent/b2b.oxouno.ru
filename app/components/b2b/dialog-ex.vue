<template>
  <v-dialog :value="value" :width="width" class="elevation-3" :persistent="persistent" :fullscreen="fullscreen"
            @input="$emit('input', $event)"
            :key="value">
    <div class="a5-DialogEx">
      <div class="a5-header">{{ title }}</div>
      <div class="a5-body">
        <slot/>
      </div>
      <div class="a5-footer">
        <v-btn class="a5-btn a5-btn-cancel" v-if="cancelButton" outline color="red darken-4" @click="emitCancel">
          {{ cancelLabel }}
        </v-btn>
        <v-btn class="a5-btn a5-btn-ok" v-if="okButton" outline color="blue-grey darken-4" :disabled="!valid"
               :loading="loading"
               @click="emitOk">
          {{ okLabel }}
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'dialog-ex',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: () => 'Диалог'
    },
    width: {
      type: Number,
      default: () => 400
    },
    cancelButton: {
      type: Boolean,
      default: () => true
    },
    okButton: {
      type: Boolean,
      default: () => true
    },
    cancelLabel: {
      type: String,
      default: () => 'Отмена'
    },
    okLabel: {
      type: String,
      default: () => 'Ок'
    },
    valid: {
      type: Boolean,
      default: () => true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    persistent: {
      type: Boolean,
      default: () => true
    },
    fullscreen: {
      type: Boolean,
      default: () => false
    }
  },
  watch: {},
  methods: {
    emitCancel () {
      this.$emit('input', false)
      this.$emit('cancel')
    },
    emitOk () {
      this.$emit('ok')
    }
  }
}
</script>

<style scoped>

</style>
