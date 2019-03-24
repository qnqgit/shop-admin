<template>
  <div class="content">
    <!-- 卡片组件 -->
    <el-card class="box-card">
      <!-- 卡片头部 -->
      <div slot="header" class="clearfix">
        <!-- 面包屑组件 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 操作选项 -->
      <el-row :gutter="20">
        <el-col :span="4">
           <el-input
            placeholder="请输入关键字"
            v-model="searchText">
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
        v-loading="tableLoading">
        <el-table-column
        type="index">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话">
        </el-table-column>
      </el-table>
    </el-card>

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
  </div>
</template>

<script>
import { getUserList, addUser } from '@/api/user'

export default {
  name: 'UserList',
  async created () {
    this.loadUsers()
  },
  data () {
    return {
      searchText: '',
      users: [],
      addUserForm: false,
      addFormData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      tableLoading: true,
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
      }
    }
  },
  methods: {
    // 加载用户列表
    async loadUsers () {
      this.tableLoading = true
      var { data } = await getUserList({ pagenum: 1, pagesize: 7 })
      this.users = data.users
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
      const { meta } = await addUser(this.addFormData)
      if (meta.status === 201) {
        this.$refs.addFormEl.resetFields() // 清空表单数据
        this.addUserForm = false // 隐藏对话框
        this.loadUsers() // 重新加载用户数据列表
      }
    }
  }
}
</script>

<style scoped>
.content {
  height: 100%;
}
.box-card {
  height: 100%;
}
.el-table {
  margin-top:10px;
}
</style>
