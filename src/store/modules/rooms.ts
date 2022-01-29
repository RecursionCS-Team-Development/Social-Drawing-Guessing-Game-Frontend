import { RoomHash } from '../../interface/roomHash'
import { RoomFactory } from '../../model/roomFactory'
import { Room } from '../../model/room'

export interface State {
  rooms: Room[]
}

export const roomsStore = {
  state: {
    rooms: []
  },
  mutations: {
    addRoom(state: State, payload: RoomHash): void {
      state.rooms.push(RoomFactory.makeRoom(payload))
    }
  }
}
