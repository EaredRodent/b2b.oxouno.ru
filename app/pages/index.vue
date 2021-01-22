<template>
  <div v-if="$isDesktop()" class="bg">
    <hooper
      ref="hooper"
      class="hooper"
      :vertical="true"
      :center-mode="true"
      :initial-slide="0"
      :transition="800"
      :mouse-drag="false"
      @slide="slide"
    >
      <slide class="slide">
        <div class="m-container">
          <div class="brand-sfx">
            B2B
          </div>
          <img class="brand" src="/base/oxouno-black.svg">
          <div class="about">
            Портал для оптовых клиентов
          </div>
          <div class="table-box">
            <div class="table-label">
              Единая система скидок
            </div>
            <table class="m-table">
              <thead />
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
          <div class="m-label">
            Кабинет клиента
          </div>
          <div>
            <div class="short-text">
              Кабинет доступен с любых устройств
            </div>
            <div class="short-text">
              Электронный документооборот
            </div>
            <div class="short-text">
              Консультации и техподдержка
            </div>
          </div>
        </div>
      </slide>
      <slide class="slide">
        <div class="m-container">
          <div class="m-label">
            Дропшиппинг
          </div>
          <div>
            <div class="short-text">
              Торгуйте напрямую с нашего склада
            </div>
            <div class="short-text">
              Бесплатная доставка
            </div>
            <div class="short-text">
              Электронный документооборот
            </div>
          </div>
        </div>
      </slide>
      <slide class="slide">
        <video
          class="m-video"
          src="/main-page-slider/4.min.mp4"
          muted
          autoplay
          loop
        />
        <div class="m-container">
          <div class="m-label">
            Предзаказы
          </div>
          <div class="m-sub-container">
            <div class="short-text">
              У вас каталог с новыми коллекциями
            </div>
            <div class="short-text">
              Размещаете предзаказ
            </div>
            <div class="short-text">
              Получаете новинки OXOUNO первыми!
            </div>
          </div>
        </div>
      </slide>
      <slide class="slide">
        <div class="m-container">
          <div class="m-label">
            Региональным дилерам
          </div>
          <div>
            <div class="short-text">
              Бесплатная доставка на ваш склад
            </div>
            <div class="short-text">
              Тут несомненные преимущества
            </div>
            <div class="short-text">
              Еще одно неоспоримое преимущество
            </div>
          </div>
        </div>
      </slide>
      <slide class="slide">
        <div class="m-container">
          <div class="m-label">
            Социальная сеть
          </div>
          <div>
            <div class="short-text">
              Доступ к рекламным материалам
            </div>
            <div class="short-text">
              Общение и техподдержка
            </div>
            <div class="short-text">
              Что-то еще про социальную сеть
            </div>
          </div>
        </div>
      </slide>
    </hooper>
    <v-btn v-show="$store.state.currentSlide != 5" class="down-btn" fab @click="$refs.hooper.slideNext()">
      <img src="/main-page-slider/chevron-down-50.png">
    </v-btn>
    <form-login v-if="$store.state.showLoginDialog" />
    <slide-indicator class="slide-indicator" :slide-count="6" @to-slide="slideTo($event)" />
  </div>
  <div v-else-if="$isMobile()" class="mb">
    <hooper
      ref="hooper"
      class="hooper"
      :vertical="true"
      :center-mode="true"
      :initial-slide="0"
      :transition="800"
      @slide="slide"
    >
      <slide class="slide">
        <div class="first-container">
          <!--          <div class="brand-sfx">B2B</div>-->
          <div class="brand-box">
            <img class="brand" src="/base/oxouno-black.svg">
          </div>
          <div class="about">
            Портал для оптовых клиентов
          </div>
          <div class="table-box">
            <div class="table-label">
              Единая система скидок
            </div>
            <table class="m-table">
              <thead />
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
          <div class="m-label">
            Кабинет клиента
          </div>
          <div>
            <div class="short-text">
              Кабинет доступен с любых устройств
            </div>
            <div class="short-text">
              Электронный документооборот
            </div>
            <div class="short-text">
              Консультации и техподдержка
            </div>
          </div>
        </div>
      </slide>
      <slide class="slide">
        <div class="m-container">
          <div class="m-label">
            Дропшиппинг
          </div>
          <div>
            <div class="short-text">
              Торгуйте напрямую с нашего склада
            </div>
            <div class="short-text">
              Бесплатная доставка
            </div>
            <div class="short-text">
              Электронный документооборот
            </div>
          </div>
        </div>
      </slide>
      <slide class="slide">
        <div class="m-container">
          <div class="m-label">
            Предзаказы
          </div>
          <div>
            <div class="short-text">
              У вас каталог с новыми коллекциями
            </div>
            <div class="short-text">
              Размещаете предзаказ
            </div>
            <div class="short-text">
              Получаете новинки OXOUNO первыми!
            </div>
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
          <div class="m-label">
            Региональным дилерам
          </div>
          <div>
            <div class="short-text">
              Бесплатная доставка на ваш склад
            </div>
            <div class="short-text">
              Тут несомненные преимущества
            </div>
            <div class="short-text">
              Еще одно неоспоримое преимущество
            </div>
          </div>
        </div>
      </slide>
      <slide class="slide">
        <div class="m-container">
          <div class="m-label">
            Социальная сеть
          </div>
          <div>
            <div class="short-text">
              Доступ к рекламным материалам
            </div>
            <div class="short-text">
              Общение и техподдержка
            </div>
            <div class="short-text">
              Что-то еще про социальную сеть
            </div>
          </div>
        </div>
      </slide>
    </hooper>
    <v-btn v-show="$store.state.currentSlide != 5" class="down-btn" fab @click="$refs.hooper.slideNext()">
      <img src="/main-page-slider/chevron-down-50.png">
    </v-btn>
    <form-login v-if="$store.state.showLoginDialog" />
  </div>
</template>

<script>
export { default } from './index.js'
</script>

<style scoped lang="less">
@import "index-desktop";
@import "index-mobile";
</style>
