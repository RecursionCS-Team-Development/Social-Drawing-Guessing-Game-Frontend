<template>
  <section class="server h-100 mt-3 mt-md-0" style="background-color: #fff">
    <div class="container">
      <div class="d-flex justify-content-center align-items-center mt-5">
        <button @click.prevent="openModal" class="btn btn-warning">
          ルーム作成
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
        <template v-if="rooms.length">
          <div class="col" v-for="(room, index) in rooms" :key="index">
            <router-link
              :to="room.link"
              tag="div"
              class="card rounded routerLink"
            >
              <div
                class="card-body d-flex justify-content-around align-items-center d-sm-block"
              >
                <h5 class="card-title">{{ room.name }}</h5>
                <p class="mb-1">{{ room.mode }}</p>
                <p class="mb-1">{{ room.level }}</p>
                <p class="mb-1">{{ room.round }}</p>
                <p class="card-text text-end mt-sm-2">
                  {{ room.participants.length }} / {{ room.entryNum }}
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
                <div class="row d-flex flex-row align-items-center mb-4">
                  <label class="col-sm-4 m-auto pe-3">{{ input.label }}</label>
                  <div class="col-sm-8 form-outline flex-fill mb-0">
                    <input
                      v-model="input.text"
                      :type="input.type"
                      @input="input.method"
                      :placeholder="input.placeholder"
                      class="form-control"
                      required="true"
                    />
                  </div>
                </div>
              </div>

              <div
                v-for="(select, index) in selects"
                :key="index"
                class="row d-flex flex-row align-items-center mb-4"
              >
                <label class="col-sm-4 m-auto pe-3">{{ select.label }}</label>
                <div class="col-sm-8 form-outline flex-fill mb-0">
                  <select
                    v-model="select.selected"
                    @change="select.method"
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option
                      v-for="(option, index) in select.options"
                      :key="index"
                      :value="option"
                    >
                      {{ option }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="d-flex flex-row align-items-center mb-4">
                <label class="col-sm-4 m-auto pe-3">ラウンド</label>
                <div class="col-sm-8 form-outline flex-fill mb-0">
                  <label for="customRange1" class="form-label">
                    {{ optionRounds.value }}
                  </label>
                  <input
                    v-model="optionRounds.value"
                    :min="optionRounds.min"
                    :max="optionRounds.max"
                    @change="optionRounds.method"
                    type="range"
                    class="form-range"
                    id="customRange1"
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                @click="closeModal"
                type="button"
                class="btn btn-secondary"
              >
                キャンセル
              </button>
              <button
                @click="confirmRoom"
                type="button"
                class="btn btn-primary"
              >
                作成
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, toRef, reactive, ref } from 'vue'
interface User {
  name: string
  mail: string
  password: string
  img: string
  profile: string
  twitterAccount: string
  login: boolean
}

class Room {
  public name: string
  public password: string
  public entryNum: number
  public mode: string
  public level: string
  public round: number
  public participants: User[]
  public link: string

  constructor() {
    this.name = ''
    this.password = ''
    this.entryNum = 2
    this.mode = '絵当てゲーム'
    this.level = 'medium'
    this.round = 5
    this.participants = []
    this.link = '/room'
  }

  public initialize() {
    this.name = ''
    this.password = ''
    this.entryNum = 2
    this.mode = '絵当てゲーム'
    this.level = 'medium'
    this.round = 5
  }
}

export default defineComponent({
  name: 'Server',
  components: {},
  props: ['user'],
  setup(props) {
    let showModal = ref(false)
    let userInfo = toRef(props, 'user')
    let room = new Room()
    const confirm = '作成'

    const inputsName = () => (room.name = inputs[0].text)
    const inputsPassword = () => (room.password = inputs[1].text)
    const selectEntryNum = () => (room.entryNum = Number(selects[0].selected))
    const selectMode = () => (room.mode = String(selects[1].selected))
    const selectLevel = () => (room.level = String(selects[2].selected))
    const roundValue = () => (room.round = Number(optionRounds.value))

    const inputs: {
      text: string
      label: string
      type: string
      placeholder: string
      alert: boolean
      alertText: string
      method: () => void
    }[] = reactive([
      {
        text: room.name,
        label: 'ルーム名',
        type: 'text',
        placeholder: 'ルーム名',
        alert: false,
        alertText: 'ルーム名は必須です',
        method: inputsName
      },
      {
        text: room.password,
        label: 'パスワード',
        type: 'text',
        placeholder: 'password',
        alert: false,
        alertText: '',
        method: inputsPassword
      }
    ])

    const selects: {
      selected: string | number
      options: string[] | number[]
      label: string
      method: () => void
    }[] = [
      {
        selected: room.entryNum,
        options: [2, 3, 4, 5, 6],
        label: '参加人数',
        method: selectEntryNum
      },
      {
        selected: room.mode,
        options: ['絵当てゲーム', '伝言ゲーム'],
        label: 'モード',
        method: selectMode
      },
      {
        selected: room.level,
        options: ['hard', 'medium', 'easy'],
        label: 'レベル',
        method: selectLevel
      }
    ]

    const optionRounds: {
      value: number
      min: number
      max: number
      method: () => void
    } = reactive({
      value: room.round,
      min: 1,
      max: 10,
      method: roundValue
    })

    const openModal = () => (showModal.value = true)
    const closeModal = () => {
      showModal.value = false
      room.initialize()
      initializeForm()
    }

    const confirmRoom = () => {
      if (room.name === '') inputs[0].alert = true
      else {
        showModal.value = false
        rooms.push(Object.assign({}, room))
        room.initialize()
        initializeForm()
      }
    }

    const initializeForm = () => {
      inputs[0].text = room.name
      inputs[0].alert = false
      inputs[1].text = room.password
      selects[0].selected = room.entryNum
      selects[1].selected = room.mode
      selects[2].selected = room.level
      optionRounds.value = room.round
    }

    let rooms: Room[] = reactive([])

    return {
      showModal,
      userInfo,
      inputs,
      selects,
      rooms,
      optionRounds,
      room,
      confirm,
      confirmRoom,
      inputsName,
      inputsPassword,
      selectEntryNum,
      selectMode,
      selectLevel,
      roundValue,
      initializeForm,
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
  padding: 32px;
  background-color: #fff;
  border-radius: 4px;
  transform: translate(-50%, -50%);
}

.routerLink {
  text-decoration: none;
  color: #000;
}
</style>
