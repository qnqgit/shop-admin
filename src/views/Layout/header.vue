<template>
  <el-row class="header">
    <!-- logo -->
    <el-col :span="4">
      <img src="./pyg.png" alt="黑马程序员">
    </el-col>
    <!-- 标题 -->
    <el-col :span="16">
      <h2>品优购电商后台管理系统</h2>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" @click="logout" size="small">
        <i class="iconfont icon-tuichu"></i>
        <span>退出</span>
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {}
  },
  methods: {
    logout () {
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清空token值
        window.localStorage.removeItem('token')
        // 跳转到登录页
        this.$router.replace('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  text-align: center;
  font-family: '楷体';
  font-size: 26px;
}
i {
  padding-right: 6px;
}
</style>
