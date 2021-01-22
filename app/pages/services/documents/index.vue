<template>
  <div class="x-page">
    <div class="x-grid-left">
      <div class="x-title">
        Документы OXOUNO
      </div>
      <div>
        <div v-for="(div, i) in divs" :key="i" class="x-item" :selected="selectItem === i" @click="selectDiv(i)">
          {{ div }}
        </div>
      </div>
    </div>

    <div class="x-grid-right">
      <div v-if="selectItem === 0" class="x-section">
        <div class="x-title">
          {{ divs[selectItem] }}
        </div>
        <div class="x-cert-box2">
          <a class="x-cert-item" href="/docs/oferta/oferta_11.08.2020.docx" target="_blank">
            <img class="x-border-elm" src="/docs/oferta/oferta_11.08.2020_prev.jpg" height="320px">
            <div class="x-cert-item-title">
              <span class="x-nobr">Редакция от 11.08.2020</span><br>
              <span>(Актуальная)</span>
            </div>
          </a>
          <a class="x-cert-item" href="/docs/oferta/oferta_06.11.2019.pdf" target="_blank">
            <img class="x-border-elm" src="/docs/oferta/oferta_06.11.2019_prev.jpg" height="320px">
            <div class="x-cert-item-title">
              <span class="x-nobr">Редакция от 06.11.2019</span><br>
              <span>(Устаревшая)</span>
            </div>
          </a>
        </div>
      </div>

      <div v-if="selectItem === 1" class="x-section">
        <div class="x-title">
          {{ divs[selectItem] }}
        </div>
        <div>
          <div class="x-cert-box">
            <a href="/docs/cert/512367.pdf" target="_blank"><img src="/docs/cert/1.jpg" height="320px"></a>
            <a href="/docs/cert/538605.pdf" target="_blank"><img src="/docs/cert/2.jpg" height="320px"></a>
            <a href="/docs/cert/538608.pdf" target="_blank"><img src="/docs/cert/3.jpg" height="320px"></a>
          </div>
          <div class="x-cert-box2">
            <a href="/docs/cert/gost_2.pdf" target="_blank"><img src="/docs/cert/4.jpg" height="320px"></a>
          </div>
        </div>
      </div>

      <div v-if="selectItem === 2" class="x-section">
        <div class="x-title">
          {{ divs[selectItem] }}
        </div>
        <div>
          <div class="x-cert-box">
            <a href="/docs/award/d1.jpg" target="_blank">
              <img class="x-border-elm" src="/docs/award/d1.jpg" height="320px">
            </a>
            <a href="/docs/award/d3.jpg" target="_blank"><img src="/docs/award/d3.jpg" height="320px"></a>
            <a href="/docs/award/d2.jpg" target="_blank"><img src="/docs/award/d2.jpg" height="320px"></a>
          </div>
          <div class="x-cert-box2">
            <a href="/docs/award/d4.jpg" target="_blank"><img src="/docs/award/d4.jpg" height="320px"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export { default } from './index.js'
</script>

<style scoped lang="less">
@import "index";
</style>
