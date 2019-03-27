// 角色相关接口

import request from '@/utils/request'

// 获取角色列表

export const getRoleList = () => request({
  method: 'get',
  url: '/roles'
}).then(res => res.data)

// 添加角色
export const addRole = ({ roleName, roleDesc }) => request({
  method: 'post',
  url: `roles`,
  data: {
    roleName,
    roleDesc
  }
}).then(res => res.data)

// 删除角色
export const delRole = id => request({
  method: 'delete',
  url: `roles/${id}`
}).then(res => res.data)

// 根据id获取角色列表
export const getRoleById = id => request({
  method: 'get',
  url: `roles/${id}`
}).then(res => res.data)

// 根据id编辑角色
export const editRole = (id, data) => request({
  method: 'put',
  url: `roles/${id}`,
  data: {
    roleName: data.roleName,
    roleDesc: data.roleDesc
  }
}).then(res => res.data)

// 根据id修改角色
// export const updateRoleById = () => request({
//   method: ''
// })
