<template>
  <div class="bg" v-if="$isDesktop()">
    <hooper class="hooper" ref="hooper"
            :vertical="true" :centerMode="true" :initial-slide="0" :transition="800"
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
        <video class="m-video" src="/main-page-slider/4.mp4"
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
    <v-dialog width="320"
              :value="$store.state.showLoginDialog"
              @input="$store.commit('setShowLoginDialog', $event)">
      <div class="login-dialog">
        <div class="ld-header">Вход в портал</div>
        <v-text-field color="#37474f" outline label="Логин" v-model="loginForm.username"/>
        <v-text-field color="#37474f" outline label="Пароль" v-model="loginForm.password"/>
        <v-btn class="ld-btn" color="#37474f" large
               :disabled="postIndicator"
               @click="actionLogin">
          Войти
        </v-btn>
        <div class="ld-header mt-4 mb-1">Впервые у нас?</div>
        <v-btn class="ld-btn" color="#37474f" large
               @click="$router.push('/registration')">
          Зарегистрироваться
        </v-btn>
      </div>
    </v-dialog>
  </div>
  <div class="mb" v-else-if="$isMobile()">
    <hooper class="hooper" ref="hooper"
            :vertical="true" :centerMode="true" :initial-slide="0" :transition="800"
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
      <!--        <video class="m-video" src="/main-page-slider/4.mp4"-->
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
    <v-dialog width="320"
              :value="$store.state.showLoginDialog"
              @input="$store.commit('setShowLoginDialog', $event)">
      <div class="login-dialog">
        <div class="ld-header">Вход в портал</div>
        <v-text-field color="#37474f" outline label="Логин" v-model="loginForm.username"/>
        <v-text-field color="#37474f" outline label="Пароль" v-model="loginForm.password"/>
        <v-btn class="ld-btn" color="#37474f" large
               :disabled="postIndicator"
               @click="actionLogin">
          Войти
        </v-btn>
        <div class="ld-header mt-4 mb-1">Впервые у нас?</div>
        <v-btn class="ld-btn" color="#37474f" large>Зарегистрироваться</v-btn>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import {Hooper, Slide} from 'hooper';
import 'hooper/dist/hooper.css';

export default {
  name: "index",
  data() {
    return {
      postIndicator: false,
      loginForm: {
        username: '',
        password: ''
      },
      showDownBtn: true
    }
  },
  components: {
    Hooper,
    Slide
  },
  created() {
    this.$root.$on('currentSlide', this.slideTo)
  },
  destroyed() {
  },
  methods: {
    slide(info) {
      this.$store.commit('setCurrentSlide', info.currentSlide)
    },
    async actionLogin() {
      this.postIndicator = true
      try {
        await this.$login(this.loginForm.username, this.loginForm.password, {project: 'b2b'})
      } catch (e) {
      }
      this.$store.commit('setShowLoginDialog', false)
      this.postIndicator = false
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
    background: url("/main-page-slider/1.jpg");
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
      right: 0;
      top: 0;
      transform: translateX(+110%) translateY(-100%);
      font-size: 80px;
      text-shadow: #fff 0 0 1px;
      font-weight: 300;
      animation: brand-sfx .5s ease 1s forwards;
      opacity: 0;
    }

    .about {
      font-size: 39px;
      margin-bottom: 50px;
      margin-top: 40px;
      letter-spacing: 9px;
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
      width: 800px;
      opacity: 0;
      height: 0;
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
      transform: translateX(+110%) translateY(-50%);
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
      height: 170px;
    }
  }

  .slide:nth-child(2) {
    background: url("/main-page-slider/2.jpg");
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
    background: url("/main-page-slider/3.jpg");
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
    background: url("/main-page-slider/5.jpg");
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
    background: url("/main-page-slider/6.jpg");
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
    font-size: 100px;
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
    font-size: 33px;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 40px;
    width: 650px;
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
}

.login-dialog {
  background: white;
  padding: 20px;
  border-radius: 3px;
}

.ld-btn {
  margin: 0;
  width: 100%;
  color: white;
}

.ld-header {
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 15px;
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
    }
  }

  .slide:nth-child(1) {
    background: url("/main-page-slider/1.jpg");
    align-items: stretch;

    .m-container {
      margin-top: 100px;
      position: relative;
    }

    .brand-sfx {
      position: absolute;
      right: 0;
      top: 0;
      font-weight: 500;
      transform: translateX(+60%) translateY(+160%);
      font-size: 15px;
      text-shadow: #fff 0 0 1px;
      //font-weight: 300;
      //animation: brand-sfx .5s ease 1s forwards;
      //opacity: 0;
    }

    .about {
      font-size: 20px;
      letter-spacing: 1px;
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
      margin-top: auto;
      margin-bottom: 70px;
      background: #ffffffd0;
      border-radius: 5px;
      padding: 10px;
      font-size: 15px;
      //opacity: 0;
      //height: 0;
      //animation: table-box .5s ease-out 2s forwards;
    }

    .m-table {
      .m-caption {
        text-align: center;
        padding: 10px;
      }

      td:nth-child(3n) {
        font-style: italic;
        opacity: 0.8;
        font-size: 14px;
      }

      td {
        padding: 2px 5px;
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
    background: url("/main-page-slider/2.jpg");
  }

  .slide:nth-child(3) {
    background: url("/main-page-slider/3.jpg");
  }

  .slide:nth-child(4) {
    overflow: hidden;
    position: relative;
    background: url("/main-page-slider/4.jpg");

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
    background: url("/main-page-slider/5.jpg");
  }

  .slide:nth-child(6) {
    background: url("/main-page-slider/6.jpg");
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

  .m-label {
    text-align: center;
    font-size: 40px;
    font-weight: 500;
    margin-bottom: 100px;
    text-shadow: #fff 0 0 1px;
  }

  .short-text {
    background: #fffd;
    font-size: 16px;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 30px;
    width: 90vw;
    color: #111;
    font-weight: 300;
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