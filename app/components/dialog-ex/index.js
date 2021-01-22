export default {
  name: 'DialogEx',
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
    },
    noBodyPadding: {
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
