import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss' // global css
import '@/plugins/ElementUI.js'
import './permission.js'
import './filters/dateFmt'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
