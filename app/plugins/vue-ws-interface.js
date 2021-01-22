export default {
  install (Vue, options) {
    Vue.mixin({
      data () {
        return {
          wsSubscriptionIDs: []
        }
      },
      destroyed () {
        this.wsSubscriptionIDs.forEach(id => this.$unregisterWsSubscription(id))
      },
      methods: {
        async $registerWsSubscription (tables, callbacks) {
          const id = await this.$store.dispatch('ws/registerWsSubscription', {
            tables,
            callbacks
          })
          this.wsSubscriptionIDs.push(id)
        },
        $unregisterWsSubscription (id) {
          this.$store.dispatch('ws/unregisterWsSubscription', id)
        }
      }
    })
  }
}
