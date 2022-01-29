import { RoomHash } from '../interface/roomHash'
import { Room } from '../model/room'

export class RoomFactory {
  public static makeRoom(room: RoomHash): Room {
    return new Room(
      room.name,
      room.password,
      room.entryNum,
      room.mode,
      room.level,
      room.round,
      room.participants,
      room.link
    )
  }
}
