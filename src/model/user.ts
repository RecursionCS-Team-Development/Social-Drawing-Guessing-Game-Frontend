export class User {
  constructor(
    public name: string,
    public mail: string,
    public password: string,
    public id: string,
    public img: string,
    public profile: string,
    public twitterAccount: string,
    public login: boolean
  ) {
    this.name = name
    this.mail = mail
    this.password = password
    this.id = id
    this.img = img
    this.profile = profile
    this.twitterAccount = twitterAccount
    this.login = login
  }
}
