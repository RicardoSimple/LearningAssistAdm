import axios from 'axios'
import * as storage from '@/utils/storage'
import router from '@/router'
import { Message } from 'element-ui'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 50000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，例如添加 token 到 headers
    if (storage.getItem('token')) {
      config.headers['Authorization'] = 'Bearer ' + storage.getItem('token')
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // return res
    if (res.code !== 200) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 3 * 1000,
        onClose() {
          window.location.reload()
        }
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (err) => {
    // 对响应错误做点什么 401 402 403 404 500
    if (err.response && err.response.status === 401) {
      Message({
        message: '服务未授权，请重新登录' || 'Error',
        type: 'error',
        duration: 3 * 1000,
        onClose() {
          // Message.error('服务未授权，请重新登录')
          storage.removeItem('token')
          router.push('/login')
        }
      })
    } else if (err.response && err.response.status === 403) {
      Message.error('服务禁止访问，请联系管理员')
    } else if (err.response && err.response.status === 404) {
      Message.error('资源访问有误')
    } else {
      Message.error('服务器请求有误')
    }
    return Promise.reject(err)
  }
)

export default service
