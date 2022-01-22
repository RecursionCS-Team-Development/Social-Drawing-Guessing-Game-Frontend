<template>
  <section class="server h-100 mt-3 mt-md-0" style="background-color: #fff">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        <div class="col" v-for="(card, index) in cards" :key="index">
          <router-link
            :to="card.link"
            tag="div"
            class="card rounded routerLink"
          >
            <div
              class="card-body d-flex justify-content-around align-items-center d-sm-block"
            >
              <h5 class="card-title">{{ card.name }}</h5>
              <p class="card-text text-end mt-sm-5">
                {{ card.now }} / {{ card.max }}
              </p>
            </div>
          </router-link>
        </div>
        <div
          class="d-flex justify-content-center align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <button class="btn btn-warning">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">ルーム作成</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body">
              <div
                v-for="(input, index) in inputs"
                :key="index"
                class="row d-flex flex-row align-items-center mb-4"
              >
                <label class="col-sm-4 m-auto pe-3">{{ input.label }}</label>
                <div class="col-sm-8 form-outline flex-fill mb-0">
                  <input
                    v-model="input.text"
                    :type="input.type"
                    class="form-control"
                    :placeholder="input.placeholder"
                  />
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
                    type="range"
                    class="form-range"
                    v-model="optionRounds.value"
                    :min="optionRounds.min"
                    :max="optionRounds.max"
                    id="customRange1"
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                キャンセル
              </button>
              <button type="button" class="btn btn-primary">作成</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, toRef, reactive } from 'vue'

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
  public max: number
  public mode: string
  public level: string
  public round: number
  public host: User[]
  public participants: User[]

  constructor(
    name: string,
    password: string,
    max: number,
    mode: string,
    level: string,
    round: number,
    host: User[],
    participants: User[]
  ) {
    this.name = name
    this.password = password
    this.max = max
    this.mode = mode
    this.level = level
    this.round = round
    this.host = host
    this.participants = participants
  }
}

export default defineComponent({
  name: 'Server',
  components: {},
  props: ['user'],
  setup(props) {
    let userInfo = toRef(props, 'user')

    const inputs: {
      text: string
      label: string
      type: string
      placeholder: string
    }[] = [
      {
        text: '',
        label: 'ルーム名',
        type: 'text',
        placeholder: 'ルーム名'
      },
      {
        text: '',
        label: 'パスワード',
        type: 'text',
        placeholder: 'password'
      }
    ]

    const selects: {
      selected: string | number
      options: string[] | number[]
      label: string
    }[] = [
      {
        selected: 2,
        options: [2, 3, 4, 5, 6],
        label: '参加人数'
      },
      {
        selected: '絵当てゲーム',
        options: ['絵当てゲーム', '伝言ゲーム'],
        label: 'モード'
      },
      {
        selected: 'medium',
        options: ['hard', 'medium', 'easy'],
        label: 'レベル'
      }
    ]

    const optionRounds: { value: number; min: number; max: number } = reactive({
      value: 5,
      min: 1,
      max: 10
    })

    let cards = [
      {
        name: 'ルーム1',
        max: 6,
        now: 6,
        link: '/room'
      }
    ]

    // const addRoom = () => {
    //   console.log('addRoom')
    // }

    return {
      userInfo,
      inputs,
      selects,
      cards,
      optionRounds
      // addRoom
    }
  }
})
</script>

<style>
.routerLink {
  text-decoration: none;
  color: #000;
}
</style>
