<template>
  <div class="x-Viewer">
    <v-btn
      class="x-back-btn"
      outline
      color="#263238"
      title="Вернуться к выбору журнала"
      @click="$emit('return-btn-click')"
    >
      <v-icon>
        mdi-undo
      </v-icon>
      &nbsp;К журналам
    </v-btn>

    <v-btn
      class="x-download-btn"
      outline
      color="#263238"
      title="Скачать"
      @click="download"
    >
      <v-icon>
        mdi-download
      </v-icon>
      &nbsp;Скачать
    </v-btn>

    <div class="x-hidden">
      <img v-for="(src, i) in imgUrls" :key="i" :src="src" alt="image">
    </div>
    <flip-book
      ref="flipbook"
      :pages="imgUrls"
      :n-polygons="15"
      :class="{'x-flipbook': true, 'x-flipbook-anti-translate': 2 < page}"
      @hook:mounted="flipBookMounted"
    >
      <div v-if="page !== 1" class="x-n-btn x-n-btn-left" />
      <div v-if="page < numPages - 1" class="x-n-btn x-n-btn-right" />
    </flip-book>
    <div class="x-navigation">
      {{ pageNavigationStr }}
    </div>
  </div>
</template>

<script>
export { default } from './-viewer.js'
</script>

<style scoped lang="less">
@import "-viewer";
</style>
