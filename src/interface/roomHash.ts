import { Player } from '../model/player'

export interface RoomHash {
  name: string
  password: string
  entryNum: number
  mode: string
  level: string
  round: number
  playersId: string[]
  link: string
  playersHash: Map<string, Player>
}
