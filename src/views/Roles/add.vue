<template>
  <el-dialog title="添加角色" :visible.sync="addRoleForm" align="center">
    <el-form
    :model="RoleFormData"
    :rules="addFormRole"
    ref="addFormEl"
    size="mini">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="RoleFormData.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="RoleFormData.roleDesc" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addRoleForm = false">取 消</el-button>
      <el-button type="primary" @click.prevent="add">确 定</el-button>
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
      },
      // 添加角色时表单验证
      addFormRole: {
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
    // 显示添加角色弹框
    showDialog () {
      this.addRoleForm = true
    },
    // 添加用户
    add () {
      this.$refs.addFormEl.validate(valid => {
        if (!valid) { // 验证失败，什么都不做
          return
        }
        this.submitAddRole() // 验证通过，提交表单
      })
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
