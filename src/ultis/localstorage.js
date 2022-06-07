// 用于封装localStorage相关的操作
const TOKEN_KEY = 'token-geek-pc-hk22'

// 把token放到本地存储
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)

// 从本地存储中读取token
export const getToken = () => localStorage.getItem(TOKEN_KEY)

// 判断是否有token,返回布尔值
export const hasToken = () => !!getToken()

// 移除token
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)
