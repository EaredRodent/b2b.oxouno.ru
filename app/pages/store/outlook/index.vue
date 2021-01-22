<template>
  <div class="x-page">
    <viewer
      v-if="viewerShow"
      :name="viewerShow"
      @return-btn-click="viewerClose"
    />
    <div v-else class="x-outlook-box">
      <div class="x-outlook-title">
        Выберите интересующий вас журнал:
      </div>

      <div ref="area" class="x-outlook-area">
        <carousel-3d
          :key="archives.length"
          ref="carousel"
          class="x-carousel"
          :width="width"
          :height="height"
          :space="space"
          :perspective="15"
          :border="0"
          :min-swipe-distance="20"
          :on-main-slide-click="mainSlideClick"
        >
          <slide v-for="(archive, i) in archives" :key="i" :index="i" class="x-slide">
            <img :src="archive.previewImg" alt="img">
          </slide>
        </carousel-3d>
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
