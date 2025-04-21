import router from './router'
// import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getItem } from '@/utils/storage'
import store from '@/store'

NProgress.configure({ showSpinner: false })
const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  document.title = to.meta.title || 'Vue Element Admin'

  const token = getItem('token')
  //  如果token存在，则进行登录验证，否则跳转到登录页面
  if (token) {
    // 如果已经登录，则跳转到首页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const roles = getItem('roles')
      // 判断roles 是否存在，如果存在则进行路由跳转，否则进行登录验证
      if (roles) {
        // const routes = store
        const routes = await store.dispatch('routes/getRoutes', roles)
        console.log(routes)
        // 把处理好的路由表动态的添加到 路由配置中
        router.addRoute(routes)
        // console.log(routes)
        next()
        NProgress.done()
      } else {
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
