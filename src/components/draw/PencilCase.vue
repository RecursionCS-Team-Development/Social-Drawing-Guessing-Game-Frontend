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
      v-for="(operationIcon, index) in operationIcons"
      :key="index"
      @click="operationIcon.method"
      class="border-0 d-flex align-items-center justify-content-center pen_button"
      type="button"
    >
      <i :class="[operationIcon.icon, operationIcon.opacity]" class="fas"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRef, PropType, computed } from 'vue'
import { PencilCaseSetting } from '../../interface/pencilCaseSetting'
import { Stack } from '../../model/stack'

export default defineComponent({
  name: 'pencilCase',
  props: {
    pencilCaseSettings: Object as PropType<PencilCaseSetting>,
    undoStack: Stack,
    redoStack: Stack
  },
  emits: [
    'selectPen',
    'selectEraser',
    'selectClear',
    'selectUndo',
    'selectRedo',
    'selectColor',
    'rangeBold'
  ],
  setup(props, { emit }) {
    let pencilCaseSetting = toRef(props, 'pencilCaseSettings')
    let colorPalette = ref<HTMLInputElement>()
    let undoStack = toRef(props, 'undoStack')
    let redoStack = toRef(props, 'redoStack')
    const selectPen = () => emit('selectPen')

    const selectEraser = () => emit('selectEraser')

    const selectClear = () => emit('selectClear')

    const selectUndo = () => emit('selectUndo')

    const selectRedo = () => emit('selectRedo')

    const selectColor = () => {
      if (pencilCaseSetting.value) {
        pencilCaseSetting.value.drawColor = String(colorPalette?.value?.value)
      }
      emit('selectColor', String(colorPalette?.value?.value))
    }

    const rangeBold = () => emit('rangeBold')

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

    const undoOpacity = computed(() => {
      return undoStack.value?.count == 0 ? 'opacity-50' : 'opacity-100'
    })

    const redoOpacity = computed(() => {
      return redoStack.value?.count == 0 ? 'opacity-50' : 'opacity-100'
    })

    const trashOpacity = computed(() => 'opacity-100')

    let operationIcons = reactive([
      {
        icon: 'fa-undo',
        method: selectUndo,
        opacity: undoOpacity
      },
      {
        icon: 'fa-redo',
        method: selectRedo,
        opacity: redoOpacity
      },
      {
        icon: 'fa-trash-alt',
        method: selectClear,
        opacity: trashOpacity
      }
    ])

    return {
      pencilCaseSetting,
      penIcons,
      penSizes,
      colorPalette,
      operationIcons,
      selectPen,
      selectEraser,
      selectClear,
      selectUndo,
      selectRedo,
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
button {
  background: #fff;
}
@media screen and (max-width: 480px) {
  .pen_button {
    width: 30px;
    height: 30px;
  }
}
</style>
