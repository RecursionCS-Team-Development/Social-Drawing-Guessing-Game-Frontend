<template>
  <div class="w-100">
    <div class="log">
      <h2 class="text-start p-2 m-0">Chat log</h2>
      <div class="dropdown-divider"></div>
      <div class="px-1 overflow-scroll chat_wrapper" id="chats">
        <TextLine />
      </div>
    </div>
    <div class="d-flex align-items-center p-2">
      <input
        @keydown.enter="sendAnswer"
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
import { defineComponent, ref, onMounted, onActivated, nextTick } from 'vue'
import TextLine from './TextLine.vue'
import { useStore } from '../../store'
import { Chat } from '../../interface/chat'
import { User } from '../../model/user'
import { SendChatData } from '../../type/sendChatData'

export default defineComponent({
  name: 'chat',
  components: { TextLine },
  setup() {
    const getRoomId = () => {
      const room = window.location.pathname.split('/')
      return room[room.length - 1]
    }
    const store = useStore()
    let user: User = store.state.user
    let room = store.state.rooms[Number(getRoomId()) - 1]
    let chats: Chat[] = room.getChatLog()
    const userAnswer = ref<string>('')

    const ws: WebSocket = new WebSocket(
      (window.location.protocol == 'https:' ? 'wss' : 'ws') +
        '://' +
        process.env.VUE_APP_BACKEND_URL +
        'ws/chat' +
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
        playerName: user.name,
        playerImg: user.img,
        playerId: user.id,
        message: userAnswer.value
      } as SendChatData
      const data = JSON.stringify(sendData)
      ws.send(data)
      userAnswer.value = ''
    }

    const getMessage = () => {
      ws.onmessage = (e) => {
        const dataFromDjango: SendChatData = JSON.parse(e.data)
        switch (dataFromDjango.type) {
          case 'connection established':
            break
          default: {
            room.addChat(dataFromDjango)
            nextTick(() => {
              const scrollArea = document.getElementById('chats')
              if (scrollArea) {
                scrollArea.scrollTop = scrollArea.scrollHeight
              }
            })
          }
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
      user,
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
  min-height: 60vh;
}
@media screen and (max-width: 992px) {
  .chat_wrapper {
    max-height: 30vh;
    min-height: 30vh;
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
