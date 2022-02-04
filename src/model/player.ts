import { User } from '../model/user'

export class Player extends User {
  public score: number
  public isDrawer: boolean
  constructor(user: User) {
    super(
      user.name,
      user.mail,
      user.password,
      user.id,
      user.img,
      user.profile,
      user.twitterAccount,
      user.login,
      user.accessToken
    )
    this.score = 0
    this.isDrawer = false
  }
}
