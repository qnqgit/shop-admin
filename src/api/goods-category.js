// 商品分类相关数据接口

import request from '@/utils/request'

export const getGoodsCategoryList = (type = 3) => request({
  method: 'get',
  url: '/categories',
  params: {
    type
  }
}).then(res => res.data)
