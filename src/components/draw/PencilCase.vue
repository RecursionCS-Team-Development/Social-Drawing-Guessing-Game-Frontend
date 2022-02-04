<template>
  <div
    class="border shadow rounded-pill d-flex justify-content-center align-items-center"
  >
    <button
      v-for="(penIcon, index) in penIcons"
      :key="index"
      @click="penIcon.method"
      class="border-0 d-flex align-items-center justify-content-center pen_button"
      type="button"
    >
      <i :class="[penIcon.icon, penIcon.color]" class="fas pen_icon"></i>
    </button>

    <!-- <button
      v-for="(penSize, index) in penSizes"
      :key="index"
      class="border-0 pen_button"
      type="button"
    >
      <div :style="{ border: penSize }" style="width: 20px"></div>
    </button> -->

    <div class="d-flex px-2">
      <label for="customRange1" class="form-label px-2 mb-0">
        {{ pencilCaseSetting?.penBold }}
      </label>
      <input
        @change="rangeBold"
        type="range"
        max="20"
        min="1"
        v-model="pencilCaseSetting.penBold"
      />
    </div>

    <input
      @change="selectColor"
      :value="pencilCaseSetting?.drawColor"
      type="color"
      ref="colorPalette"
      class="mx-2"
    />

    <button
      @click="selectClear"
      class="border-0 d-flex align-items-center justify-content-center pen_button"
      type="button"
    >
      <i class="fas fa-undo"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRef, PropType } from 'vue'
import { PencilCaseSetting } from '../../interface/pencilCaseSetting'

export default defineComponent({
  name: 'pencilCase',
  props: { pencilCaseSettings: Object as PropType<PencilCaseSetting> },
  emits: [
    'selectPen',
    'selectEraser',
    'selectClear',
    'selectColor',
    'rangeBold'
  ],
  setup(props, { emit }) {
    let pencilCaseSetting = toRef(props, 'pencilCaseSettings')
    let colorPalette = ref<HTMLInputElement>()
    const selectPen = () => {
      emit('selectPen')
    }
    const selectEraser = () => {
      emit('selectEraser')
    }

    const selectClear = () => {
      emit('selectClear')
    }

    const selectColor = () => {
      if (pencilCaseSetting.value) {
        pencilCaseSetting.value.drawColor = String(colorPalette?.value?.value)
      }
      emit('selectColor', String(colorPalette?.value?.value))
    }

    const rangeBold = () => {
      emit('rangeBold')
    }

    let penIcons = reactive([
      {
        icon: 'fa-pen',
        color: 'text-danger',
        method: selectPen
      },
      {
        icon: 'fa-eraser',
        color: 'text-dark',
        method: selectEraser
      }
    ])

    let penSizes = ref(['solid 1px #000', 'solid 2px #000', 'solid 3px #000'])

    return {
      pencilCaseSetting,
      penIcons,
      penSizes,
      colorPalette,
      selectPen,
      selectEraser,
      selectClear,
      selectColor,
      rangeBold
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
