import { Player } from './player'

export class HitPictureGame {
  protected themeList: string[]
  protected shufflePlayers: Player[]
  protected currRound: number
  protected currTheme: string
  protected gamePhase: Phase
  protected secTime: number
  protected initialTime: number
  protected readyTime: number
  protected drawTime: number
  protected timerOutId: number
  protected timerCountId: number
  protected ANSWER_SCORE: number
  protected DRAWER_SCORE: number
  constructor() {
    this.themeList = ['りんご', 'いるか', 'じんじゃ', 'ばなな']
    this.shufflePlayers = []
    this.currRound = 1
    this.currTheme = ''
    this.gamePhase = 'ready'
    this.secTime = 0
    this.initialTime = 0
    this.readyTime = 10
    this.drawTime = 20
    this.timerOutId = 0
    this.timerCountId = 0
    this.ANSWER_SCORE = 50
    this.DRAWER_SCORE = 30
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

type Phase = 'ready' | 'acting' | 'evaluationWinners'
