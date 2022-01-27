import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { RoomHash } from '../interface/roomHash'
import { RoomFactory } from '../model/roomFactory'
import { Room } from '../model/room'

export interface State {
  rooms: Room[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    rooms: []
  },
  mutations: {
    addRoom(state: State, payload: RoomHash): void {
      state.rooms.push(RoomFactory.makeRoom(payload))
    }
  }
})

// 独自の `useStore` 関数を定義します
export function useStore(): Store<State> {
  return baseUseStore(key)
}
