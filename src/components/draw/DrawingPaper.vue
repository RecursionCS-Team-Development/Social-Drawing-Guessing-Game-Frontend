<template>
  <div>
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
  onUpdated,
  toRef,
  PropType
} from 'vue'
import { fabric } from 'fabric'
import { PencilCaseSetting } from '../../interface/pencilCaseSetting'

interface Canvas {
  canvas: fabric.Canvas | undefined
}

export default defineComponent({
  name: 'canvas',
  props: { pencilCaseSettings: Object as PropType<PencilCaseSetting> },
  setup(props) {
    const getRoomId = () => {
      const room = window.location.pathname.split('/')
      return room[room.length - 1]
    }
    let pencilCaseSetting = toRef(props, 'pencilCaseSettings')

    let canvasRef = ref<HTMLDivElement>()
    let colorPalette = ref<HTMLInputElement>()
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
        if (pencilCaseSetting.value) {
          canvas1.canvas.freeDrawingBrush.width =
            pencilCaseSetting.value.penBold
          canvas1.canvas.freeDrawingBrush.color =
            pencilCaseSetting.value.drawColor
        }
      })

      connectWebsocket()
    })

    onUpdated(() => {
      if (canvasRef.value?.style.height) {
        canvasRef.value.style.height =
          String(Number(canvasRef.value?.style.width) * 0.5625) + 'px'
      }

      if (canvas1.canvas?.freeDrawingBrush && pencilCaseSetting.value) {
        canvas1.canvas.freeDrawingBrush.width = Number(
          pencilCaseSetting.value.penBold
        )
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
      if (brush?.color && pencilCaseSetting.value)
        brush.color = pencilCaseSetting.value.drawColor
    }

    const clear = () => {
      canvas1.canvas?.clear()
    }

    const eraser = () => {
      let brush = canvas1.canvas?.freeDrawingBrush
      if (brush?.color && pencilCaseSetting.value)
        brush.color = pencilCaseSetting.value.eraserColor
    }

    const setColor = (color: string) => {
      let brush = canvas1.canvas?.freeDrawingBrush
      if (brush?.color && pencilCaseSetting.value) brush.color = color
    }

    const setBold = () => {
      if (canvas1.canvas?.freeDrawingBrush && pencilCaseSetting.value) {
        canvas1.canvas.freeDrawingBrush.width = Number(
          pencilCaseSetting.value.penBold
        )
      }
    }

    const test = () => {
      if (canvas1.canvas === undefined) return
      canvas1.canvas.on('mouse:over', (e) => {
        console.log('mouseover test')
      })
      sendDrawingData()
    }

    const connectWebsocket = () => {
      ws.onopen = () => {
        console.log('Open websocket for drawing')
      }
      getMessage()
    }
    const ws: WebSocket = new WebSocket(
      // 本番でwssになっていないバグ
      (window.location.protocol == 'https:' ? 'wss' : 'ws') +
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
      pencilCaseSetting,
      colorPalette,
      canvasRef,
      save,
      load,
      pen,
      clear,
      eraser,
      setColor,
      setBold,
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
