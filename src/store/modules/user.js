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
            // 把数据存到 store
            commit('SET_USER_INFO', res.msg)
            commit('SET_TOKEN', res.msg.token)
            commit('SET_ROLES', res.msg.roles)

            // 存到本地
            storage.setItem('userInfo', res.msg)
            storage.setItem('token', res.msg.token)
            storage.setItem('roles', res.msg.roles)
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
