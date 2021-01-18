<template>
  <div class="bg" v-if="$isDesktop()">
    <hooper class="hooper" ref="hooper"
            :vertical="true" :centerMode="true" :initial-slide="0" :transition="800"
            :mouseDrag="false"
            @slide="slide">
      <slide class="slide">
        <div class="m-container">
          <div class="brand-sfx">B2B</div>
          <img class="brand" src="/base/oxouno-black.svg"/>
          <div class="about">Портал для оптовых клиентов</div>
          <div class="table-box">
            <div class="table-label">Единая система скидок</div>
            <table class="m-table">
              <thead>
              </thead>
              <tbody>
              <tr>
                <td>Розница ★</td>
                <td>- 5%</td>
                <td>(покупка от 50 000 р.)</td>
                <td>Опт SILVER</td>
                <td>- 20%</td>
                <td>(от 500 000 р.)</td>
              </tr>
              <tr>
                <td>Розница ★★</td>
                <td>- 10%</td>
                <td>(от 100 000 р.)</td>
                <td>Опт GOLD</td>
                <td>- 25%</td>
                <td>(от 700 000 р.)</td>
              </tr>
              <tr>
                <td>Розница ★★★</td>
                <td>- 15%</td>
                <td>(от 200 000 р.)</td>
                <td>Опт PLATINUM</td>
                <td>- 29%</td>
                <td>(от 1 000 000 р.)</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </slide>
      <slide class="slide">
        <div class="m-container">
          <div class="m-label">Кабинет клиента</div>
          <div>
            <div class="short-text">Кабинет доступен с любых устройств</div>
            <div class="short-text">Электронный документооборот</div>
            <div class="short-text">Консультации и техподдержка</div>
          </div>
        </div>
      </slide>
      <slide class="slide">
        <div class="m-container">
          <div class="m-label">Дропшиппинг</div>
          <div>
            <div class="short-text">Торгуйте напрямую с нашего склада</div>
            <div class="short-text">Бесплатная доставка</div>
            <div class="short-text">Электронный документооборот</div>
          </div>
        </div>
      </slide>
      <slide class="slide">
        <video class="m-video" src="/main-page-slider/4.min.mp4"
               muted autoplay loop>
        </video>
        <div class="m-container">
          <div class="m-label">Предзаказы</div>
          <div class="m-sub-container">
            <div class="short-text">У вас каталог с новыми коллекциями</div>
            <div class="short-text">Размещаете предзаказ</div>
            <div class="short-text">Получаете новинки OXOUNO первыми!</div>
          </div>
        </div>
      </slide>
      <slide class="slide">
        <div class="m-container">
          <div class="m-label">Региональным дилерам</div>
          <div>
            <div class="short-text">Бесплатная доставка на ваш склад</div>
            <div class="short-text">Тут несомненные преимущества</div>
            <div class="short-text">Еще одно неоспоримое преимущество</div>
          </div>
        </div>
      </slide>
      <slide class="slide">
        <div class="m-container">
          <div class="m-label">Социальная сеть</div>
          <div>
            <div class="short-text">Доступ к рекламным материалам</div>
            <div class="short-text">Общение и техподдержка</div>
            <div class="short-text">Что-то еще про социальную сеть</div>
          </div>
        </div>
      </slide>
    </hooper>
    <v-btn class="down-btn" v-show="$store.state.currentSlide != 5" fab @click="$refs.hooper.slideNext()">
      <img src="/main-page-slider/chevron-down-50.png"/>
    </v-btn>
    <form-login v-if="$store.state.showLoginDialog"/>
    <slide-indicator class="slide-indicator" :slide-count="6" @to-slide="slideTo($event)"/>
  </div>
  <div class="mb" v-else-if="$isMobile()">
    <hooper class="hooper" ref="hooper"
            :vertical="true"
            :centerMode="true"
            :initial-slide="0"
            :transition="800"
            @slide="slide">
      <slide class="slide">
        <div class="first-container">
<!--          <div class="brand-sfx">B2B</div>-->
          <div class="brand-box">
            <img class="brand" src="/base/oxouno-black.svg"/>
          </div>
          <div class="about">Портал для оптовых клиентов</div>
          <div class="table-box">
            <div class="table-label">Единая система скидок</div>
            <table class="m-table">
              <thead>
              </thead>
              <tbody>
              <tr>
                <td>Розница ★</td>
                <td>- 5%</td>
                <td>(покупка от 50 000 р.)</td>
              </tr>
              <tr>
                <td>Розница ★★</td>
                <td>- 10%</td>
                <td>(от 100 000 р.)</td>
              </tr>
              <tr>
                <td>Розница ★★★</td>
                <td>- 15%</td>
                <td>(от 200 000 р.)</td>
              </tr>
              <tr>
                <td>Опт SILVER</td>
                <td>- 20%</td>
                <td>(от 500 000 р.)</td>
              </tr>
              <tr>
                <td>Опт GOLD</td>
                <td>- 25%</td>
                <td>(от 700 000 р.)</td>
              </tr>
              <tr>
                <td>Опт PLATINUM</td>
                <td>- 29%</td>
                <td>(от 1 000 000 р.)</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </slide>
      <slide class="slide">
        <div class="m-container">
          <div class="m-label">Кабинет клиента</div>
          <div>
            <div class="short-text">Кабинет доступен с любых устройств</div>
            <div class="short-text">Электронный документооборот</div>
            <div class="short-text">Консультации и техподдержка</div>
          </div>
        </div>
      </slide>
      <slide class="slide">
        <div class="m-container">
          <div class="m-label">Дропшиппинг</div>
          <div>
            <div class="short-text">Торгуйте напрямую с нашего склада</div>
            <div class="short-text">Бесплатная доставка</div>
            <div class="short-text">Электронный документооборот</div>
          </div>
        </div>
      </slide>
      <slide class="slide">
        <div class="m-container">
          <div class="m-label">Предзаказы</div>
          <div>
            <div class="short-text">У вас каталог с новыми коллекциями</div>
            <div class="short-text">Размещаете предзаказ</div>
            <div class="short-text">Получаете новинки OXOUNO первыми!</div>
          </div>
        </div>
      </slide>
      <!--      <slide class="slide">-->
      <!--        <video class="m-video" src="/main-page-slider/4.min.mp4"-->
      <!--               muted autoplay loop>-->
      <!--        </video>-->
      <!--        <div class="m-box">-->
      <!--          <div class="m-container">-->
      <!--            <div class="m-label">Предзаказы</div>-->
      <!--            <div>-->
      <!--              <div class="short-text">У вас каталог с новыми коллекциями</div>-->
      <!--              <div class="short-text">Размещаете предзаказ</div>-->
      <!--              <div class="short-text">Получаете новинки OXOUNO первыми!</div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </slide>-->
      <slide class="slide">
        <div class="m-container">
          <div class="m-label">Региональным дилерам</div>
          <div>
            <div class="short-text">Бесплатная доставка на ваш склад</div>
            <div class="short-text">Тут несомненные преимущества</div>
            <div class="short-text">Еще одно неоспоримое преимущество</div>
          </div>
        </div>
      </slide>
      <slide class="slide">
        <div class="m-container">
          <div class="m-label">Социальная сеть</div>
          <div>
            <div class="short-text">Доступ к рекламным материалам</div>
            <div class="short-text">Общение и техподдержка</div>
            <div class="short-text">Что-то еще про социальную сеть</div>
          </div>
        </div>
      </slide>
    </hooper>
    <v-btn class="down-btn" v-show="$store.state.currentSlide != 5" fab @click="$refs.hooper.slideNext()">
      <img src="/main-page-slider/chevron-down-50.png"/>
    </v-btn>
    <form-login v-if="$store.state.showLoginDialog"/>
  </div>
</template>

<script>
import {Hooper, Slide} from 'hooper';
import 'hooper/dist/hooper.css';
import FormLogin from "./-form-login";
import SlideIndicator from "./slide-indicator";

export default {
  name: "index",
  data() {
    return {
      showDownBtn: true
    }
  },
  components: {
    SlideIndicator,
    FormLogin,
    Hooper,
    Slide
  },
  created() {
    this.$root.$on('currentSlide', this.slideTo)
  },
  mounted() {
    this.$refs.hooper.$el.addEventListener('touchstart', e => {
      e.preventDefault()
    })
    this.$root.$emit('homePageDone');
  },
  destroyed() {
    this.$root.$off('currentSlide', this.slideTo)
    this.$store.commit('setCurrentSlide', 0)
  },
  methods: {
    slide(info) {
      this.$store.commit('setCurrentSlide', info.currentSlide)
    },
    slideTo(number) {
      this.$refs.hooper.slideTo(number)
    }
  }
}
</script>

<style scoped lang="less">
@import "hooper/dist/hooper.css";

.bg {
  height: 100%;

  .hooper {
    outline: none !important;
    height: 100%;
  }

  .slide {
    padding-top: 40px;
  }

  .slide:nth-child(1) {
    background: url("/main-page-slider/1.min.jpg");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    .m-container {
      display: flex;
      flex-flow: column;
      align-items: center;
      position: relative;
    }

    .brand-sfx {
      position: absolute;
      right: -100px;
      top: -30px;
      font-size: 60px;
      text-shadow: #fff 0 0 1px;
      font-weight: 300;
      animation: brand-sfx .5s ease 1s forwards;
      opacity: 0;
    }

    .about {
      font-size: 39px;
      margin-bottom: 50px;
      margin-top: 40px;
      letter-spacing: 5px;
      animation: about .5s ease-out 1.5s forwards;
      opacity: 0;
    }

    .table-label {
      text-align: center;
      line-height: 1;
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: 500;
    }

    .table-box {
      background: #ffffff60;
      border-radius: 5px;
      padding: 20px;
      font-size: 15px;
      width: 700px;
      opacity: 0;
      //height: 0;
      animation: table-box .5s ease-out 2s forwards;
    }

    .m-table {
      width: 100%;

      .m-caption {
        text-align: center;
        padding: 10px;
      }

      td:nth-child(3n) {
        font-style: italic;
        opacity: 0.8;
        font-size: 14px;
      }

      td:nth-child(3n+1) {
        width: 130px;
      }

      td:nth-child(3n+2) {
        width: 70px;
      }
    }

    .brand {
      opacity: 0;
      transform: scale(0.8);
      shape-rendering: crispEdges;
      animation: brand 1s ease .5s forwards;
    }
  }

  @keyframes brand-sfx {
    to {
      opacity: 1;
    }
  }

  @keyframes brand {
    to {
      opacity: 1;
      transform: scale(1.05);
    }
  }

  @keyframes about {
    to {
      opacity: 1;
    }
  }

  @keyframes table-box {
    to {
      opacity: 1;
      //height: 170px;
    }
  }

  .slide:nth-child(2) {
    background: url("/main-page-slider/2.min.jpg");
    background-size: cover;
  }

  .slide:nth-child(2).is-current,
  .slide:nth-child(6).is-current {
    .short-text:nth-child(1) {
      animation: show-text-slide-2 2s ease-out 0s forwards;
    }

    .short-text:nth-child(2) {
      animation: show-text-slide-2 2s ease-out .5s forwards;
    }

    .short-text:nth-child(3) {
      animation: show-text-slide-2 2s ease-out 1s forwards;
    }
  }

  @keyframes show-text-slide-2 {
    0% {
      transform: perspective(400px) rotateY(90deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      opacity: 0
    }
    40% {
      transform: perspective(400px) rotateY(-20deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in
    }
    60% {
      transform: perspective(400px) rotateY(10deg);
      opacity: 1
    }
    80% {
      transform: perspective(400px) rotateY(-5deg);
      opacity: 1
    }
    to {
      transform: perspective(400px);
      opacity: 1
    }
  }

  .slide:nth-child(3) {
    background: url("/main-page-slider/3.min.jpg");
    background-size: cover;
  }

  .slide:nth-child(3).is-current {
    .short-text:nth-child(1) {
      animation: short-text-slide-3 1.5s ease-out 0s forwards;
    }

    .short-text:nth-child(2) {
      animation: short-text-slide-3 1.5s ease-out .25s forwards;
    }

    .short-text:nth-child(3) {
      animation: short-text-slide-3 1.5s ease-out .5s forwards;
    }
  }

  @keyframes short-text-slide-3 {
    from {
      transform: translateY(-200%);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  .slide:nth-child(4) {
    overflow: hidden;
    position: relative;

    .m-video {
      min-width: 100%;
      min-height: 100%;
    }

    .m-label {
      margin: 0 auto;
    }

    .m-container {
      position: absolute;
      z-index: 2;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
    }
  }

  .slide:nth-child(4).is-current {
    .short-text:nth-child(1) {
      animation: short-text-slide-4 1s ease-out 0s forwards;
    }

    .short-text:nth-child(2) {
      animation: short-text-slide-4 1s ease-out .8s forwards;
    }

    .short-text:nth-child(3) {
      animation: short-text-slide-4 1s ease-out 1.6s forwards;
    }
  }

  @keyframes short-text-slide-4 {
    from {
      transform: translateX(100%);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  .slide:nth-child(5) {
    background: url("/main-page-slider/5.min.jpg");
    background-size: cover;
  }

  .slide:nth-child(5).is-current {
    .short-text:nth-child(1) {
      animation: short-text-slide-5 1s ease-out 0s forwards;
    }

    .short-text:nth-child(2) {
      animation: short-text-slide-5 1s ease-out .8s forwards;
    }

    .short-text:nth-child(3) {
      animation: short-text-slide-5 1s ease-out 1.6s forwards;
    }
  }

  @keyframes short-text-slide-5 {
    from {
      transform: scale(0.6) translateY(-500%);
    }

    50% {
      transform: scale(0.6);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  .slide:nth-child(6) {
    background: url("/main-page-slider/6.min.jpg");
    background-size: cover;
  }


  .slide:nth-child(2),
  .slide:nth-child(3),
  .slide:nth-child(5),
  .slide:nth-child(6) {
    display: flex;
    justify-content: center;
    align-items: center;

    .m-container {
      display: flex;
      flex-flow: column;
      align-items: center;
      margin-top: -100px;
    }
  }

  .m-label {
    font-size: 80px;
    font-weight: 500;
    margin-bottom: 80px;
    text-shadow: #fff 0 0 1px;
    opacity: 0;
  }

  .slide.is-current {
    .m-label {
      animation: m-label 2s ease-out forwards;
    }
  }

  @keyframes m-label {
    to {
      opacity: 1;
    }
  }

  .short-text {
    background: #fffb;
    font-size: 28px;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 25px;
    width: 550px;
    color: #333;
    font-weight: 300;
    opacity: 0;
  }

  .down-btn {
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background: #fffb !important;
    width: 50px;
    height: 50px;
  }

  .slide-indicator {
    top: 50%;
    right: 60px;
    transform: translateY(-50%);
  }
}

.mb {
  height: 100%;

  .hooper {
    outline: none !important;
    height: 100%;
  }

  .slide {
    padding-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    .m-container {
      display: flex;
      flex-flow: column;
      align-items: center;
      background: #fffa;
      //border-radius: 10px;
      padding: 15px;
      width: 100%;
      backdrop-filter: blur(5px) saturate(180%);
    }

    .m-label {
      text-align: center;
      font-size: 35px;
      font-weight: 500;
      margin-bottom: 10px;
      text-shadow: #fff 0 0 1px;
    }

    .short-text {
      font-size: 18px;
      color: #222;
      font-weight: 400;
      opacity: 0;

      &::before {
        content: '- ';
      }
    }
  }

  .slide.is-current {
    .m-container {
      animation: m-container .7s ease-out forwards;
    }

    @keyframes m-container {
      from {
        transform: translateX(50%);
      }
    }

    .short-text:nth-child(1) {
      animation: short-text .7s ease-out .5s forwards;
    }

    .short-text:nth-child(2) {
      animation: short-text .7s ease-out 1s forwards;
    }

    .short-text:nth-child(3) {
      animation: short-text .7s ease-out 1.5s forwards;
    }

    @keyframes short-text {
      from {
        opacity: 1;
        transform: translateX(-50%) translateY(-50%);
      }
      to {
        opacity: 1;
      }
    }
  }

  .slide:nth-child(1) {
    align-items: stretch;
    background: url("/main-page-slider/1.min.jpg");
    display: block;

    .first-container {
      display: flex;
      flex-flow: column;
      align-items: center;
      position: relative;
      height: 100%;
      justify-content: center;
    }

    .brand-box {
      width: 200px;
      margin-bottom: 20px;
      position: relative;
      opacity: 0;
      transform: scale(0.8);
      animation: brand .5s ease-out .5s forwards;
    }

    .brand {
      width: 100%;
    }

    .brand-box:after {
      position: absolute;
      content: 'B2B' !important;
      left: 100%;
      bottom: 80%;
    }

    .about {
      font-size: 18px;
      animation: about .5s ease-out 1s forwards;
      opacity: 0;
      margin-bottom: 50px;
    }

    .table-label {
      text-align: center;
      line-height: 1;
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: 500;
    }

    .table-box {
      width: 100%;
      background: #ffffffd0;
      border-radius: 5px;
      padding: 10px;
      font-size: 13px;
      opacity: 0;
      //height: 0;
      animation: table-box .5s ease-out 1.5s forwards;
    }

    .m-table {
      width: 100%;
      .m-caption {
        text-align: center;
        padding: 10px;
      }

      td:nth-child(3n) {
        font-style: italic;
        opacity: 0.8;
        font-size: 15px;
      }

      td {
        padding: 2px 3px;
      }
    }

    .brand {
      //opacity: 0;
      transform: scale(1);
      shape-rendering: crispEdges;
      //animation: brand 1s ease .5s forwards;
    }
  }

  .slide:nth-child(2) {
    background: url("/main-page-slider/2.min.jpg");
  }

  .slide:nth-child(3) {
    background: url("/main-page-slider/3.min.jpg");
  }

  .slide:nth-child(4) {
    overflow: hidden;
    position: relative;
    background: url("/main-page-slider/4.min.jpg");

    .m-video {
      height: 100%;
    }

    .m-box {
      position: absolute;
      z-index: 2;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .slide:nth-child(5) {
    background: url("/main-page-slider/5.min.jpg");
  }

  .slide:nth-child(6) {
    background: url("/main-page-slider/6.min.jpg");
  }

  .slide:nth-child(1),
  .slide:nth-child(2),
  .slide:nth-child(3),
  .slide:nth-child(4),
  .slide:nth-child(5),
  .slide:nth-child(6) {
    background-repeat: no-repeat;
    background-size: cover;
  }

  .slide:nth-child(1),
  .slide:nth-child(3),
  .slide:nth-child(4),
  .slide:nth-child(5) {
    background-position: center top;
  }

  .slide:nth-child(2) {
    background-position: -100px top;
  }

  .slide:nth-child(6) {
    background-position: right top;
  }

  .down-btn {
    margin: 0;
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background: #fffb !important;
    width: 50px;
    height: 50px;
  }
}
</style>