import { RoomHash } from '../interface/roomHash'
import { HitPictureRoom } from './hitPictureRoom'

export class RoomFactory {
  public static makeRoom(room: RoomHash): HitPictureRoom {
    if (room.mode === '絵当てゲーム') {
      return new HitPictureRoom(
        room.name,
        room.password,
        room.entryNum,
        room.level,
        room.round,
        room.players,
        room.link
      )
    }
    return new HitPictureRoom(
      room.name,
      room.password,
      room.entryNum,
      room.level,
      room.round,
      room.players,
      room.link
    )
  }
}
