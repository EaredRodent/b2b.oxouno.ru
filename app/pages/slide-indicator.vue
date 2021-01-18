<template>
  <div class="slide-indicator">
    <div v-for="(slide, i) in slideCount">
      <v-icon @click="$emit('to-slide', i)" color="#000">
        {{ $store.state.currentSlide === i ? 'radio_button_checked' : 'radio_button_unchecked' }}
      </v-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "slide-indicator",
  props: {
    slideCount: 0
  }
}
</script>

<style scoped>
.slide-indicator {
  position: absolute;
  display: flex;
  flex-flow: column;
}
</style>