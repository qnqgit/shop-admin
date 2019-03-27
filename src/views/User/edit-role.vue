<template>
  <el-dialog title="编辑用户角色" :visible.sync="editUserRoleForm" width="40%">
    <el-form :model="editForm" size="mini" label-position="left" ref="FormEl">
      <el-form-item label="用户名" label-width="80px" prop="username">
        <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色" label-width="80px" prop="email">
        <el-select placeholder="请选择" v-model="editForm.rid">
          <el-option :value="-1" label="请选择"></el-option>
          <el-option v-for="item in roles" :label="item.roleName" :key="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editUserRoleForm = false">取 消</el-button>
      <el-button type="primary" @click.prevent="EditRole">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getById as getUserById, updateUserRoleByUserId } from '@/api/user'
import { getRoleList } from '@/api/role'

export default {
  name: 'UserEditRole',
  data () {
    return {
      editUserRoleForm: false,
      editForm: {
        username: '',
        email: '',
        mibile: '',
        rid: 0
      },
      roles: []
    }
  },
  methods: {

    // 编辑角色
    async EditRole () {
      const { id: userId, rid: roleId } = this.editForm
      const { meta } = await updateUserRoleByUserId(userId, roleId)
      if (meta.status === 200) {
        // 关闭对话框
        this.editUserRoleForm = false
        this.$message({
          type: 'success',
          message: '分配用户角色成功'
        })
      }
    },
    // 显示编辑角色框
    async showEditRoleDialog (item) {
      const { data, meta } = await getUserById(item.id)
      if (meta.status === 200) {
        this.editForm = data
        this.editUserRoleForm = true // 显式弹框
      }
      const { data: roleData, meta: roleMeta } = await getRoleList()
      if (roleMeta.status === 200) {
        this.roles = roleData
      }
    }
  }
}

</script>
