import http from './http_common'

class AccountApiService {
  protected _auth = 'api/auth/'

  getApiRoot(): Promise<any> {
    return http.get(this._auth)
  }
  login(email: string, password: string): Promise<any> {
    const data = {
      email,
      password
    }
    return http.post(this._auth + 'jwt/create', data)
  }
  getUser(token: string): Promise<any> {
    return http.get(this._auth + 'user', {
      headers: {
        Authorization: 'JWT ' + token
      }
    })
  }
}

export default new AccountApiService()
