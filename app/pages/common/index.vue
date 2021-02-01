<template>
  <div v-if="$isDesktop()" class="x-page">
    <vue-custom-scrollbar class="x-left-box">
      <common-info :organization="org" :all-orders="allOrders" :prep-orders="prepOrders" />
    </vue-custom-scrollbar>
    <vue-custom-scrollbar class="x-right-box" v-html="htmlHelloMessage" />
  </div>
  <div v-else-if="$isMobile()" class="xm-page">
    <div class="xm-layout-bg">
      <common-info :organization="org" :all-orders="allOrders" :prep-orders="prepOrders" />
    </div>
  </div>
</template>

<script>
export { default } from './index.js'
</script>

<style scoped lang="less">
@import "index";
</style>
