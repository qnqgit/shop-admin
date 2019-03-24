// 封装的axios方法
import axios from 'axios'
import router from '@/router'

const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

// 请求拦截器
http.interceptors.request.use(function (config) {
  if (config.url !== '/login') {
    config.headers.Authorization = window.localStorage.getItem('token')
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
http.interceptors.response.use(function (response) {
  // 判断状态码 如果状态码等于401 则跳到登录页
  if (response.data.meta.status === 401) {
    router.replace('/login')
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

export default http
