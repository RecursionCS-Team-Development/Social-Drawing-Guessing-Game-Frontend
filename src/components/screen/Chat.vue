<template>
  <div class="w-100">
    <div class="log">
      <h2 class="text-start p-2 m-0">Chat log</h2>
      <div class="dropdown-divider"></div>
      <div class="px-1 overflow-scroll chat_wrapper">
        <TextLine v-for="(chat, index) in chats" :key="index" :chat="chat" />
      </div>
    </div>
    <div class="d-flex align-items-center p-2">
      <input
        type="text"
        class="form-control"
        placeholder="Type a message"
        v-model="userAnswer"
      />
      <button
        class="btn btn-primary rounded-circle ms-2"
        type="submit"
        @click="sendAnswer"
      >
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onActivated } from 'vue'
import TextLine from './TextLine.vue'

interface Chat {
  name: string
  comment: string
  img: string
}

export default defineComponent({
  name: 'chat',
  components: { TextLine },
  setup() {
    const userAnswer = ref<string>('')
    let chats = ref<Chat[]>([])

    const getRoomId = () => {
      const room = window.location.pathname.split('/')
      return room[room.length - 1]
    }

    const ws: WebSocket = new WebSocket(
      (window.location.protocol == 'https' ? 'wss' : 'ws') +
        '://' +
        'localhost:8000' +
        '/ws/chat' +
        `/${getRoomId()}/`
    )

    const connectSocket = () => {
      ws.onopen = () => {
        console.log('Open WebSocket Server')
      }
      getMessage()
    }

    const sendAnswer = () => {
      if (userAnswer.value === '') return
      const sendData = {
        type: 'send message',
        message: userAnswer.value
      }
      const data = JSON.stringify(sendData)
      ws.send(data)
      userAnswer.value = ''
    }

    const getMessage = () => {
      ws.onmessage = (e) => {
        const dataFromDjango = JSON.parse(e.data)
        switch (dataFromDjango.type) {
          case 'connection established':
            console.log(dataFromDjango.message)
            break
          default:
            chats.value.push({
              name: 'testUser',
              comment: dataFromDjango.message,
              img: 'https://i.imgur.com/bDLhJiP.jpg'
            })
        }
      }
    }

    const disconnect = () => {
      ws.onclose = () => {
        console.error('WebSocket has been closed unexpectedly')
      }
    }

    onActivated(() => {
      getMessage()
    })

    onMounted(() => {
      connectSocket()
      getRoomId()
    })

    return {
      chats,
      userAnswer,
      connectSocket,
      disconnect,
      sendAnswer,
      getMessage,
      getRoomId
    }
  }
})
</script>

<style scoped>
.chat_wrapper {
  max-height: 60vh;
}
@media screen and (max-width: 992px) {
  .chat_wrapper {
    max-height: 30vh;
  }
}
.chat_size {
  font-size: 13px;
}
@media screen and (max-width: 992px) {
  .chat_size {
    font-size: 10px;
  }
}
</style>
