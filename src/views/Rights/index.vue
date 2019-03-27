<template>
<div>
  <el-table
    :data="rights"
    stripe
    border
    style="width: 100%">
    <el-table-column type="index">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径"
      width="180">
    </el-table-column>
    <el-table-column
      label="层级">
      <template slot-scope="scope">
        {{ ['一级', '二级', '三级'][scope.row.level] }}
      </template>
    </el-table-column>
  </el-table>
</div>

</template>

<script>
import { getRightsList } from '@/api/right'
export default {
  name: 'RightList',
  data () {
    return {
      rights: []
    }
  },
  created () {
    this.loadRights()
  },
  methods: {
    // 获取权限列表
    async loadRights () {
      const { data, meta } = await getRightsList('list')
      if (meta.status === 200) {
        this.rights = data
      }
    }
  }
}
</script>

<style scoped>

</style>
