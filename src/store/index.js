import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 导入所有模块，将模块文件路径和模块名称关联
const modulesFiles = require.context('./modules', true, /\.js$/)

// 通过模块文件路径和模块名称关联的模块对象，初始值为一个空对象
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // 从模块文件路径中提取模块名称
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  // 加载模块对象
  const value = modulesFiles(modulePath)
  // 将模块名称和模块对象关联到模块对象中
  modules[moduleName] = value.default
  // 返回模块对象
  return modules
}, {})

const store = new Vuex.Store({
  modules
})

export default store
