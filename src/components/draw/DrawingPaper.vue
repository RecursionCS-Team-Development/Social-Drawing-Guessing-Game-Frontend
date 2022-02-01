<template>
  <div>
    <div class="d-flex justify-content-around">
      <button @click="save">Save</button>
      <button @click="load">Load</button>
      <button @click="pen">Pen</button>
      <input
        @change="setColor"
        type="color"
        ref="colorPalette"
        list=""
        :value="drawColor"
      />
      <button @click="eraser">Eraser</button>

      <div class="d-flex">
        <label for="customRange1" class="form-label px-2">{{
          lineWidth
        }}</label>
        <input type="range" max="20" min="1" v-model="lineWidth" />
      </div>
      <button @click="clear">Clear</button>
    </div>

    <div class="order-2 order-lg-1 canvas_wrapper border" ref="canvasRef">
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  nextTick,
  reactive,
  ref,
  onUpdated
} from 'vue'
import { fabric } from 'fabric'
import { useStore } from '../../store'

interface Canvas {
  canvas: fabric.Canvas | undefined
}

export default defineComponent({
  name: 'canvas',
  setup() {
    const getRoomId = () => {
      const room = window.location.pathname.split('/')
      return room[room.length - 1]
    }
    const store = useStore()
    let room = store.state.rooms[Number(getRoomId()) - 1]

    let canvasRef = ref<HTMLDivElement>()
    let colorPalette = ref<HTMLInputElement>()
    let lineWidth = ref(10)
    let drawColor = ref('#000000')
    const eraserColor = ref('rgb(238,238,238)')

    let canvas1 = reactive<Canvas>({
      canvas: undefined
    })

    const updateSize = () => {
      const rect: DOMRect | undefined = canvasRef.value?.getBoundingClientRect()
      let rectHeight = rect?.width

      if (canvasRef.value && rectHeight) {
        canvasRef.value.style.height = rectHeight * 0.5625 + 'px'
      }

      canvas1.canvas?.setWidth(String(canvasRef.value?.clientWidth))
      canvas1.canvas?.setHeight(String(canvasRef.value?.clientHeight))
    }

    onMounted(() => {
      window.addEventListener('resize', updateSize)

      nextTick(() => {
        canvas1.canvas = new fabric.Canvas('canvas', {
          width: canvasRef.value?.clientWidth,
          height: canvasRef.value?.clientHeight,
          isDrawingMode: true
        })
        canvas1.canvas.isDrawingMode = true
        canvas1.canvas.freeDrawingBrush.width = lineWidth.value
        canvas1.canvas.freeDrawingBrush.color = drawColor.value
      })
    })

    onUpdated(() => {
      if (canvasRef.value?.style.height) {
        canvasRef.value.style.height =
          String(Number(canvasRef.value?.style.width) * 0.5625) + 'px'
      }

      if (canvas1.canvas?.freeDrawingBrush) {
        canvas1.canvas.freeDrawingBrush.width = Number(lineWidth.value)
      }
    })

    const save = () => {
      const canvasState = JSON.stringify(canvas1.canvas)
      localStorage.setItem('state', canvasState)
    }

    const load = () => {
      const canvasState = localStorage.getItem('state')
      canvas1.canvas?.loadFromJSON(canvasState, () => console.log('loaded!!'))
    }

    const pen = () => {
      let brush = canvas1.canvas?.freeDrawingBrush
      if (brush?.color) brush.color = drawColor.value
    }

    const clear = () => {
      canvas1.canvas?.clear()
    }

    const eraser = () => {
      let brush = canvas1.canvas?.freeDrawingBrush
      if (brush?.color) brush.color = eraserColor.value
    }

    const setColor = () => {
      drawColor.value = String(colorPalette?.value?.value)
      let brush = canvas1.canvas?.freeDrawingBrush
      if (brush?.color) brush.color = drawColor.value
    }

    return {
      lineWidth,
      colorPalette,
      drawColor,
      eraserColor,
      canvasRef,
      save,
      load,
      pen,
      clear,
      eraser,
      setColor
    }
  }
})
</script>

<style scoped>
.canvas_wrapper {
  width: 100%;
}

#canvas {
  width: 100%;
  height: 100%;
}
</style>
