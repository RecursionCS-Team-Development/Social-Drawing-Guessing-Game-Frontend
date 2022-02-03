import { HitPictureGame } from './hitPictureGame'

export class GameFactory {
  public static makeGame(mode: string): HitPictureGame | undefined {
    let gameMode = undefined
    if (mode === '絵当てゲーム') gameMode = new HitPictureGame()

    return gameMode
  }
}
