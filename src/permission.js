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
  document.title = to.meta.title || '智能学习助手后台'

  const token = getItem('token')

  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const roles = getItem('roles')

      if (roles) {
        if (!store.state.routes.dynamicRoutesLoaded) {
          const accessedRoutes = await store.dispatch('routes/getRoutes', roles)
          accessedRoutes.forEach(route => {
            router.addRoute(route)
          })
          store.commit('routes/setDynamicRoutesLoaded', true)
          next({ ...to, replace: true }) // ⚠️ 让新路由生效
        } else {
          next()
        }
      } else {
        next(`/login?redirect=${to.path}`)
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
  NProgress.done()
})
