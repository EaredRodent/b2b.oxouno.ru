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
          <div class="brand-container">
            <img class="brand" width="700" src="/base/oxouno-black.svg">
            <div class="brand-sfx">
              B2B
            </div>
          </div>
          <div class="about">
            <div>
              SARTORIA UNO производит трикотажные изделия под торговой маркой OXOUNO
            </div>
            <div>
              B2B.OXOUNO.RU портал создан для партнеров компании SARTORIA UNO
            </div>
            <div>
              Для наших партнеров теперь доступны новые сервисы
            </div>
          </div>
          <div class="login-box">
            <v-btn large outline @click="$store.commit('setShowLoginDialog', true)">
              Войти
            </v-btn>
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
              Легкий поиск товара
            </div>
            <div class="short-text">
              Оформление заказа одной кнопкой
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
            Дропшиппинг
          </div>
          <div>
            <div class="short-text">
              Предлагайте товар вашим клиентам с нашего склада
            </div>
            <div class="short-text">
              Отправим заказ по адресу вашего партнера
            </div>
            <!--            <div class="short-text">-->
            <!--              Электронный документооборот-->
            <!--            </div>-->
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
              Планируйте закупку товара с горизонтом в один год
            </div>
            <!--            <div class="short-text">-->
            <!--              Размещаете предзаказ-->
            <!--            </div>-->
            <!--            <div class="short-text">-->
            <!--              Получаете новинки OXOUNO первыми!-->
            <!--            </div>-->
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
              Дилерские цены
            </div>
            <div class="short-text">
              Единая ценовая политика
            </div>
            <div class="short-text">
              Рекламные и обучающие материалы
            </div>
          </div>
        </div>
      </slide>
      <slide class="slide">
        <div class="m-container">
          <div class="m-label">
            Дополнительные преимущества
          </div>
          <div>
            <div class="short-text">
              Базовый ассортимент на нашем складе всегда в наличии
            </div>
            <div class="short-text">
              Подсортировка от одной единицы
            </div>
            <div class="short-text">
              Проинформируем вас о новинках по почте или в мессенджере
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
    <!--          <div class="brand-sfx">B2B</div>-->
    <div class="brand-box">
      <img class="brand" src="/base/oxouno-black.svg">
    </div>
    <div class="about">
      <div>
        SARTORIA UNO производит трикотажные изделия под торговой маркой OXOUNO
      </div>
      <div>
        B2B.OXOUNO.RU портал создан для партнеров компании SARTORIA UNO
      </div>
      <div>
        Для наших партнеров теперь доступны новые сервисы
      </div>
    </div>
    <div class="login-box">
      <v-btn large class="login-box-btn" @click="$store.commit('setShowLoginDialog', true)">
        Войти
      </v-btn>
    </div>
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
