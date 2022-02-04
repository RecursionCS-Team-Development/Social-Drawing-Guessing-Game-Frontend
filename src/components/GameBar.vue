<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div v-if="room" class="container-fluid container justify-content-around">
      <p class="mb-0 px-2">{{ room.getSecTime() }} s</p>

      <p
        v-if="
          room.getDrawerPlayer().id != user.id &&
          room.getGamePhase() === 'acting'
        "
        class="mb-0 px-2"
      >
        <i class="fas fa-pen text-dark"></i>
        {{ room.getDrawerPlayer().name }}さん
      </p>
      <p
        v-else-if="
          room.getDrawerPlayer().id == user.id &&
          room.getGamePhase() === 'acting'
        "
        class="mb-0 px-2"
      >
        お題:{{ room.getCurrTheme() }}
      </p>
      <p v-else class="mb-0 px-2"></p>

      <p class="mb-0 px-2">{{ room.getCurrRound() }} / {{ room.round }}</p>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '../store'
import { User } from '../model/user'

export default defineComponent({
  name: 'gameBar',
  setup() {
    const getRoomId = () => {
      const room = window.location.pathname.split('/')
      return room[room.length - 1]
    }
    const store = useStore()
    let room = store.state.rooms[Number(getRoomId()) - 1]
    let user: User = store.state.user

    return {
      room,
      user
    }
  }
})
</script>

<style scoped></style>
