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
  public playersHash: Map<string, Player>
  public chatLog: Chat[]
  public link: string

  constructor(
    name: string,
    password: string,
    entryNum: number,
    level: string,
    round: number,
    playersHash: Map<string, Player>,
    link: string,
    players: Player[]
  ) {
    super(players)
    this.name = name
    this.password = password
    this.entryNum = entryNum
    this.level = level
    this.round = round
    this.playersHash = playersHash
    this.chatLog = []
    this.link = link
  }

  public clear(fabricClear: () => void): void {
    fabricClear()
  }

  public getName(): string {
    return this.name
  }

  public getPassword(): string {
    return this.password
  }

  public getEntryNum(): number {
    return this.entryNum
  }

  public getLevel(): string {
    return this.level
  }

  public getRound(): number {
    return this.round
  }

  public getPlayersHash(): Map<string, Player> {
    return this.playersHash
  }

  public getChatLog(): Chat[] {
    return this.chatLog
  }

  public getLink(): string {
    return this.link
  }

  public validSetPlayer(): boolean {
    return this.entryNum == this.playersHash.size
  }

  // playersHashからreturn
  public getDrawerPlayer(): Player {
    if (this.currRound > this.shufflePlayersArr.length) {
      return this.playersHash.get(
        this.shufflePlayersArr[
          (this.currRound % this.shufflePlayersArr.length) - 1
        ].id
      ) as Player
    }
    return this.playersHash.get(
      this.shufflePlayersArr[this.currRound - 1].id
    ) as Player
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
        this.shufflePlayersArr.push(player)
        this.playersHash.set(player.id, player)
      } else if (player instanceof User) {
        this.shufflePlayersArr.push(new Player(player))
        this.playersHash.set(player.id, new Player(player))
      } else if (typeof player === 'string') {
        const jsonPlayer: Player = new Player(JSON.parse(player))
        this.shufflePlayersArr.push(jsonPlayer)
        this.playersHash.set(jsonPlayer.id, jsonPlayer)
      } else {
        const playerMold: User = player

        this.shufflePlayersArr.push(new Player(player))
        this.playersHash.set(playerMold.id, new Player(playerMold))
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
    const hiraTheme = this.kanaToHira(this.currTheme)
    if (hiraMessage === hiraTheme && sender.id != this.getDrawerPlayer().id) {
      alert('正解')
      this.isAnswer = true
      this.evaluateHitPicture(sender)
      this.resetTime()
    }

    return false
  }

  public savePicture(): void {
    console.log('絵をセーブ')
  }

  public getPlayerById(id: string): Player {
    return this.playersHash.get(id) as Player
  }

  public evaluateHitPicture(ansPlayer: Player): void {
    ansPlayer.score += this.ANSWER_SCORE
    this.getPlayerById(this.getDrawerPlayer().id).score += this.DRAWER_SCORE
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
        alert(this.displayPlayerName(this.sortScore()))
        this.gamePhase = 'end'
        break
      default:
        return
    }
  }

  public sortScore(): Player[] {
    const clone = Array.from(this.playersHash.values())
    clone.sort((a, b) => {
      if (a.score > b.score) return -1
      if (a.score < b.score) return 1
      return 0
    })
    return clone
  }

  public displayPlayerName(players: Player[]): string {
    let s = ''
    for (let i = 0; i < players.length; i++) {
      s += players[i].name + ': ' + players[i].score + '\n'
    }
    return s
  }

  public shufflePlayer(): void {
    const newThemeList: Player[] = []

    while (this.shufflePlayersArr.length > 0) {
      const l = this.shufflePlayersArr.length
      const random = Math.floor(Math.random() * l)
      newThemeList.push(this.shufflePlayersArr[random])
      this.shufflePlayersArr.splice(random, 1)
    }
    this.shufflePlayersArr = newThemeList
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
      if (this.isAnswer == false) alert('正解は... ' + this.currTheme)
      this.isAnswer = false
      this.savePicture()
      this.getDrawerPlayer().isDrawer = false

      if (this.currRound < this.round) {
        this.timerOutId = setTimeout(() => {
          this.currRound++
          this.phaseAction()
        }, this.poseTime * 1000)
      } else {
        this.gamePhase = 'evaluationWinners'
        this.phaseAction()
      }
    }
  }

  public getPhaseTime(): number {
    return this.gamePhase === 'ready' ? this.readyTime : this.drawTime
  }
}
