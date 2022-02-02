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

    <div
      class="order-2 order-lg-1 canvas_wrapper border"
      ref="canvasRef"
      @mouseover="test"
    >
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

interface Canvas {
  canvas: fabric.Canvas | undefined
}

export default defineComponent({
  name: 'canvas',
  setup() {
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

      connectWebsocket()
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

    const test = () => {
      if (canvas1.canvas === undefined) return
      canvas1.canvas.on('mouse:over', (e) => {
        console.log('mouseover test')
      })
      sendDrawingData()
    }

    const getRoomId = () => {
      const room = window.location.pathname.split('/')
      return room[room.length - 1]
    }
    const connectWebsocket = () => {
      ws.onopen = () => {
        console.log('Open websocket for drawing')
      }
      getMessage()
    }
    const ws: WebSocket = new WebSocket(
      // 本番でwssになっていないバグ
      (window.location.protocol == 'https' ? 'wss' : 'ws') +
        '://' +
        process.env.VUE_APP_BACKEND_URL +
        'ws/draw' +
        `/${getRoomId()}/`
    )
    const getMessage = () => {
      ws.onmessage = (e) => {
        let data = JSON.parse(e.data)
        if (data.message.action === 'clear') {
          canvas1.canvas?.clear()
          return
        }

        data = data.message.drawInstruction

        const path = new fabric.Path(data.pathCoordinates, {
          stroke: data.stroke,
          strokeWidth: data.strokeWidth,
          strokeLineCap: data.strokeLineCap,
          strokeLineJoin: data.strokeLineJoin,
          shadow: data.shadow,
          fill: data.fill
        })

        canvas1.canvas?.add(path)
      }
    }

    const convertCoordinate = (arr: any[][]) => {
      const coordinate = arr
        .map((itemArr) => {
          return itemArr.join(' ')
        })
        .join(' ')
      return coordinate
    }

    const closeConnection = () => {
      ws.onclose = () => {
        console.error('Chat socket closed unexpectedly')
      }
    }

    const sendDrawingData = () => {
      canvas1.canvas?.on('path:created', (e: any) => {
        console.log(e.path.path)
        const pathCoordinates = convertCoordinate(e.path.path)

        const drawInstruction = {
          pathCoordinates: pathCoordinates,
          stroke: e.path.stroke,
          strokeWidth: e.path.strokeWidth,
          strokeLineCap: e.path.strokeLineCap,
          strokeLineJoin: e.path.strokeLineJoin,
          shadow: e.path.shadow,
          fill: false
        }

        ws.send(
          JSON.stringify({
            message: {
              type: 'draw',
              drawInstruction: drawInstruction
            }
          })
        )
      })
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
      setColor,
      test,
      getMessage,
      closeConnection,
      sendDrawingData,
      connectWebsocket,
      convertCoordinate
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
