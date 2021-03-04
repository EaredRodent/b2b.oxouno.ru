<template>
  <div class="x-Loading">
    <v-progress-circular class="x-progress" :size="50" :width="1" color="gray" indeterminate />
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style scoped lang="less">
.x-Loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.x-progress {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
