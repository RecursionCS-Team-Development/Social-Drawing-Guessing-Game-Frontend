<template>
  <div v-for="(chat, index) in chats" :key="index" class="d-flex">
    <div class="pt-md-3 pt-2">
      <img :src="chat.playerImg" width="32" class="rounded-circle" />
    </div>
    <div class="pt-md-3 pt-2 ps-md-3 ps-2 text-start text-black chat_size">
      <span class="pe-3 text-secondary">{{ chat.playerName }}</span>
      {{ chat.message }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '../../store'
import { Chat } from '../../interface/chat'

export default defineComponent({
  name: 'textLine',
  setup() {
    const getRoomId = () => {
      const room = window.location.pathname.split('/')
      return room[room.length - 1]
    }
    const store = useStore()
    let room = store.state.rooms[Number(getRoomId()) - 1]
    let chats: Chat[] = room.getChatLog()

    return { chats }
  }
})
</script>
