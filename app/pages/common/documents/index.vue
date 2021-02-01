<template>
  <div class="x-page">
    <div class="x-container-left">
      <div class="x-title">
        Документы OXOUNO
      </div>
      <div>
        <div
          v-for="(documentNode, i) in documentTree"
          :key="i"
          class="x-node"
          :selected="selectedNode === documentNode"
          @click="selectNode(documentNode)"
        >
          {{ documentNode.name }}
        </div>
      </div>
    </div>

    <vue-custom-scrollbar class="x-container-right">
      <div v-for="(item, i) in selectedNode.items" :key="i" class="x-node-item">
        <a :href="item.url">
          <img :alt="item.preview" :src="item.preview" width="220">
        </a>
        <div v-if="item.title" class="x-node-item-title">
          {{ item.title }}
        </div>
      </div>
    </vue-custom-scrollbar>
  </div>
</template>

<script>
export { default } from './index.js'
</script>

<style scoped lang="less">
@import "index";
</style>
