import { Chat } from '../interface/chat'
import { Player } from '../model/player'

export class Room {
  private name: string
  private password: string
  private entryNum: number
  private mode: string
  private level: string
  private round: number
  private participants: Player[]
  private chatLog: Chat[]
  private link: string

  constructor(
    name: string,
    password: string,
    entryNum: number,
    mode: string,
    level: string,
    round: number,
    participants: Player[],
    link: string
  ) {
    this.name = name
    this.password = password
    this.entryNum = entryNum
    this.mode = mode
    this.level = level
    this.round = round
    this.participants = participants
    this.chatLog = []
    this.link = link
  }

  public setName(name: string): void {
    this.name = name
  }

  public getName(): string {
    return this.name
  }

  public setPassword(password: string): void {
    this.password = password
  }

  public getPassword(): string {
    return this.password
  }

  public setEntryNum(entryNum: number): void {
    this.entryNum = entryNum
  }

  public getEntryNum(): number {
    return this.entryNum
  }

  public setMode(mode: string): void {
    this.mode = mode
  }

  public getMode(): string {
    return this.mode
  }

  public setLevel(level: string): void {
    this.level = level
  }

  public getLevel(): string {
    return this.level
  }

  public setRound(round: number): void {
    this.round = round
  }

  public getRound(): number {
    return this.round
  }

  public setParticipants(participants: Player[]): void {
    this.participants = participants
  }

  public getParticipants(): Player[] {
    return this.participants
  }

  public setChatLog(chatLog: Chat[]): void {
    this.chatLog = chatLog
  }

  public getChatLog(): Chat[] {
    return this.chatLog
  }

  public setLink(link: string): void {
    this.link = link
  }

  public getLink(): string {
    return this.link
  }

  public addPlayer(player: Player): void {
    this.participants.push(player)
  }
}
