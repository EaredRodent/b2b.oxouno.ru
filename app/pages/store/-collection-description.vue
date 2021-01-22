<template>
  <div class="x-CollectionDescription">
    <div class="x-head">
      {{ collection.name }}
    </div>
    <div class="x-body">
      {{ epithets }}
    </div>
    <div class="x-foot">
      <v-btn v-if="!showMore" class="x-btn" small outline @click="showMore = true">
        Читать далее
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollectionDescription',
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      showMore: false
    }
  },
  computed: {
    collection () {
      return this.value
    },
    epithets () {
      const value = this.collection.epithets
      return this.showMore ? value : value.substring(0, 535) + (value.length > 535 ? '...' : '')
    }
  }
}
</script>

<style scoped lang="less">
@import "~~/less/constants";

.x-CollectionDescription {}

.x-head {
  text-align: center;
  font-size: 30px;
  font-weight: 100;
  border-top: 1px solid @borderColor;
  border-bottom: 1px solid @borderColor;
}

.x-body {
  margin-top: 15px;
  padding: 0 5vw 15px 5vw;
  overflow: hidden;
}

.x-foot {
  margin-bottom: 20px;
  border-bottom: 1px solid @borderColor;
  text-align: center;
}

.x-btn {
  margin-bottom: 15px;
}
</style>
