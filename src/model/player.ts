import { User } from '../model/user'

export class Player extends User {
  public score: number
  public isHost: boolean
  constructor(user: User, isHost: boolean) {
    super(
      user.name,
      user.mail,
      user.password,
      user.img,
      user.profile,
      user.twitterAccount,
      user.login
    )
    this.score = 0
    this.isHost = isHost
  }
}
