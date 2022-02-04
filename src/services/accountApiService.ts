import api from './http_common'

class AccountApiService {
  protected _auth = 'api/auth/'

  refreshAPI(): Promise<any> {
    return api.post(this._auth + 'refresh/', {})
  }
  loginAPI(email: string, password: string): Promise<any> {
    const data = {
      email,
      password
    }
    return api.post(this._auth + 'login/', data)
  }
  logoutAPI(): Promise<any> {
    return api.post(this._auth + 'logout/', {})
  }
  signupAPI(
    username: string,
    email: string,
    password: string,
    re_password: string
  ): Promise<any> {
    const data = {
      username,
      email,
      password,
      re_password
    }
    return api.post(this._auth + 'users/', data)
  }
  getUserAPI(token: string): Promise<any> {
    return api.get(this._auth + 'user/', {
      headers: {
        Authorization: 'JWT ' + token
      }
    })
  }
}

export default new AccountApiService()
