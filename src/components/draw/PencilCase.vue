<template>
  <div
    class="border shadow rounded-pill d-flex justify-content-center align-items-center"
  >
    <button
      v-for="(penIcon, index) in penIcons"
      :key="index"
      class="border-0 d-flex align-items-center justify-content-center pen_button"
      type="button"
    >
      <i :class="[penIcon.icon, penIcon.color]" class="fas pen_icon"></i>
    </button>

    <button
      v-for="(penSize, index) in penSizes"
      :key="index"
      class="border-0 pen_button"
      type="button"
    >
      <div :style="{ border: penSize }" style="width: 20px"></div>
    </button>

    <button
      class="border-0 d-flex align-items-center justify-content-center pen_button"
      type="button"
    >
      <i class="fas fa-undo"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'pencilCase',
  setup() {
    let penIcons = ref([
      {
        icon: 'fa-pen',
        color: 'text-danger'
      },
      {
        icon: 'fa-eraser',
        color: 'text-dark'
      }
    ])

    let penSizes = ref(['solid 1px #000', 'solid 2px #000', 'solid 3px #000'])
    return {
      penIcons,
      penSizes
    }
  }
})
</script>

<style scoped>
.pen_button {
  width: 50px;
  height: 50px;
}
@media screen and (max-width: 480px) {
  .pen_button {
    width: 30px;
    height: 30px;
  }
}
</style>
