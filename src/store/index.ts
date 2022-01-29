import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

import { User } from '../model/user'

import { RoomHash } from '../interface/roomHash'
import { RoomFactory } from '../model/roomFactory'
import { Room } from '../model/room'

export interface State {
  user: User
  rooms: Room[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    user: {
      name: 'ユーザー1',
      mail: '@gmail.com',
      password: '12345678',
      img: 'https://4.bp.blogspot.com/-bTipX3Vmpts/Wn1ZgUbOHXI/AAAAAAABKM4/b31Jvq8aWssiswuiO19BAJmmAC5WAzXwACLcBGAs/s800/character_boy_normal.png',
      profile: 'よろしくお願いします',
      twitterAccount: '',
      login: false
    },
    rooms: []
  },
  mutations: {
    addRoom(state: State, payload: RoomHash): void {
      state.rooms.push(RoomFactory.makeRoom(payload))
    },
    change(state: State): void {
      state.user.login = !state.user.login
    }
  }
})

// 独自の `useStore` 関数を定義します
export function useStore(): Store<State> {
  return baseUseStore(key)
}
