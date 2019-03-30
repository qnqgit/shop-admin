<template>
  <div>
    <!-- 步骤条 -->
    <el-steps :space="200" :active="1" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
     <!-- 侧边导航栏标签 -->
    <el-tabs tab-position="left">
      <el-tab-pane label="基本信息" @tab-click="TabChange">
        <el-form
        :model="FormData"
        ref="FormData"
        class="demo-FormData"
        size="mini">
          <el-form-item label="商品名称">
            <el-input v-model="FormData.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="FormData.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="FormData.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="FormData.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
            :options="goodsCategories"
            v-model="FormData.goods_cat"
            :props="{
              value: 'cat_id',
              label: 'cat_name',
              children: 'children'
            }">
            </el-cascader>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio-group v-model="FormData.is_promote">
              <el-radio label="true">是</el-radio>
              <el-radio label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item align="center">
            <el-button @click="resetForm('FormData')">取消</el-button>
            <el-button type="primary" @click.prevent="add">确定</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数">
        <el-row class="attr-row" v-for="attr in goodsCategoryAttrs" :key="attr.attr_id">
          <el-col :span="2">{{ attr.attr_name }}</el-col>
          <el-col :span="22">
            <el-checkbox-group v-model="attr.attr_selected_vals" size="small">
              <el-checkbox
                :label="val"
                border
                :key="val"
                v-for="val in attr.attr_vals.split(',')"></el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="商品属性">
        <el-form label-width="150px" >
          <el-form-item :label="item.attr_name" v-for="item in goodsCategoryParams" :key="item.attr_id">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容">商品内容</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getGoodsCategoryList } from '@/api/goods-category'
import { addGoods } from '@/api/goods'
// import { getGoodsCategoryAttrs } from '@/api/goods-category-attr'
export default {
  name: 'GoodsAdd',
  data () {
    return {
      FormData: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: [],
        is_promote: ''
      },
      goodsCategories: [], // 所有商品分类列表
      goodsCategoryAttrs: [],
      goodsCategoryParams: []
    }
  },
  created () {
    this.loadGoodsCategories()
  },
  methods: {
    // 加载商品分类
    async loadGoodsCategories () {
      const { data, meta } = await getGoodsCategoryList()
      if (meta.status === 200) {
        this.goodsCategories = data
      }
    },
    // 添加商品分类--提交
    async add () {
      const {
        goods_name,
        goods_cat,
        goods_price,
        goods_number,
        goods_weight } = this.FormData

      const { meta } = await addGoods({
        goods_name,
        goods_cat: goods_cat.join(','),
        goods_price,
        goods_number,
        goods_weight
      })

      if (meta.status === 201) {
        this.$router.replace('/goods')
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      }
    },
    // 标签改变事件
    TabChange (currentTab) {
      console.log(currentTab)
    }
  }
}
</script>

<style scoped>
.el-tabs {
  margin-left: -20px;
  margin-top: 20px;
}
</style>
