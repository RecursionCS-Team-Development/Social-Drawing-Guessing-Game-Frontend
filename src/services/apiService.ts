import http from './http_common'

class AccountApiService {
  protected _auth = 'api/auth/'

  getApiRoot(): Promise<any> {
    return http.get(this._auth)
  }
  getApiLogin(email: string, password: string): Promise<any> {
    const data = {
      email,
      password
    }
    return http.post(this._auth + 'jwt/create', data)
  }
}

export default new AccountApiService()
