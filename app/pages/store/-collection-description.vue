<template>
  <div class="a3e-CollectionDescription">
    <div class="a3e-head">
      {{ collection.name }}
    </div>
    <div class="a3e-body">
      {{ epithets }}
    </div>
    <div class="a3e-foot">
      <v-btn class="a3e-btn" v-if="!showMore" small outline @click="showMore = true">Читать далее</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'collection-description',
  props: ['value'],
  data() {
    return {
      showMore: false
    }
  },
  computed: {
    collection () {
      return this.value
    },
    epithets() {
      let value = this.collection.epithets
      return this.showMore ? value : value.substring(0, 535) + (value.length > 535 ? '...' : '')
    }
  }
}
</script>

<style scoped>

</style>
