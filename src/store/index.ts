import { InjectionKey, reactive } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

import { User } from '../model/user'
import { RoomFactory } from '../model/roomFactory'

import { RoomHash } from '../interface/roomHash'

import { HitPictureRoom } from '@/model/hitPictureRoom'

import AccountApiService from '../services/accountApiService'
import DrawingApiService from '../services/drawingApiService'
import { Player } from '@/model/player'

export interface State {
  user: User
  rooms: HitPictureRoom[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    user: {
      name: '',
      mail: '',
      password: '',
      id: '123',
      img: 'https://4.bp.blogspot.com/-bTipX3Vmpts/Wn1ZgUbOHXI/AAAAAAABKM4/b31Jvq8aWssiswuiO19BAJmmAC5WAzXwACLcBGAs/s800/character_boy_normal.png',
      profile: '',
      twitterAccount: '',
      login: false,
      accessToken: ''
    },
    rooms: []
  },
  getters: {
    rooms: function (state): HitPictureRoom[] {
      return state.rooms
    }
  },
  mutations: {
    addRoom(state: State, payload: RoomHash): void {
      state.rooms.push(RoomFactory.makeRoom(payload))
    },
    change(state: State): void {
      state.user.login = !state.user.login
    },
    setAccessToken(state: State, payload: string): void {
      state.user.accessToken = payload
      state.user.login = true
    },
    removeAccessToken(state: State, payload: string): void {
      state.user.accessToken = payload
      state.user.login = false
    },
    setUserInfo(state: State, payload: User): void {
      state.user.name = payload.name
      // state.user.password = payload.password
      state.user.mail = payload.mail
      // state.user.img = payload.img
      state.user.profile = payload.profile
      // state.user.twitterAccount = payload.twitterAccount
    }
  },
  actions: {
    async login({ commit, state }) {
      //cookieのrefresh tokenからAccessTokenを発行
      await AccountApiService.refreshAPI()
        .then((res) => {
          const accessToken = res.data['access']
          commit('setAccessToken', accessToken)
        })
        .catch((error) => {
          // console.log(error.response)
        })

      //loginしているuserの情報を取得
      const accessToken = store.state.user.accessToken
      await AccountApiService.getUserAPI(accessToken)
        .then((res) => {
          // icon = 'https://4.bp.blogspot.com/-bTipX3Vmpts/Wn1ZgUbOHXI/AAAAAAABKM4/b31Jvq8aWssiswuiO19BAJmmAC5WAzXwACLcBGAs/s800/character_boy_normal.png'

          const user = reactive<User>({
            name: res.data.username,
            mail: res.data.email,
            password: '',
            id: '',
            img: res.data.icon,
            profile: res.data.profile,
            twitterAccount: '',
            login: false,
            accessToken: ''
          })

          commit('setUserInfo', user)
        })
        .catch((error) => {
          // console.log(error)
        })
    },
    async logout({ commit, state }) {
      //cookieのrefresh tokenを削除
      await AccountApiService.logoutAPI()
        .then((res) => {
          const payload = ''
          commit('removeAccessToken', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async setRoomInfo({ commit, state }) {
      await DrawingApiService.getRoomsAPI()
        .then((res) => {
          const rooms = res.data.results
          state.rooms = []
          for (const room of rooms) {
            const roomHash = reactive({
              name: room.name,
              password: room.password,
              entryNum: room.entryNum,
              mode: room.mode,
              level: room.level,
              round: room.round,
              players: [],
              link: '/room/' + Number(state.rooms.length + 1),
              playersHash: new Map<string, Player>()
            }) as RoomHash

            for (const member of room.members) {
              const user = reactive({
                name: member.user.username,
                mail: member.user.email,
                password: '',
                id: member.user.id,
                img: 'https://4.bp.blogspot.com/-bTipX3Vmpts/Wn1ZgUbOHXI/AAAAAAABKM4/b31Jvq8aWssiswuiO19BAJmmAC5WAzXwACLcBGAs/s800/character_boy_normal.png',
                profile: '',
                twitterAccount: '',
                login: true,
                accessToken: ''
              }) as User

              roomHash.players.push(new Player(user))
              roomHash.playersHash.set(user.id, new Player(user))
            }

            commit('addRoom', roomHash)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})

// 独自の `useStore` 関数を定義します
export function useStore(): Store<State> {
  return baseUseStore(key)
}
