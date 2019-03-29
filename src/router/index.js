import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import UserList from '@/views/User'
import RightList from '@/views/Rights'
import RoleList from '@/views/Roles'
import GoodsList from '@/views/Goods'
import GoodsAdd from '@/views/Goods/add'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      children: [
        { path: '', component: Home },
        { path: '/users', component: UserList },
        { path: '/rights', component: RightList },
        { path: '/roles', component: RoleList },
        { path: '/goods', component: GoodsList },
        { path: '/toadd', component: GoodsAdd }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }

  const token = window.localStorage.getItem('token')

  if (!token) {
    return next('/login')
  }

  next()
})

export default router
