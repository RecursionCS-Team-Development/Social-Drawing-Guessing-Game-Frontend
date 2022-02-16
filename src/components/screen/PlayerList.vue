<template>
  <div
    v-for="(player, index) of players.values()"
    :key="index"
    class="col p-sm-2 p-1"
  >
    <figure class="d-flex avatar_wrapper m-auto">
      <img class="avatar" :src="player.img" alt="Avatar" />
    </figure>
    <p class="py-1 m-0 player_name">{{ player.name }}</p>
    <div class="text-secondary">
      <div
        class="d-flex justify-content-center align-items-center player_score"
      >
        <i class="fas fa-coins pe-1"></i>
        <p class="m-0 text-dark">{{ player.score }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue'
import { Player } from '../../model/player'
import { useStore } from '../../store'

export default defineComponent({
  name: 'playerList',
  props: ['roomId'],
  setup(props) {
    let roomId = toRef(props, 'roomId')
    const store = useStore()
    let room = store.state.rooms[Number(roomId.value - 1)]
    let players: Map<string, Player> = room.getPlayersHash()

    return {
      players
    }
  }
})
</script>

<style scoped>
.avatar_wrapper {
  width: 64px;
  height: 64px;
  margin: 0;
}
@media screen and (max-width: 480px) {
  .avatar_wrapper {
    width: 40px;
    height: 40px;
  }
}
.avatar {
  width: 100%;
  height: 100%;
  margin: auto;
  border-radius: 50%;
}

.player_name {
  font-size: 16px;
}
.player_score {
  font-size: 24px;
}
@media screen and (max-width: 480px) {
  .player_name {
    font-size: 10px;
  }
}
@media screen and (max-width: 480px) {
  .player_score {
    font-size: 12px;
  }
}
</style>
