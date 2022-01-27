import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface User {
  name: string
  mail: string
  password: string
  img: string
  profile: string
  twitterAccount: string
  login: boolean
}

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
