import axios from 'axios'

const api = axios.create({
  baseURL: 'https://social-drawing-guessing-game.herokuapp.com/',
  // baseURL: 'http://localhost:8000/',
  withCredentials: true,
  timeout: 5000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-type': 'application/json'
  }
})

//request前処理
api.interceptors.request.use(async (config) => {
  // vuexのuserにaccess tokenがあるか確認
  // 無ければ、refreshAPI()でcookieのrefresh tokenを使用してaccess tokenを発行
  // console.log('Login requestを送信しました')
  // let accessToken = store.getState().user.accessToken;
  // if(!accessToken){
  //   const res: any = await refreshAPI();

  //   store.dispatch(setAccessToken(res.data.access));
  //   if(!res.isSuccess){
  //     return config;
  //   }
  // }
  // accessToken = store.getState().user.accessToken;
  // config.headers = {
  //   ...config.headers,
  //   Authorization: `Bearer ${accessToken}`
  // };
  return config
})

//request後処理
// const _handleResponse = (res: any) => {
//   if(String(res.status).startsWith('20')){
//     res.isSuccess = true;
//   }
//   return true;
// };

// const _handleError = async (error: AxiosError) => {
// if (error.response?.status === 401) {
//   const res = await refreshAPI();
//   store.dispatch(setAccessToken(res.data.access));

//   if(res.status === 200){
//     //retry request
//     return await api.request(error.config);
//   }
//   return error.response;
// }else{
//   // isSuccess = false
//   return error.response;
// }
// }

// api.interceptors.response.use(_handleResponse, _handleAuthError)
api.interceptors.response.use(async (res: any) => {
  // console.log(res.status)
  return res
})

export default api
