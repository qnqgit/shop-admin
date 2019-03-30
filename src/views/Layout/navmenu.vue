<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :router="true"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-submenu
      v-for="first in menus"
      :index="first.path"
      :key="first.id">
      <template slot="title">
        <i class="iconfont icon-jiaoseguanli"></i>
        <span>{{ first.authName }}</span>
      </template>
        <el-menu-item
          v-for="second in first.children"
          :key="second.id"
          :index="`/${second.path}`">
          <template solt="title">
            <i class="iconfont icon-yonghu1"></i>
            <span>{{ second.authName }}</span>
          </template>
        </el-menu-item>
    </el-submenu>
    <!-- <el-submenu index="2">
      <template slot="title">
        <i class="iconfont icon-quanxianguanli"></i>
        <span>权限管理</span>
      </template>
      <template>
        <el-menu-item index="/roles">
          <i class="iconfont icon-yonghu"></i>
          <span>角色列表</span>
        </el-menu-item>
      </template>
      <template>
        <el-menu-item index="/rights">
          <i class="iconfont icon-permissions-list"></i>
          <span>权限列表</span>
        </el-menu-item>
      </template>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="iconfont icon-shangpin-"></i>
        <span>商品管理</span>
      </template>
      <template>
        <el-menu-item index="/goods">
          <i class="iconfont icon-fenlei"></i>
          <span>商品列表</span>
        </el-menu-item>
      </template>
      <template>
        <el-menu-item index="3-2">
          <i class="iconfont icon-shangpinliebiao"></i>
          <span>分类参数</span>
        </el-menu-item>
      </template>
      <template>
        <el-menu-item index="3-3">
          <i class="iconfont icon-shangpinfenlei"></i>
          <span>商品分类</span>
        </el-menu-item>
      </template>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="iconfont icon-dingdan"></i>
        <span>订单管理</span>
      </template>
      <template>
        <el-menu-item index="4-1">
          <i class="iconfont icon-dingdanliebiao"></i>
          <span>订单列表</span>
        </el-menu-item>
      </template>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="iconfont icon-shuju1"></i>
        <span>数据统计</span>
      </template>
      <template>
        <el-menu-item index="5-1">
          <i class="iconfont icon-shuju"></i>
          <span>数据报表</span>
        </el-menu-item>
      </template>
    </el-submenu> -->
  </el-menu>
</template>

<script>
import { getRightsMenu } from '@/api/right'
export default {
  name: 'NavMenu',
  data () {
    return {
      menus: []
    }
  },
  created () {
    this.loadRightsMenu()
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    // 加载左侧菜单列表权限
    async loadRightsMenu () {
      const { data, meta } = await getRightsMenu()
      if (meta.status === 200) {
        this.menus = data
      }
    }
  }
}
</script>

<style scoped>
.el-menu {
  height: 100%;
}
a {
  text-decoration: none;
}
i {
  padding-right: 6px;
}
span {
  font-weight: 700;
}
</style>
