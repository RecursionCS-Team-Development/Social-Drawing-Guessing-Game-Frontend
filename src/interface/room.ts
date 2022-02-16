import { Chat } from './chat'
import { Player } from '@/model/player'

export interface Room {
  name: string
  password: string
  entryNum: number
  level: string
  round: number
  playersHash: Map<string, Player>
  chatLog: Chat[]
  link: string

  getName(): string
  getPassword(): string
  getEntryNum(): number
  getLevel(): string
  getRound(): number
  getPlayersHash(): Map<string, Player>
  getChatLog(): Chat[]
  getLink(): string
}
