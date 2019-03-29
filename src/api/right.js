// 权限相关列表接口
import request from '@/utils/request'
// 获取权限列表
export const getRightsList = type => request({
  method: 'get',
  url: `rights/${type}`
}).then(res => res.data)

// 获取当前登录用户的权限
export const getRightsMenu = () => request({
  method: 'get',
  url: 'menus'
}).then(res => res.data)
