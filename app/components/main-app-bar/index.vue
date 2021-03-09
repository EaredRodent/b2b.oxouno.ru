<template>
  <div
    v-if="$isDesktop()"
    class="x-app-bar"
    :dark="!$isGuest()"
    :total-black="$route.fullPath !== '/common'"
  >
    <img
      v-if="$isGuest()"
      class="x-brand"
      src="/base/oxouno-black.svg"
      @click="setCurrentSlide(0)"
    >
    <img
      v-else
      class="x-brand"
      src="/base/oxouno-white.svg"
      @click="$router.push('/common')"
    >

    <div class="x-tabs">
      <div ref="tabs" class="x-tabs-area">
        <div
          v-for="(tab, i) in tabs"
          :key="i"
          class="x-action"
          :is-current="isCurrentTab(tab)"
          @click="clickTab(tab)"
        >
          {{ tab.name }}
          <div class="x-action-bottom" />
        </div>
      </div>
    </div>

    <v-btn
      class="x-nstagram"
      icon
      title="Instagram"
      @click="openInstagram"
    >
      <v-icon :color="$isGuest() ? 'black' : 'white'">
        mdi-instagram
      </v-icon>
    </v-btn>

    <div class="x-contact">
      Тел:
      <nobr>8 800 201 01 09</nobr>
    </div>

    <v-btn
      v-if="$isGuest()"
      class="x-login"
      outline
      title="Войти"
      @click="beginLogin"
    >
      Войти
    </v-btn>
    <v-btn
      v-else
      class="x-login"
      icon
      title="Выйти"
      @click="$logout()"
    >
      <v-icon color="white">
        power_settings_new
      </v-icon>
    </v-btn>
  </div>
  <div v-else-if="$isMobile()">
    <div class="xm-app-bar" :dark="!$isGuest()">
      <v-btn v-if="!$isGuest()" class="xm-btn" icon large @click="drawer = true">
        <v-icon color="white" large>
          menu
        </v-icon>
      </v-btn>
      <img v-if="$isGuest()" class="xm-brand" src="/base/oxouno-black.svg">
      <img v-else class="xm-brand" src="/base/oxouno-white.svg" @click="clickTab(mobileTabs[0])">
      <v-btn
        v-if="$isGuest()"
        class="xm-btn"
        outline
        @click="beginLogin"
      >
        Войти
      </v-btn>
    </div>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      class="xm-drawer"
    >
      <div
        v-for="(tab, i) in mobileTabs"
        :key="i"
        class="xm-category"
        :is-current="isCurrentTab(tab)"
        @click="clickTab(tab)"
      >
        {{ tab.name }}
      </div>

      <div v-ripple class="xm-pre-bottom">
        <div class="xm-profile" @click="$router.push('/')">
          <v-icon color="black" large>
            account_circle
          </v-icon>
          <span class="xm-profile-name">{{ $userProperty('name') }}</span>
        </div>
      </div>
      <div class="xm-bottom">
        <div class="xm-category" @click="logout">
          Выход
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
export { default } from './index.js'
</script>

<style scoped lang="less">
@import "index";
@import "index-mobile";
</style>
