<template>
  <div class="d-flex">
    <div class="pt-md-3 pt-2">
      <img :src="chat.img" width="32" class="rounded-circle" />
    </div>
    <div class="pt-md-3 pt-2 ps-md-3 ps-2 text-start text-black chat_size">
      <span class="pe-3 text-secondary">{{ chat.name }}</span>
      {{ chat.comment }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type Chat = {
  img: string
  name: string
  comment: string
}

export default defineComponent({
  name: 'textLine',
  props: { chat: Object as PropType<Chat> }
})
</script>
