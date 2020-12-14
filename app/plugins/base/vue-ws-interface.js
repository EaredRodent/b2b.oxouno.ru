export default {
  install (Vue, options) {
    Vue.mixin({
      data () {
        return {
          wsSubscriptionIDs: []
        }
      },
      methods: {
        async $registerWsSubscription (tables, callbacks) {
          let id = await this.$store.dispatch('base/ws/registerWsSubscription', { tables, callbacks })
          this.wsSubscriptionIDs.push(id)
        },
        $unregisterWsSubscription (id) {
          this.$store.dispatch('base/ws/unregisterWsSubscription', id)
        }
      },
      destroyed () {
        this.wsSubscriptionIDs.forEach(id => this.$unregisterWsSubscription(id))
      }
    })
  }
}
