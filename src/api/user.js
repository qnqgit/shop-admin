// 用户相关接口数据

import request from '@/utils/request'

// 获取用户列表
export const getUserList = ({ pagenum = 1, pagesize = 7 }) => request({
  method: 'get',
  url: '/users',
  params: {
    pagenum,
    pagesize
  }
}).then(res => res.data)

// 添加用户
export const addUser = ({ username, password, email, mobile }) => request({
  method: 'post',
  url: '/users',
  data: {
    username,
    password,
    email,
    mobile
  }
}).then(res => res.data)
