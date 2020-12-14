<template>
  <div class="app-bar" v-if="$isDesktop()" :dark="!$isGuest()">
    <img class="brand" v-if="$isGuest()" src="/base/oxouno-black.svg"
         @click="setCurrentSlide(0)"/>
    <img class="brand" v-else src="/base/oxouno-white.svg"/>
    <div class="action"
         :is-current="$store.state.currentSlide === 1"
         @click="setCurrentSlide(1)">
      Кабинет клиента
      <div class="action-bottom"></div>
    </div>
    <div class="action"
         :is-current="$store.state.currentSlide === 2"
         @click="setCurrentSlide(2)">
      Дропшиппинг
      <div class="action-bottom"></div>
    </div>
    <div class="action"
         :is-current="$store.state.currentSlide === 3"
         @click="setCurrentSlide(3)">
      Предзаказы
      <div class="action-bottom"></div>
    </div>
    <div class="action"
         :is-current="$store.state.currentSlide === 4"
         @click="setCurrentSlide(4)">
      Региональным дилерам
      <div class="action-bottom"></div>
    </div>
    <div class="action"
         :is-current="$store.state.currentSlide === 5"
         @click="setCurrentSlide(5)">
      Социальная сеть
      <div class="action-bottom"></div>
    </div>
    <div class="right"><!--Nothing--></div>
    <div class="contact">
      Тел: 8 800 201 01 09
    </div>
    <v-btn class="login"
           v-if="$isGuest()"
           color="primary"
           title="Войти"
           @click="$store.commit('setShowLoginDialog', true)">
      Войти
    </v-btn>
    <v-btn class="login"
           v-else
           icon title="Выйти"
           @click="$logout()">
      <v-icon color="white">power_settings_new</v-icon>
    </v-btn>
  </div>
  <div class="app-bar-mobile" v-else-if="$isMobile()" :dark="!$isGuest()">
    <v-btn class="menu-btn" icon large>
      <v-icon large>
        menu
      </v-icon>
    </v-btn>
    <img class="brand-mobile" v-if="$isGuest()" src="/base/oxouno-black.svg"
         @click="setCurrentSlide(0)"/>
    <img class="brand-mobile" v-else src="/base/oxouno-white.svg"/>
  </div>
</template>

<script>
export default {
  name: "main-app-bar",
  methods: {
    setCurrentSlide(number) {
      this.$root.$emit('currentSlide', number)
    }
  }
}
</script>

<style scoped lang="less">
.app-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: #ffffffb8;
  backdrop-filter: saturate(180%) blur(15px);
  border-bottom: 1px solid darkgrey;
  display: flex;
  align-items: center;
  padding: 0 100px;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
}

.app-bar-mobile:extend(.app-bar all) {
  padding: 0 10px;
}

.app-bar[dark] {
  color: #f5f5f7;
  opacity: 0.8;
  background: #000b;
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: none;
}

.brand {
  height: 50%;
  margin-right: 12px;
  cursor: pointer;
  margin-top: -2px;
}

.menu-btn {
  margin: 0;
}

.brand-mobile:extend(.brand all) {
  height: 50%;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  margin-top: -2px;
  transform: translateX(-18px);
}

.right {
  margin-left: auto;
}

.action {
  padding: 0 12px 0 12px;
  font-size: 15px;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
}

.action:hover, .action[is-current] {
  background-color: hsla(0, 0%, 100%, .66667);
  cursor: pointer;
  color: #063c75;

  .action-bottom {
    display: block;
  }
}

.action-bottom {
  display: none;
  position: absolute;
  top: calc(100% - 1px);
  left: 0;
  height: 3px;
  width: 100%;
  background: #0071e3;
}

.login {
  margin: 0 0 0 24px;
  box-shadow: none !important;
}
</style>