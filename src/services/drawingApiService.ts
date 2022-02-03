import api from './http_common'

class DrawingApiService {
  protected _auth = 'api/drawing/'

  getRoomsAPI(): Promise<any> {
    console.log('room一覧を取得')
    return api.get(this._auth + 'rooms/')
  }
}

export default new DrawingApiService()
