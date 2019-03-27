// 权限相关列表接口
import request from '@/utils/request'
// 获取权限列表
export const getRightsList = type => request({
  method: 'get',
  url: `rights/${type}`
}).then(res => res.data)
