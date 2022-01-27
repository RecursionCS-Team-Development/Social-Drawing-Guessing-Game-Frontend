<template>
  <section class="server h-100 mt-3 mt-md-0" style="background-color: #fff">
    <div class="container">
      <div class="d-flex justify-content-center align-items-center mt-5">
        <button @click.prevent="openModal" class="btn btn-warning">
          ルーム作成
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <div class="row row-cols-2 row-cols-md-3 g-4 mt-2 mt-sm-5">
        <template v-if="roomsStore.length">
          <div class="col" v-for="(room, index) in roomsStore" :key="index">
            <router-link
              :to="room.getLink()"
              tag="div"
              class="card rounded routerLink"
            >
              <div class="card-body d-block p-2 p-sm-4">
                <h5 class="card-title">{{ room.getName() }}</h5>
                <p class="mb-1">{{ room.getMode() }}</p>
                <p class="mb-1">{{ room.getLevel() }}</p>
                <p class="mb-1">{{ room.getRound() }}</p>
                <p class="card-text text-end mt-sm-2">
                  {{ room.getParticipants().length }} / {{ room.getEntryNum() }}
                </p>
              </div>
            </router-link>
          </div>
        </template>
      </div>
      <!-- Modal -->
      <div v-show="showModal" id="overlay">
        <div class="modal-box">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">ルーム作成</h5>
          </div>
          <form>
            <div class="modal-body">
              <div v-for="(input, index) in inputs" :key="index" class="">
                <div
                  v-if="input.alert"
                  class="alert alert-warning mb-2 p-1"
                  role="alert"
                >
                  {{ input.alertText }}
                </div>
                <div
                  class="row d-flex flex-row align-items-center mb-2 mb-sm-4"
                >
                  <label class="col-sm-4 m-auto pe-3">{{ input.label }}</label>
                  <div class="col-sm-8 form-outline flex-fill mb-0">
                    <input
                      v-model="input.text"
                      :type="input.type"
                      :placeholder="input.placeholder"
                      class="form-control"
                      required="true"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div
                v-for="(select, index) in selects"
                :key="index"
                class="row d-flex flex-row align-items-center mb-2 mb-sm-4"
              >
                <label class="col-sm-4 m-auto pe-3">{{ select.label }}</label>
                <div class="col-sm-8 form-outline flex-fill mb-0">
                  <select
                    v-model="select.selected"
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option
                      v-for="(option, index) in select.options"
                      :key="index"
                      :value="option"
                      disabled
                    >
                      {{ option }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="row d-flex flex-row align-items-center mb-2 mb-sm-4">
                <label class="col-sm-4 m-auto pe-3">ラウンド</label>
                <div class="col-sm-8 form-outline d-flex d-sm-block mb-0">
                  <label for="customRange1" class="form-label pe-3 pe-sm-0">
                    {{ optionRounds.value }}
                  </label>
                  <input
                    v-model="optionRounds.value"
                    :min="optionRounds.min"
                    :max="optionRounds.max"
                    type="range"
                    class="form-range"
                    id="customRange1"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer row d-flex justify-content-around">
              <CancelButton
                @click="closeModal"
                :text="cancelBtnText"
                class="p-1 col-sm-5 col-8"
              />
              <ConfirmButton
                @click="confirmRoom(user)"
                :text="confirmBtnText"
                class="p-1 col-sm-5 col-8"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, PropType } from 'vue'
import router from '../router'
import { useStore } from '../store'
import ConfirmButton from '../components/common/ConfirmButton.vue'
import CancelButton from '../components/common/CancelButton.vue'

interface User {
  name: string
  mail: string
  password: string
  img: string
  profile: string
  twitterAccount: string
  login: boolean
}

interface RoomHash {
  name: string
  password: string
  entryNum: number
  mode: string
  level: string
  round: number
  participants: User[]
  link: string
}

export default defineComponent({
  name: 'Server',
  components: { ConfirmButton, CancelButton },
  props: {
    user: Object as PropType<User>
  },
  setup() {
    const store = useStore()
    let roomsStore = store.state.rooms

    let roomHash = reactive({
      name: 'テストルーム',
      password: '',
      entryNum: 2,
      mode: '絵当てゲーム',
      level: 'medium',
      round: 5,
      participants: [],
      link: '/room/' + Number(roomsStore.length + 1)
    }) as RoomHash

    let showModal = ref(false)
    const confirmBtnText = '作成'
    const cancelBtnText = 'キャンセル'

    const inputs: {
      text: string
      label: string
      type: string
      placeholder: string
      alert: boolean
      alertText: string
    }[] = reactive([
      {
        text: roomHash.name,
        label: 'ルーム名',
        type: 'text',
        placeholder: 'ルーム名',
        alert: false,
        alertText: 'ルーム名は必須です'
      },
      {
        text: roomHash.password,
        label: 'パスワード',
        type: 'text',
        placeholder: 'password',
        alert: false,
        alertText: ''
      }
    ])

    const selects: {
      selected: string | number
      options: string[] | number[]
      label: string
    }[] = [
      {
        selected: roomHash.entryNum,
        options: [2, 3, 4, 5, 6],
        label: '参加人数'
      },
      {
        selected: roomHash.mode,
        options: ['絵当てゲーム', '伝言ゲーム'],
        label: 'モード'
      },
      {
        selected: roomHash.level,
        options: ['hard', 'medium', 'easy'],
        label: 'レベル'
      }
    ]

    const optionRounds: {
      value: number
      min: number
      max: number
    } = reactive({
      value: roomHash.round,
      min: 1,
      max: 10
    })

    const openModal = () => (showModal.value = true)
    const closeModal = () => {
      showModal.value = false
      initializeForm()
    }
    const confirmRoom = (user: User) => {
      if (roomHash.name === '') inputs[0].alert = true
      else {
        showModal.value = false
        roomHash.participants.push(user)
        store.commit('addRoom', roomHash)
        router.push({
          name: 'Room',
          params: { roomId: roomsStore.length }
        })
        initializeForm()
      }
    }

    const initializeForm = () => {
      inputs[0].text = roomHash.name
      inputs[0].alert = false
      inputs[1].text = roomHash.password
      selects[0].selected = roomHash.entryNum
      selects[1].selected = roomHash.mode
      selects[2].selected = roomHash.level
      optionRounds.value = roomHash.round
    }

    return {
      showModal,
      inputs,
      selects,
      roomsStore,
      optionRounds,
      confirmBtnText,
      cancelBtnText,
      confirmRoom,
      openModal,
      closeModal
    }
  }
})
</script>

<style>
#overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.modal-box {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 80%;
  max-height: 80%;
  padding: 32px;
  background-color: #fff;
  border-radius: 4px;
  transform: translate(-50%, -50%);
  overflow: auto;
}
@media screen and (max-width: 768px) {
  .modal-box {
    width: 75%;
    padding: 12px;
  }
}
.routerLink {
  text-decoration: none;
  color: #000;
}
</style>
