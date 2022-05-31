import request from 'ultis/request'

// 登录请求，主要用于用户登录
export const login = (mobile, code) => {
  return request({
    method: 'post',
    url: '/authorizations',
    data: { mobile, code },
  })
}
