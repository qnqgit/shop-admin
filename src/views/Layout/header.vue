<template>
  <el-row class="header">
    <!-- logo -->
    <el-col :span="4">
      <img src="./pyg.png" alt="黑马程序员">
    </el-col>
    <!-- 标题 -->
    <el-col :span="16">
      <h2>品优购电商管理后台</h2>
    </el-col>
    <el-col :span="4">
      <a href="#">
        <i class="iconfont icon-tuichu"></i>
        <span>退出</span>
      </a>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {}
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
a {
  text-decoration: none;
  color: #444;
}
a:hover {
  color: red;
}
i {
  padding-right: 6px;
}
span {
  font-weight: 700;
  font-size: 18px;
}
</style>
