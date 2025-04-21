import { login } from '@/api/users'
import * as storage from '@/utils/storage'
export default {
  namespaced: true,
  state: {
    userInfo: storage.getItem('userInfo'),
    token: storage.getItem('token'),
    roles: storage.getItem('roles')
  },
  mutations: {
    //
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_ROLES(state, roles) {
      state.roles = roles
    }
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login({
          username: userInfo.username.trim(),
          password: userInfo.password.trim()
        })
          .then((res) => {
            res = res.data
            // 把数据存到 store
            const tokeninfo = res.token_info
            console.log(res)
            commit('SET_USER_INFO', tokeninfo)
            commit('SET_TOKEN', tokeninfo.token)
            commit('SET_ROLES', tokeninfo.userType)

            // 存到本地
            storage.setItem('userInfo', tokeninfo)
            storage.setItem('token', tokeninfo.token)
            storage.setItem('roles', tokeninfo.user_type)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_USER_INFO', '')
        commit('SET_TOKEN', '')
        commit('SET_ROLES', '')
        storage.removeItem('userInfo')
        storage.removeItem('token')
        resolve()
      })
    }
  },
  getters: {
    //
  }
}
