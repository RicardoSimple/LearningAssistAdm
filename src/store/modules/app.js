export default {
  namespaced: true,
  state: {
    isCollapse: false // 侧边栏是否折叠
  },
  mutations: {
    TOGGLE_SIDEBAR(state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {
    //
  },
  getters: {
    //
  }
}
