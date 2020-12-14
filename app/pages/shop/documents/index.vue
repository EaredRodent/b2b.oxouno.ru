<template>
  <div class="a10-Documents">

    <div class="a10-grid-left">
      <div class="a10-title">Документы OXOUNO</div>
      <div>
        <div class="a10-item" v-for="(div, i) in divs" :key="i" @click="selectDiv(i)" :selected="selectItem === i">
          {{div}}
        </div>
      </div>

    </div>

    <div class="a10-grid-right">
      <div class="a10-section" v-if="selectItem === 0">
        <div class="a10-title">{{divs[selectItem]}}</div>
        <div class="a10-cert-box2">
          <a class="a10-cert-item" href="/app/static/docs/oferta/oferta_11.08.2020.docx" target="_blank">
            <img class="a10-border-elm" src="/app/static/docs/oferta/oferta_11.08.2020_prev.jpg" height="320px">
            <div class="a10-cert-item-title">
              <span class="a10-nobr">Редакция от 11.08.2020</span><br>
              <span>(Актуальная)</span>
            </div>
          </a>
          <a class="a10-cert-item" href="/app/static/docs/oferta/oferta_06.11.2019.pdf" target="_blank">
            <img class="a10-border-elm" src="/app/static/docs/oferta/oferta_06.11.2019_prev.jpg" height="320px">
            <div class="a10-cert-item-title">
              <span class="a10-nobr">Редакция от 06.11.2019</span><br>
              <span>(Устаревшая)</span>
            </div>
          </a>
        </div>
      </div>

      <div class="a10-section" v-if="selectItem === 1">
        <div class="a10-title">{{divs[selectItem]}}</div>
        <div>
          <div class="a10-cert-box">
            <a href="/app/static/docs/cert/512367.pdf" target="_blank"><img src="/app/static/docs/cert/1.jpg" height="320px"></a>
            <a href="/app/static/docs/cert/538605.pdf" target="_blank"><img src="/app/static/docs/cert/2.jpg" height="320px"></a>
            <a href="/app/static/docs/cert/538608.pdf" target="_blank"><img src="/app/static/docs/cert/3.jpg" height="320px"></a>
          </div>
          <div class="a10-cert-box2">
            <a href="/app/static/docs/cert/gost_2.pdf" target="_blank"><img src="/app/static/docs/cert/4.jpg" height="320px"></a>
          </div>
        </div>
      </div>

      <div class="a10-section" v-if="selectItem === 2">
        <div class="a10-title">{{divs[selectItem]}}</div>
        <div>
          <div class="a10-cert-box">
            <a href="/app/static/docs/award/d1.jpg" target="_blank">
              <img class="a10-border-elm" src="/app/static/docs/award/d1.jpg" height="320px">
            </a>
            <a href="/app/static/docs/award/d3.jpg" target="_blank"><img src="/app/static/docs/award/d3.jpg" height="320px"></a>
            <a href="/app/static/docs/award/d2.jpg" target="_blank"><img src="/app/static/docs/award/d2.jpg" height="320px"></a>
          </div>
          <div class="a10-cert-box2">
            <a href="/app/static/docs/award/d4.jpg" target="_blank"><img src="/app/static/docs/award/d4.jpg" height="320px"></a>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      divs: [
        'Договор оферты',
        'Сертификаты соотвествия',
        'Награды'
      ],
      selectItem: 0
    }
  },
  mounted () {

  },
  methods: {
    selectDiv (i) {
      this.selectItem = i
    }
  }
}
</script>
