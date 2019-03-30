// 商品数据接口

import request from '@/utils/request'

// 获取商品列表
export const getGoodsList = ({ query = '', pagenum = 1, pagesize = 20 }) => request({
  method: 'get',
  url: '/goods',
  params: {
    query,
    pagenum,
    pagesize
  }
}).then(res => res.data)

// 添加商品分类
export const addGoods = ({ goods_name, goods_cat, goods_price, goods_number, goods_weight, attrs = [] }) => request({
  method: 'post',
  url: '/goods',
  data: {
    goods_name,
    goods_cat,
    goods_price,
    goods_number,
    goods_weight,
    attrs
  }
}).then(res => res.data)
