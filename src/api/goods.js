// 商品数据接口

import request from '@/utils/request'

// 获取商品列表
export const getGoodsList = (type) => request({
  method: 'get',
  url: 'categories/',
  data: {
    type: ['cat_id', 'cat_name', 'cat_pid', 'cat_level']
  }
}).then(res => res.data)
