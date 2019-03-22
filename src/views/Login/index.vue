<template>
  <div class="login-wrap">
    <div class="login-container">
      <el-form label-position="top" :rules="loginFormRules" label-width="80px" :model="loginForm" ref="loginFormEl">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click.prevent="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      this.$refs.loginFormEl.validate(valid => {
        if (valid) {
          this.login()
        } else {
          return false
        }
      })
    },
    async login () {
      const resData = await axios.post('http://localhost:8888/api/private/v1/login', this.loginForm)
      const { meta } = resData.data
      if (meta.status === 200) {
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        this.$router.replace('/')
      } else {
        console.log(resData)
        this.$message.error(`登陆失败: ${meta.msg}`)
      }
    }
  }
}
</script>

<style scoped>
.login-wrap {
  height: 100%;
  background-color: #2f4050;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  width: 500px;
  height: 300px;
  padding: 50px;
  background-color: #fff;
  border-radius: 10px;
}

.login-btn {
  width: 100%;
}
</style>
