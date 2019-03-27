<template>
  <div>
    <el-row>
      <el-col :span="4">
      <el-button type="primary" @click="$refs.roleAddEl.showDialog()">添加角色</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="roles"
      stripe
      border
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row class="first" v-for="first in scope.row.children" :key="first.id">
            <!-- 一级 -->
            <el-col :span="4">
              <el-tag closable>{{ first.authName }}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <!-- 二级 -->
            <el-col :span="20">
              <el-row class="second" v-for="second in first.children" :key="second.id">
                <el-col :span="4">
                  <el-tag closable type="success">{{ second.authName }}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>

                <!-- 三级 -->
                <el-col :span="20">
                  <el-tag class="third" v-for="third in second.children" :key="third.id" closable type="warning">{{ third.authName }}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="描述"
        width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="$refs.roleEditEl.showDialog(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="Del(scope.row)">删除</el-button>
            <el-button
            type="success"
            size="mini" @click="showEditRights(scope.row)">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加角色 -->
    <RoleAdd ref="roleAddEl" @add-success="loadRoles"></RoleAdd>
    <!-- 编辑角色 -->
    <RoleEdit ref="roleEditEl" @edit-success="loadRoles"></RoleEdit>
    <!-- 角色授权 -->
    <EditRight ref="roleEditRightsEl"></EditRight>
  </div>
</template>

<script>
import { getRoleList, delRole } from '@/api/role'
import RoleAdd from './add'
import RoleEdit from './edit'
import EditRight from './edit-right'

export default {
  name: 'RoleList',
  data () {
    return {
      roles: []
    }
  },
  components: {
    RoleAdd,
    RoleEdit,
    EditRight

  },
  created () {
    this.loadRoles()
  },
  methods: {
    // 获取角色列表
    async loadRoles () {
      const { data, meta } = await getRoleList()
      if (meta.status === 200) {
        this.roles = data
      }
    },
    // 删除角色
    Del (item) {
      this.$confirm('确认先出吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { meta } = await delRole(item.id)
        if (meta.status === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.loadRoles()
        }
      }).catch((err) => {
        console.log(err)
        this.$message({
          message: '已取消删除',
          type: 'info'
        })
      })
    },
    showEditRights (item) {
      this.$refs.roleEditRightsEl.showDialog(item)
    }
  }
}
</script>

<style scoped>
.el-table {
  margin-top: 15px;
}
.first {
  margin-bottom: 10px;
}
.second, .third{
  margin-bottom: 5px;
}
.third {
  margin-right: 5px;
}
i {
  margin-left: 15px;
}
</style>
