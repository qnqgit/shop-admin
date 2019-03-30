<template>
  <div>
    <!-- 搜索、添加操作 -->
    <el-row :gutter="20">
      <el-col :span="4">
          <el-input
          placeholder="请输入关键字"
          v-model="searchText"
            @keyup.enter.native="loadGoods(1)">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" @click="$router.push('/toadd')">添加商品</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="goods"
      stripe
      border
      style="width: 100%">
      <el-table-column type="index" label="编号" width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        label="商品状态"
        width="100"
        align="center">
        <template slot-scope="scope">
          {{ ['未通过', '审核中', '已通过'][scope.row.goods_state] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="goods_number"
        label="商品数量"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="创建时间"
        width="160"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template>
          <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      @size-change="loadGoods"
      @current-change="loadGoods"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      :pager-count="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="goodsTotal">
    </el-pagination>
  </div>
</template>

<script>
import { getGoodsList } from '@/api/goods'
import dayjs from 'dayjs'
export default {
  name: 'GoodsList',
  data () {
    return {
      goods: [],
      searchText: '',
      goodsTotal: 0,
      page: 1
    }
  },
  created () {
    this.loadGoods(1)
  },
  methods: {
    async loadGoods (page = 1) {
      const { data, meta } = await getGoodsList({ pagenum: page, query: this.searchText })
      if (meta.status === 200) {
        this.goods = data.goods
        this.goods.forEach(item => {
          item.add_time = dayjs(item.add_time).format('YYYY-MM-DD HH:mm:ss')
        })
        this.goodsTotal = data.total
      }
    }
  }
}
</script>

<style scoped>

</style>
