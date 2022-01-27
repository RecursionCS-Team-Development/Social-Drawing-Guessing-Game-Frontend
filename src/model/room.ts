import { User } from '../interface/user'

export class Room {
  private name: string
  private password: string
  private entryNum: number
  private mode: string
  private level: string
  private round: number
  private participants: User[]
  private link: string

  constructor(
    name: string,
    password: string,
    entryNum: number,
    mode: string,
    level: string,
    round: number,
    participants: User[],
    link: string
  ) {
    this.name = name
    this.password = password
    this.entryNum = entryNum
    this.mode = mode
    this.level = level
    this.round = round
    this.participants = participants
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

  public setParticipants(participants: User[]): void {
    this.participants = participants
  }

  public getParticipants(): User[] {
    return this.participants
  }

  public setLink(link: string): void {
    this.link = link
  }

  public getLink(): string {
    return this.link
  }

  public addUser(user: User): void {
    this.participants.push(user)
  }
}
