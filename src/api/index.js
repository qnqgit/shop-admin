// 公共接口封装

import request from '@/utils/request'

// 登录
export const login = data => request({
  method: 'post',
  url: '/login',
  data: {
    username: data.username,
    password: data.password
  }
}).then(res => res.data)
