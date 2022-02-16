import { dictionary } from '@/config/dictionary'

export class HitPictureGame {
  protected themeList: string[]
  protected shufflePlayersIdList: string[]
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
  constructor(playersId: string[]) {
    this.themeList = dictionary
    this.shufflePlayersIdList = Array.from(playersId)
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

  public shuffleList(list: string[]): string[] {
    const newThemeList: string[] = []
    while (list.length > 0) {
      const l = list.length
      const random = Math.floor(Math.random() * l)
      newThemeList.push(list[random])
      list.splice(random, 1)
    }
    return newThemeList
  }

  public getShufflePlayersIdList(): string[] {
    return this.shufflePlayersIdList
  }

  public setShufflePlayersIdList(shufflePlayersIdList: string[]): void {
    this.shufflePlayersIdList = shufflePlayersIdList
  }
}

type Phase = 'ready' | 'acting' | 'evaluationWinners' | 'end'
