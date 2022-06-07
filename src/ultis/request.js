import { message } from 'antd'
import axios from 'axios'
import { hasToken, getToken, removeToken } from './localstorage'
import history from 'ultis/history'
// 创建axios实例
const instance = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000,
})

//配置拦截器
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 为了获取用户信息 在发送请求之前要在设置的请求头加上token
    if (hasToken()) {
      // 如果有token，就在token前加上bear
      config.headers.Authorization = 'Bearer ' + getToken()
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 对响应错误做点什么
    console.log('error', error)
    if (error.response.status === 401) {
      // this path means the token is expired and we need to:
      // 1.remove token
      removeToken()
      // 2.show message 'request failed with status code 401'
      message.warning('Token 错误')
      //3. jump to login
      history.push('/login')
    }
    return Promise.reject(error)
  }
)

export default instance
