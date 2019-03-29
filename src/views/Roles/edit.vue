<template>
  <el-dialog title="编辑角色" :visible.sync="editRoleForm" align="center">
    <el-form
    :model="RoleFormData"
    size="mini"
    :rules="editFormRole"
    ref="editFormEl">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="RoleFormData.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="RoleFormData.roleDesc" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editRoleForm = false">取 消</el-button>
      <el-button type="primary" @click.prevent="edit">确 定</el-button>
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
      },
      // 编辑角色--表单验证
      editFormRole: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
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
    edit () {
      this.$refs.editFormEl.validate(valid => {
        if (!valid) { // 验证失败，什么都不做
          return
        }
        this.submitedit() // 验证通过，提交表单
      })
    },
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
