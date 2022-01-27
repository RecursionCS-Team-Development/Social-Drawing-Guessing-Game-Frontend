import { User } from '../interface/user'

export interface RoomHash {
  name: string
  password: string
  entryNum: number
  mode: string
  level: string
  round: number
  participants: User[]
  link: string
}
