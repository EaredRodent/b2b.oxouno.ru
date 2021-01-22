<template>
  <div class="slide-indicator">
    <div v-for="(slide, i) in slideCount" :key="i">
      <v-icon color="#000" @click="$emit('to-slide', i)">
        {{ $store.state.currentSlide === i ? 'radio_button_checked' : 'radio_button_unchecked' }}
      </v-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlideIndicator',
  props: {
    slideCount: {
      type: Number,
      default: () => 0
    }
  }
}
</script>

<style scoped lang="less">
.slide-indicator {
  position: absolute;
  display: flex;
  flex-flow: column;
}
</style>
