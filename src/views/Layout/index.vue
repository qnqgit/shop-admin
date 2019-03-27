<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <!-- 头部组件 -->
      <AppHeader></AppHeader>
    </el-header>

    <el-container>
      <!-- 侧边导航栏 -->
      <el-aside width="220px">
        <!-- 侧边栏导航组件 -->
        <NavMenu></NavMenu>
      </el-aside>
      <!-- 内容区域 -->
      <el-main>
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
          <!-- 子路由的出口 -->
          <router-view></router-view>

        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 加载头部组件
import AppHeader from './header'
// 加载侧边栏组件
import NavMenu from './navmenu'
export default {
  name: 'Layout',
  data () {
    return {}
  },
  components: {
    AppHeader,
    NavMenu
  }
}
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  padding: 0;
  height: 120px;
  background-color: #ccc;
}
.el-aside {
  height: 100%;
}
.el-card {
  min-height: 100%;
}
</style>
