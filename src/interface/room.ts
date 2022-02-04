import { Chat } from './chat'
import { Player } from '@/model/player'

export interface Room {
  name: string
  password: string
  entryNum: number
  level: string
  round: number
  players: Player[]
  chatLog: Chat[]
  link: string

  getName(): string
  getPassword(): string
  getEntryNum(): number
  getLevel(): string
  getRound(): number
  getPlayers(): Player[]
  getChatLog(): Chat[]
  getLink(): string
}
