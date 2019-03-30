import request from '@/utils/request'

// 商品分gte类参数相关接口
export const getGoodsCategoryAttrs = (catId, sel = 'only') => request({
  method: 'get',
  url: `/categories/${catId}/attributes`,
  params: {
    sel
  }
}).then(res => res.data)
