import { Player } from './player'
import { dictionary } from '@/config/dictionary'

export class HitPictureGame {
  protected themeList: string[]
  protected shufflePlayers: Player[]
  protected currRound: number
  protected currTheme: string
  protected gamePhase: Phase
  protected isAnswer: boolean
  protected secTime: number
  protected initialTime: number
  protected readyTime: number
  protected drawTime: number
  protected poseTime: number
  protected timerOutId: number
  protected timerCountId: number
  protected ANSWER_SCORE: number
  protected DRAWER_SCORE: number
  constructor(players: Player[]) {
    this.themeList = dictionary
    this.shufflePlayers = Array.from(players)
    this.currRound = 1
    this.currTheme = ''
    this.gamePhase = 'ready'
    this.isAnswer = false
    this.secTime = 0
    this.initialTime = 0
    this.readyTime = 10
    this.drawTime = 10
    this.poseTime = 5
    this.timerOutId = 0
    this.timerCountId = 0
    this.ANSWER_SCORE = 50
    this.DRAWER_SCORE = 30
  }

  public getGamePhase(): string {
    return this.gamePhase
  }

  public getSecTime(): number {
    return this.secTime
  }

  public getCurrTheme(): string {
    return this.currTheme
  }

  public getCurrRound(): number {
    return this.currRound
  }

  public shuffleThemeList(): void {
    const newThemeList: string[] = []
    while (this.themeList.length > 0) {
      const l = this.themeList.length
      const random = Math.floor(Math.random() * l)
      newThemeList.push(this.themeList[random])
      this.themeList.splice(random, 1)
    }
    this.themeList = newThemeList
  }

  public getShufflePlayers(): Player[] {
    return this.shufflePlayers
  }
}

type Phase = 'ready' | 'acting' | 'evaluationWinners' | 'end'
