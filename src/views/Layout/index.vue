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
        <!-- 子路由的出口 -->
        <router-view></router-view>
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
</style>
