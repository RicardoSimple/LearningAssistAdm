import { getRoutes } from '@/api/sys'
import { addRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    // 路由表
    routes: []
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = routes
    }
  },
  actions: {
    getRoutes({ commit }, roles) {
      return new Promise((resolve, reject) => {
        getRoutes(roles)
          .then((res) => {
            // 动态渲染路由
            // addRoutes(res.msg)
            const routes = res.msg.filter((item) => !item.hidden)
            // 存入需要动态渲染的路由
            commit('setRoutes', routes)
            resolve(addRoutes(res.msg))
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
