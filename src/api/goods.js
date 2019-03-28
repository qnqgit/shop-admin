// 商品数据接口

import request from '@/utils/request'

// 获取商品列表
export const getGoodsList = ({ query = '', pagenum = 1, pagesize = 20 }) => request({
  method: 'get',
  url: 'goods',
  params: {
    query,
    pagenum,
    pagesize
  }
}).then(res => res.data)
