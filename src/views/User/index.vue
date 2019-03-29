<template>
  <div class="content">
    <!-- 操作选项 -->
    <el-row :gutter="20">
      <el-col :span="4">
          <el-input
          placeholder="请输入关键字"
          v-model="searchText"
            @keyup.enter.native="loadUsers(1)">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" @click="addUserForm = true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格组件 -->
    <el-table
      :data="users"
      stripe
      style="width: 100%"
      border
      size="small"
      v-loading="tableLoading">
      <el-table-column
      type="index">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="140"
        align="center">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        align="center">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        align="center">
      </el-table-column>
      <el-table-column label="用户状态" width="100" align="center">
        <template slot-scope="scope">
          <!-- 用户状态开关 -->
          <el-switch
            v-model="scope.row.mg_state"
            @change="ChangeState(scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          size="small"
          @click="$refs.userFormEl.showEditDialog(scope.row)">
          </el-button>
          <!-- 删除按钮 -->
          <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="small"
          @click="Del(scope.row)">
          </el-button>
          <!-- 分类角色按钮 -->
          <el-button
          type="success"
          icon="el-icon-check"
          circle
          size="small"
          @click="$refs.userEditRoleEl.showEditRoleDialog(scope.row)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      @size-change="loadUsers"
      @current-change="loadUsers"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      :pager-count="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 添加弹框 -->
    <el-dialog title="添加用户"
    :visible.sync="addUserForm"
    width="40%" align="center">
      <el-form
      :model="addFormData"
      size="mini"
      ref="addFormEl"
      :rules="addFormRules">
        <el-form-item label="用户名"  prop="username">
          <el-input v-model="addFormData.username" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码"  prop="password">
          <el-input v-model="addFormData.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"  prop="email">
          <el-input v-model="addFormData.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="电话"  prop="mobile">
          <el-input v-model="addFormData.mobile" autocomplete="off" placeholder="请输入电话"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserForm = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 用户编辑 -->
    <UserEdit ref="userFormEl" v-on:edit-success="loadUsers"></UserEdit>
    <!-- 用户角色分配 -->
    <UserEditRole ref="userEditRoleEl"></UserEditRole>
  </div>
</template>

<script>
import * as User from '@/api/user'
import UserEdit from './edit'
import UserEditRole from './edit-role'

export default {
  name: 'UserList',
  async created () {
    this.loadUsers()
  },
  components: {
    UserEdit,
    UserEditRole
  },
  data () {
    return {
      searchText: '',
      users: [],
      // 添加对话框是否显示
      addUserForm: false,
      addFormData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户时表单验证
      addFormRules: {
        username: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ]
      },
      total: 0
    }
  },
  methods: {
    // 加载用户列表
    async loadUsers (page = 1) {
      this.tableLoading = true
      var { data } = await User.getUserList({ pagenum: page, pagesize: 5, query: this.searchText })
      this.users = data.users
      this.total = data.total
      this.tableLoading = false
    },
    // 添加用户
    async add () {
      this.$refs.addFormEl.validate(valid => {
        if (!valid) { // 验证失败，什么都不做
          return
        }
        this.submitAdd() // 验证通过，提交表单
      })
    },
    // 提交
    async submitAdd () {
      const { meta } = await User.addUser(this.addFormData)
      if (meta.status === 201) {
        this.$refs.addFormEl.resetFields() // 清空表单数据
        this.addUserForm = false // 隐藏对话框
        this.loadUsers() // 重新加载用户数据列表
      }
    },
    // 改变用户状态
    async ChangeState (item) {
      const { meta, data } = await User.changeState(item.id, item.mg_state)
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: `${data.mg_state ? '启用' : '禁用'}用户状态成功`
        })
      }
    },
    // 编辑
    edit () {},
    // 删除
    Del (item) {
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { meta } = await User.delUser(item.id)
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 重新加载用户列表
          this.loadUsers()
        }
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}

</script>

<style scoped>
.content {
  height: 100%;
}
/* .box-card {
  height: 100%;
} */
.el-card {
  overflow: visible;
}
.el-table {
  margin-top:10px;
  margin-bottom: 20px;
}
.el-pagination {
  margin-left: -10px;
}
</style>
