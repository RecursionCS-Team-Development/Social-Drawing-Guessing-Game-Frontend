<template>
  <div>
    <div class="d-flex justify-content-around">
      <button @click="undo">Undo</button>
      <button @click="redo">Redo</button>
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
  onUpdated,
  toRef,
  PropType
} from 'vue'
import { fabric } from 'fabric'
import { PencilCaseSetting } from '../../interface/pencilCaseSetting'
import { Stack } from '../../model/stack'

interface Canvas {
  canvas: fabric.Canvas | undefined
}

export default defineComponent({
  name: 'canvas',
  props: { pencilCaseSettings: Object as PropType<PencilCaseSetting> },
  setup(props) {
    let undoStack = new Stack()
    let redoStack = new Stack()

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
        canvas1.canvas?.on('path:created', (e) => {
          sendDrawingData(e)
        })

        connectWebsocket()
      })
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
      if (undoStack.peek() != null) {
        canvas1.canvas?.clear()
        redoStack.empty()

        var objects = canvas1.canvas?.getObjects()
        if (objects) {
          undoStack.push(objects[objects.length - 2])
          undoStack.push(objects[objects.length - 1])
        }
      }
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

    const undo = () => {
      if (undoStack.count) {
        if (undoStack.peek() == undefined) {
          console.log('undo Undefined')
          for (let i = 0; i < 2; i++) {
            redoStack.push(undoStack.peek())
            undoStack.pop()
          }

          let iterator: Stack = undoStack
          let temp = new Stack()

          while (iterator != null) {
            if (iterator.peek() == undefined) {
              while (temp.peek() != null) {
                undoStack.push(temp.pop())
              }
              return
            } else {
              let peekNode = iterator.peek()
              if (peekNode != null) canvas1.canvas?.add(peekNode)
              if (iterator.head != null) temp.push(iterator.pop())
            }
          }
        } else {
          for (let i = 0; i < 2; i++) {
            let peekStack = undoStack.peek()
            if (peekStack != null) {
              canvas1.canvas?.remove(peekStack)
              redoStack.push(peekStack)
              undoStack.pop()
            }
          }
        }
      }
    }

    const redo = () => {
      if (redoStack.count) {
        if (redoStack.peek() == undefined) {
          canvas1.canvas?.clear()
          var objects = canvas1.canvas?.getObjects()
          if (objects) {
            redoStack.pop()
            redoStack.pop()
            undoStack.push(objects[objects.length - 2])
            undoStack.push(objects[objects.length - 1])
          }
        } else {
          for (let i = 0; i < 2; i++) {
            let peekStack = redoStack.peek()
            if (peekStack != null) {
              canvas1.canvas?.add(peekStack)
              undoStack.push(peekStack)
              redoStack.pop()
            }
          }
        }
      }
    }

    const test = () => {
      if (canvas1.canvas === undefined) return
      canvas1.canvas.on('mouse:over', (e) => {
        console.log('mouseover test')
      })
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

        var objects = canvas1.canvas?.getObjects()
        if (objects) {
          undoStack.push(objects[objects.length - 2])
          undoStack.push(objects[objects.length - 1])
          redoStack.empty()
        }
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

    const sendDrawingData = (e: any) => {
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
    }

    return {
      undoStack,
      redoStack,
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
      convertCoordinate,
      undo,
      redo
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
