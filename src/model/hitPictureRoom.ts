import { Chat } from '../interface/chat'
import { Player } from './player'
import { User } from './user'
import { HitPictureGame } from './hitPictureGame'
import { Room } from '../interface/room'
import { SendChatData } from '@/type/sendChatData'

export class HitPictureRoom extends HitPictureGame implements Room {
  public name: string
  public password: string
  public entryNum: number
  public level: string
  public round: number
  public players: Player[]
  public chatLog: Chat[]
  public link: string

  constructor(
    name: string,
    password: string,
    entryNum: number,
    level: string,
    round: number,
    players: Player[],
    link: string
  ) {
    super()
    this.name = name
    this.password = password
    this.entryNum = entryNum
    this.level = level
    this.round = round
    this.players = players
    this.chatLog = []
    this.link = link
  }

  public clear(fabricClear: () => void): void {
    fabricClear()
  }
  // public setName(name: string): void {
  //   this.name = name
  // }

  public getName(): string {
    return this.name
  }

  // public setPassword(password: string): void {
  //   this.password = password
  // }

  public getPassword(): string {
    return this.password
  }

  // public setEntryNum(entryNum: number): void {
  //   this.entryNum = entryNum
  // }

  public getEntryNum(): number {
    return this.entryNum
  }

  // public setMode(mode: string): void {
  //   this.mode = mode
  // }

  // public getGameMode(): GameFactory | undefined {
  //   return this.gameMode
  // }

  // public setLevel(level: string): void {
  //   this.level = level
  // }

  public getLevel(): string {
    return this.level
  }

  // public setRound(round: number): void {
  //   this.round = round
  // }

  public getRound(): number {
    return this.round
  }

  // public setplayers(players: Player[]): void {
  //   this.players = players
  // }

  public getPlayers(): Player[] {
    return this.players
  }

  // public setChatLog(chatLog: Chat[]): void {
  //   this.chatLog = chatLog
  // }

  public getChatLog(): Chat[] {
    return this.chatLog
  }

  // public setLink(link: string): void {
  //   this.link = link
  // }

  public getLink(): string {
    return this.link
  }

  public validSetPlayer(): boolean {
    return this.entryNum == this.players.length
  }

  public getDrawerPlayer(): Player {
    if (this.currRound > this.shufflePlayers.length) {
      return this.shufflePlayers[
        (this.currRound % this.shufflePlayers.length) - 1
      ]
    }
    this.shufflePlayers.length
    return this.shufflePlayers[this.currRound - 1]
  }

  public getTheme(): string {
    if (this.currRound > this.themeList.length) {
      return this.themeList[(this.themeList.length % this.currRound) - 1]
    }
    return this.themeList[this.currRound - 1]
  }

  public addPlayer(player: Player | User | string): void {
    if (!this.validSetPlayer()) {
      if (player instanceof Player) {
        this.players.push(player)
      } else if (player instanceof User) {
        this.players.push(new Player(player))
      } else {
        const jsonPlayer: Player = new Player(JSON.parse(player))
        this.players.push(jsonPlayer)
      }

      if (this.validSetPlayer()) {
        this.shufflePlayer()
        this.shuffleThemeList()
        this.gameStart()
      }
    }
  }

  public addChat(dataFromDjango: SendChatData): void {
    const chat = {
      playerName: dataFromDjango.playerName,
      playerImg: dataFromDjango.playerImg,
      playerId: dataFromDjango.playerId,
      message: dataFromDjango.message,
      postTime: new Date()
    } as Chat
    this.chatLog.push(chat)
    this.validChatEqTheme(chat.playerId, chat.message)
  }

  public validChatEqTheme(id: string, message: string): boolean {
    const sender: Player = this.getPlayerById(id)
    const hiraMessage = this.kanaToHira(message)
    if (hiraMessage === this.currTheme && sender != this.getDrawerPlayer()) {
      alert('正解')
      this.evaluateHitPicture(this.getPlayerById(id))
      this.resetTime()
    }

    return false
  }
  public savePicture(): void {
    console.log('絵をセーブ')
  }

  public getPlayerById(id: string): Player {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id === id) return this.players[i]
    }

    return this.players[0]
  }

  public evaluateHitPicture(ansPlayer: Player): void {
    ansPlayer.score += this.ANSWER_SCORE
    this.getDrawerPlayer().score += this.DRAWER_SCORE
  }

  public kanaToHira(str: string): string {
    return str.replace(/[\u30a1-\u30f6]/g, function (match) {
      const chr = match.charCodeAt(0) - 0x60
      return String.fromCharCode(chr)
    })
  }

  public phaseAction(player?: Player | User | string): void {
    switch (this.gamePhase) {
      case 'ready':
        if (player) this.addPlayer(player)
        break
      case 'acting':
        // this.clear()
        this.getDrawerPlayer().isDrawer = true
        this.currTheme = this.getTheme()
        this.gameStart()
        break
      case 'evaluationWinners':
      default:
        return
    }
  }

  public shufflePlayer(): void {
    const tempPlayers: Player[] = Array.from(this.players)
    const newThemeList: Player[] = []

    while (tempPlayers.length > 0) {
      const l = tempPlayers.length
      const random = Math.floor(Math.random() * l)
      newThemeList.push(tempPlayers[random])
      tempPlayers.splice(random, 1)
    }
    this.shufflePlayers = newThemeList
  }

  public gameStart(): void {
    this.startTime()
  }

  public startTime(): void {
    this.secTime = this.getPhaseTime()
    this.countDown()

    this.timerOutId = setTimeout(() => {
      this.resetTime()
    }, this.secTime * 1000)
  }

  public countDown(): void {
    this.timerCountId = setInterval(() => this.secTime--, 1000)
  }

  public stopTime(): void {
    clearTimeout(this.timerOutId)
    clearTimeout(this.timerCountId)
    this.secTime = this.initialTime
  }

  public resetTime(): void {
    this.stopTime()

    if (this.gamePhase === 'ready') {
      this.gamePhase = 'acting'
      this.phaseAction()
    } else if (this.gamePhase === 'acting') {
      this.savePicture()
      this.getDrawerPlayer().isDrawer = false

      if (this.currRound < this.round) {
        this.currRound++
        this.phaseAction()
      } else {
        this.gamePhase = 'evaluationWinners'
      }
    }
  }

  public getPhaseTime(): number {
    return this.gamePhase === 'ready' ? this.readyTime : this.drawTime
  }
}
