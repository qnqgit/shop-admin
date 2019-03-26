<template>
  <el-dialog title="编辑用户信息"
  :visible.sync="editUserForm"
  width="40%" align="center">
    <el-form
    :model="editFormData"
    size="mini"
    ref="editFormEl">
      <el-form-item label="用户名"  prop="username" >
        <el-input v-model="editFormData.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱"  prop="email">
        <el-input v-model="editFormData.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话"  prop="mobile">
        <el-input v-model="editFormData.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editUserForm = false">取 消</el-button>
      <el-button type="primary" @click.prevent="edit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getById as getUserById, updateById as updateUserById } from '@/api/user'
export default {
  name: 'UserEdit',
  data () {
    return {
      editUserForm: false,
      editFormData: {
        username: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    // 编辑
    edit () {
      this.submitEdit()
    },
    // 提交编辑
    async submitEdit () {
      const { id, email, mobile } = this.editFormData
      const { meta } = await updateUserById(id, {
        email,
        mobile
      })
      if (meta.status === 200) {
        this.$emit('edit-success')
        this.editUserForm = false
        this.$message({
          type: 'success',
          message: '更新成功'
        })
      }
    },
    // 显示弹框
    async showEditDialog (item) {
      const { data, meta } = await getUserById(item.id)
      if (meta.status === 200) {
        this.editFormData = data
        this.editUserForm = true // 显式弹框
      }
    }
  }
}
</script>

<style scoped>

</style>
