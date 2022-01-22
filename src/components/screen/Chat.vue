<template>
  <div class="w-100">
    <div class="log">
      <h2 class="text-start p-2 m-0">Chat log</h2>
      <div class="dropdown-divider"></div>
      <div class="px-1 overflow-scroll chat_wrapper">
        <div v-for="(chat, index) in chats" :key="index">
          <div class="d-flex">
            <div class="pt-md-3 pt-2">
              <img :src="chat.img" width="32" class="rounded-circle" />
            </div>
            <div
              class="pt-md-3 pt-2 ps-md-3 ps-2 text-start text-black chat_size"
            >
              <span class="pe-3 text-secondary">{{ chat.name }}</span>
              {{ chat.comment }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex align-items-center p-2">
      <input type="text" class="form-control" placeholder="Type a message" />
      <button class="btn btn-primary rounded-circle ms-2" type="button">
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

interface chat {
  name: string
  comment: string
  img: string
}

export default defineComponent({
  name: 'chat',
  setup() {
    let chats = ref<chat[]>([
      {
        name: 'Anonymous',
        comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        img: 'https://i.imgur.com/bDLhJiP.jpg'
      }
    ])
    for (let i = 0; i < 14; i++) {
      chats.value.push({
        name: 'Anonymous',
        comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        img: 'https://i.imgur.com/bDLhJiP.jpg'
      } as chat)
    }
    return {
      chats
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
