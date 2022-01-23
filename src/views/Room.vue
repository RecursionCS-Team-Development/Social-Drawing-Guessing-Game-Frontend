<template>
  <section class="room" style="background-color: #eee">
    <div class="p-3" v-if="index != 0">{{ index }}</div>
    <div class="container h-100 w-100">
      <div
        class="py-1 py-lg-3 row d-flex align-items-stretch justify-content-center"
      >
        <div
          class="d-flex flex-nowrap flex-column col-lg-8 col-11 pe-lg-3 px-0"
        >
          <DrawingPaper />

          <div class="order-3 order-lg-2 btn-wrapper">
            <div class="py-1 mx-auto">
              <PencilCase />
            </div>
          </div>

          <div class="order-1 order-lg-3 w-100 row row-cols-6 mx-auto">
            <PlayerList
              v-for="(player, index) in players"
              :player="player"
              :key="index"
              class="col p-sm-2 p-1"
            />
          </div>
        </div>

        <div
          class="col-lg-4 col-11 bg-white border d-flex align-items-start flex-column"
        >
          <Chat />
          <div class="d-flex justify-content-around action p-2 w-100">
            <button
              type="button"
              class="btn btn-outline-primary"
              style="width: 45%"
            >
              準備完了
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary"
              style="width: 45%"
            >
              退出
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import DrawingPaper from './../components/draw/DrawingPaper.vue'
import PencilCase from './../components/draw/PencilCase.vue'
import PlayerList from './../components/screen/PlayerList.vue'
import Chat from '../components/screen/Chat.vue'

interface Player {
  name: string
  score: number
  img: string
}

export default defineComponent({
  name: 'room',
  props: ['index'],
  components: { DrawingPaper, PencilCase, PlayerList, Chat },

  setup() {
    let players = ref<Player[]>([
      {
        name: 'Anonymous',
        score: 100,
        img: 'https://i.imgur.com/bDLhJiP.jpg'
      }
    ])
    for (let i = 0; i < 5; i++) {
      players.value.push({
        name: 'Anonymous',
        score: 100,
        img: 'https://i.imgur.com/bDLhJiP.jpg'
      } as Player)
    }
    return {
      players
    }
  }
})
</script>

<style scoped></style>
