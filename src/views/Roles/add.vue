<template>
  <el-dialog title="添加角色" :visible.sync="addRoleForm" align="center">
    <el-form :model="RoleFormData">
      <el-form-item label="角色名称" label-width="80px">
        <el-input v-model="RoleFormData.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" label-width="80px">
        <el-input v-model="RoleFormData.roleDesc" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addRoleForm = false">取 消</el-button>
      <el-button type="primary" @click.prevent="submitAddRole">确 定</el-button>
    </div>
</el-dialog>
</template>

<script>
import { addRole } from '@/api/role'
export default {
  name: 'RoleAdd',
  data () {
    return {
      addRoleForm: false,
      RoleFormData: {
        roleName: '',
        roleDesc: ''
      }
    }
  },
  methods: {
    // 显示添加角色弹框
    showDialog () {
      this.addRoleForm = true
    },

    // 添加
    async submitAddRole () {
      const { roleName, roleDesc } = this.RoleFormData
      const { meta } = await addRole({ roleName, roleDesc })
      if (meta.status === 201) {
        this.addRoleForm = false
        this.$emit('add-success')
        this.$message({
          message: '添加角色成功',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
