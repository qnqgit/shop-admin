<template>
  <el-dialog title="编辑角色" :visible.sync="editRoleForm" align="center">
    <el-form :model="RoleFormData">
      <el-form-item label="角色名称" label-width="80px">
        <el-input v-model="RoleFormData.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" label-width="80px">
        <el-input v-model="RoleFormData.roleDesc" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editRoleForm = false">取 消</el-button>
      <el-button type="primary" @click.prevent="submitEdit">确 定</el-button>
    </div>
</el-dialog>
</template>

<script>
import { getRoleById, editRole } from '@/api/role'
export default {
  name: 'RoleEdit',
  data () {
    return {
      editRoleForm: false,
      RoleFormData: {
        roleName: '',
        roleDesc: ''
      }
    }
  },
  methods: {
    // 显示编辑弹框
    async showDialog (item) {
      this.editRoleForm = true
      const { data, meta } = await getRoleById(item.id)
      if (meta.status === 200) {
        this.RoleFormData = data
      }
    },
    // 编辑
    // 提交编辑
    async submitEdit () {
      const { roleId, roleName, roleDesc } = this.RoleFormData
      const { meta } = await editRole(roleId, {
        roleName,
        roleDesc
      })
      if (meta.status === 200) {
        this.$emit('edit-success')
        this.editRoleForm = false
        this.$message({
          type: 'success',
          message: '更新成功'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
