import { getRoutes } from '@/api/sys'
import { addRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    // 路由表
    routes: [],
    dynamicRoutesLoaded: false
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = routes
    },
    setDynamicRoutesLoaded(state, loaded) {
      state.dynamicRoutesLoaded = loaded
    }
  },
  actions: {
    getRoutes({ commit }, roles) {
      return new Promise((resolve, reject) => {
        getRoutes(roles)
          .then((res) => {
            res = res.data
            console.log(res)
            // 动态渲染路由
            // addRoutes(res.msg)
            const routes = res.filter((item) => !item.hidden)
            // 存入需要动态渲染的路由
            commit('setRoutes', routes)
            resolve(addRoutes(res))
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
