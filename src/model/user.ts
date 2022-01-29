export class User {
  public name: string
  public mail: string
  public password: string
  public img: string
  public profile: string
  public twitterAccount: string
  public login: boolean
  constructor(
    name: string,
    mail: string,
    password: string,
    img: string,
    profile: string,
    twitterAccount: string,
    login: boolean
  ) {
    this.name = name
    this.mail = mail
    this.password = password
    this.img = img
    this.profile = profile
    this.twitterAccount = twitterAccount
    this.login = login
  }
}
