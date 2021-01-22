<template>
  <v-app>
    <div
      v-touch="touchControl"
      class="x-layout"
      :style="calcPadding"
    >
      <div class="x-wrapper">
        <nuxt v-show="!notFound" />
        <not-found v-show="notFound" />
      </div>
      <snackbar-ex />
      <debug-bar />

      <main-app-bar />
      <app-bar v-if="!$isGuest() && $route.fullPath.startsWith('/store')" />
      <alert-policy-changes v-if="oferta11082020" @ok="alertPolicyChangesOk" />
      <event v-if="event2021" @close="event2021 = false" />
    </div>
  </v-app>
</template>

<script>
export { default } from './default.js'
</script>

<style scoped lang="less">
@import "default";
</style>

<style>
@import "../node_modules/vuetify/dist/vuetify.min.css";
@import "../node_modules/material-design-icons-iconfont/dist/material-design-icons.css";
@import "../node_modules/@mdi/font/css/materialdesignicons.min.css";
</style>

<style lang="less">
@import "~~/less/reset";
</style>
