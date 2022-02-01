<template>
  <section class="room" style="background-color: #eee">
    <div class="container h-100 w-100">
      <div class="d-flex align-items-center justify-content-around">
        <button @click="addUser">user追加</button>
        <h6>{{ room.gamePhase }}</h6>
        <h6>時間 {{ room.secTime }}s</h6>
        <h6>{{ room.currTheme }}</h6>
        <h6>描き手:{{ drawPlayer }}さん</h6>
        <h6>{{ room.currRound }} / {{ room.round }}</h6>
      </div>

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
            <PlayerList :roomId="roomId" />
          </div>
        </div>

        <div
          class="col-lg-4 col-11 bg-white border d-flex align-items-start justify-content-between flex-column"
        >
          <Chat :roomId="roomId" />
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
import { defineComponent, toRef, computed } from 'vue'
import { useStore } from '../store'
import DrawingPaper from './../components/draw/DrawingPaper.vue'
import PencilCase from './../components/draw/PencilCase.vue'
import PlayerList from './../components/screen/PlayerList.vue'
import Chat from '../components/screen/Chat.vue'
import { Player } from '../model/player'
import { User } from '../model/user'

export default defineComponent({
  name: 'room',
  props: ['roomId'],
  components: { DrawingPaper, PencilCase, PlayerList, Chat },
  setup(props) {
    let roomId = toRef(props, 'roomId')

    const store = useStore()
    let room = store.state.rooms[Number(roomId.value - 1)]
    let players: Player[] = room.getPlayers()
    const user = new User(
      'ユーザー2',
      '@gmail.com',
      '2345678',
      '5678',
      'https://4.bp.blogspot.com/-7ArmuhZRYmE/Wn1Zk_UUyHI/AAAAAAABKNg/uXtlYDHauv8RVt54J0qxKbEGS8jYYCCgACLcBGAs/s400/character_girl_normal.png',
      'よろしくお願いします',
      '',
      false
    )
    const addUser = () => room.phaseAction(user)

    const drawPlayer = computed(() => {
      if (room.getShufflePlayers().length != 0) {
        return room.getDrawerPlayer().name
      }
      return room.getDrawerPlayer()
    })

    return {
      room,
      players,
      user,
      drawPlayer,
      addUser
    }
  }
})
</script>

<style scoped></style>
