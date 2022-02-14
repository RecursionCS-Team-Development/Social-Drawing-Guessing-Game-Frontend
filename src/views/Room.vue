<template>
  <section class="room" style="background-color: #fff">
    <div class="container h-100 w-100">
      <div class="d-flex align-items-center justify-content-around">
        <button @click="addUser">user追加</button>
        <h6>{{ room.getGamePhase() }}</h6>
        <h6>時間 {{ room.getSecTime() }} s</h6>

        <h6 v-if="room.getDrawerPlayer().id != user.id">
          お題{{ room.getCurrTheme() }}(本来表示されない)
        </h6>
        <h6 v-else>お題{{ room.getCurrTheme() }}</h6>

        <h6 v-if="room.getDrawerPlayer() && room.getGamePhase() === 'acting'">
          描き手:{{ room.getDrawerPlayer().name }}さん
        </h6>
        <h6>{{ room.getCurrRound() }} / {{ room.round }}</h6>
      </div>

      <div
        class="py-1 py-lg-3 row d-flex align-items-stretch justify-content-center"
      >
        <div
          class="d-flex flex-nowrap flex-column col-lg-8 col-11 pe-lg-3 px-0"
        >
          <DrawingPaper :pencilCaseSettings="pencilCaseSettings" ref="canvas" />

          <div class="order-3 order-lg-2 btn-wrapper">
            <div class="py-1 mx-auto">
              <PencilCase
                :pencilCaseSettings="pencilCaseSettings"
                @selectPen="selectPen"
                @selectEraser="selectEraser"
                @selectClear="selectClear"
                @selectColor="selectColor"
                @rangeBold="rangeBold"
              />
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
              v-if="room.getGamePhase() === 'ready'"
              type="button"
              class="btn btn-outline-primary"
            >
              準備完了(機能なし)
            </button>
            <router-link
              v-if="
                room.getGamePhase() !== 'acting' &&
                room.getGamePhase() !== 'evaluationWinners'
              "
              :to="'/lobby'"
              @click="exitRoom"
              type="button"
              class="btn btn-outline-secondary"
              tag="button"
            >
              退出
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, toRef, reactive, ref } from 'vue'
import { useStore } from '../store'
import { onBeforeRouteLeave } from 'vue-router'
import DrawingPaper from './../components/draw/DrawingPaper.vue'
import PencilCase from './../components/draw/PencilCase.vue'
import PlayerList from './../components/screen/PlayerList.vue'
import Chat from '../components/screen/Chat.vue'
import { Player } from '../model/player'
import { User } from '../model/user'
import { HitPictureRoom } from '../model/hitPictureRoom'
import { PencilCaseSetting } from '../interface/pencilCaseSetting'

export default defineComponent({
  name: 'room',
  props: ['roomId'],
  components: { DrawingPaper, PencilCase, PlayerList, Chat },
  setup(props) {
    let roomId = toRef(props, 'roomId')

    const store = useStore()
    let room: HitPictureRoom = store.state.rooms[Number(roomId.value - 1)]
    let user: User = store.state.user
    let players: Player[] = room.getPlayers()
    const user2 = new User(
      'ユーザー2',
      '@gmail.com',
      '2345678',
      '5678',
      'https://4.bp.blogspot.com/-7ArmuhZRYmE/Wn1Zk_UUyHI/AAAAAAABKNg/uXtlYDHauv8RVt54J0qxKbEGS8jYYCCgACLcBGAs/s400/character_girl_normal.png',
      'よろしくお願いします',
      '',
      false,
      ''
    )
    const addUser = () => room.phaseAction(user2)

    const canvas = ref<InstanceType<typeof DrawingPaper>>()
    let pencilCaseSettings: PencilCaseSetting = reactive({
      drawColor: '#000000',
      eraserColor: '#ffffff',
      penBold: 10,
      eraserBold: 10
    })

    const selectPen = () => {
      if (canvas.value) canvas.value.pen()
    }

    const selectEraser = () => {
      if (canvas.value) canvas.value.eraser()
    }

    const selectClear = () => {
      if (canvas.value) canvas.value.clear()
    }

    const selectColor = (color: string) => {
      if (canvas.value) canvas.value.setColor(color)
    }

    const rangeBold = () => {
      if (canvas.value) canvas.value.setBold()
    }

    const exitRoom = () => {
      for (let i = 0; i < room.players.length; i++) {
        if (room.players[i].id === user.id) {
          room.players.splice(i, 1)
          if (room.players.length === 0) {
            store.state.rooms.splice(Number(roomId.value - 1), 1)
          }
          return
        }
      }
    }

    onBeforeRouteLeave(() => {
      exitRoom()
    })

    return {
      room,
      players,
      user,
      user2,
      pencilCaseSettings,
      canvas,
      addUser,
      selectPen,
      selectEraser,
      selectClear,
      selectColor,
      rangeBold,
      exitRoom
    }
  }
})
</script>

<style scoped></style>
