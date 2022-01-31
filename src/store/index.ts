import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

import { User } from '../model/user'

import { RoomHash } from '../interface/roomHash'
import { RoomFactory } from '../model/roomFactory'
import { Room } from '../model/room'

import AccountApiService from '../services/apiService'

export interface State {
  user: User
  rooms: Room[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    user: {
      name: 'ユーザー2',
      mail: '@gmail.com',
      password: '12345678',
      img: 'https://4.bp.blogspot.com/-bTipX3Vmpts/Wn1ZgUbOHXI/AAAAAAABKM4/b31Jvq8aWssiswuiO19BAJmmAC5WAzXwACLcBGAs/s800/character_boy_normal.png',
      profile: 'よろしくお願いします。よろしくお願いします。',
      twitterAccount: '',
      login: false,
      accessToken: ''
    },
    rooms: []
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
      // console.log("Success set Access token !!!")
    },
    removeAccessToken(state: State, payload: string): void {
      state.user.accessToken = payload
      state.user.login = false
      // console.log("Success remove Access token !!!")
    }
  },
  actions: {
    async login({ commit, state }) {
      //cookieのrefresh tokenからAccessTokenを発行
      try {
        const res = await AccountApiService.refreshAPI()
        const payload = res.data['access']
        commit('setAccessToken', payload)
      } catch (error) {
        console.log(error)
      }
    },
    async logout({ commit, state }) {
      //cookieのrefresh tokenを削除
      try {
        const res = await AccountApiService.logoutAPI()
        const payload = ''
        commit('removeAccessToken', payload)
      } catch (error) {
        console.log(error)
      }
    }
  }
})

// 独自の `useStore` 関数を定義します
export function useStore(): Store<State> {
  return baseUseStore(key)
}
