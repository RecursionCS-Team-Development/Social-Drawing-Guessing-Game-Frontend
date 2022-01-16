<template>
  <div class="order-2 order-lg-1 canvas_wrapper border bg-white">
    <canvas></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'canvas'
})
</script>

<style scoped>
.canvas_wrapper {
  position: relative;
  width: 100%;
}
.canvas_wrapper:before {
  content: '';
  display: block;
  padding-top: 56.25%;
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
