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

// 改变用户状态
export const changeState = (id, state) => request({
  method: 'put',
  url: `users/${id}/state/${state}`
}).then(res => res.data)

// 根据id删除用户
export const delUser = id => request({
  method: 'delete',
  url: `/users/${id}`
}).then(res => res.data)

// 根据id查询用户信息
export const getById = id => request({
  method: 'get',
  url: `users/${id}`
}).then(res => res.data)

// 根据id编辑用户信息
export const updateById = (id, data) => request({
  method: 'put',
  url: `users/${id}`,
  data: {
    email: data.email,
    mobile: data.mobile
  }
}).then(res => res.data)
