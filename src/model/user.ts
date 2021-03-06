export class User {
  public name: string
  public mail: string
  public password: string
  public id: string
  public img: string
  public profile: string
  public twitterAccount: string
  public login: boolean
  public accessToken: string

  constructor(
    name: string,
    mail: string,
    password: string,
    id: string,
    img: string,
    profile: string,
    twitterAccount: string,
    login: boolean,
    accessToken: string
  ) {
    this.name = name
    this.mail = mail
    this.password = password
    this.id = id
    this.img = img
    this.profile = profile
    this.twitterAccount = twitterAccount
    this.login = login
    this.accessToken = accessToken
  }
}
