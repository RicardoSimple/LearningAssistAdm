import Vue from 'vue'
import VueRouter from 'vue-router'
// import layout from '@/layout/index.vue'

Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     component: layout,
//     redirect: '/dashboard',
//     children: [
//       {
//         path: 'dashboard',
//         component: () => import('@/views/dashboard/index'),
//         name: 'Dashboard',
//         meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
//       }
//     ]
//   },
//   {
//     path: '/profile',
//     component: layout,
//     redirect: '/profile/index',
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/profile/index'),
//         name: 'profile',
//         meta: { title: 'profile', icon: 'profile', affix: true }
//       }
//     ]
//   },
//   {
//     path: '/user',
//     component: layout,
//     redirect: '/user/list',
//     children: [
//       {
//         path: '/user/list',
//         component: () => import('@/views/user/list'),
//         name: 'UserList',
//         meta: {
//           title: 'User List',
//           roles: ['admin'] // 只有管理员可访问
//         }
//       },
//       {
//         path: '/user/create-edit',
//         component: () => import('@/views/user/create-edit'),
//         name: 'UserCreateEdit',
//         meta: {
//           title: 'Create User',
//           roles: ['admin'] // 只有管理员可访问
//         }
//       }
//     ]
//   },
//   {
//     path: '/login',
//     component: () => import('@/views/login/index'),
//     hidden: true
//   },
//   {
//     path: '/404',
//     component: () => import('@/views/404'),
//     hidden: true
//   },
//   // ... 可能还有其他路由配置，比如404页面等
//   {
//     path: '*',
//     redirect: '/404',
//     hidden: true
//   }
// ]

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  }
]
const router = new VueRouter({
  routes
})

// 处理后端返回过来的数据
export function addRoutes(routes) {
  return routes.map((route) => {
    // 递归处理子路由
    if (route.children && route.children !== '') {
      route.children = addRoutes(route.children)
    }

    // 修改 component 字段
    if (
      typeof route.component === 'string'
    ) {
      if (typeof route.component === 'string' &&
        route.component.startsWith('views/dashboard')) {
        route.component = () => import('@/views/dashboard/index.vue')
      }
      if (typeof route.component === 'string' &&
        route.component.startsWith('views/users')) {
        route.component = () => import('@/views/users/index.vue')
      }
      if (typeof route.component === 'string' &&
        route.component.startsWith('views/login')) {
        route.component = () => import('@/views/login/index.vue')
      }
      if (typeof route.component === 'string' &&
        route.component.startsWith('views/course')) {
        route.component = () => import('@/views/course/index.vue')
      }
      if (typeof route.component === 'string' &&
        route.component.startsWith('views/classes')) {
        route.component = () => import('@/views/classes/index.vue')
      }
      if (typeof route.component === 'string' &&
        route.component.startsWith('views/404')) {
        route.component = () => import('@/views/404/index.vue')
      }
    }
    if (
      typeof route.component === 'string' &&
      route.component.startsWith('layout/index')
    ) {
      route.component = () => import('@/layout/index.vue')
    }
    return route
  })
}
// export function addRoutes(routes) {
//   return routes.map((route) => {
//     if (route.children && route.children.length > 0) {
//       route.children = addRoutes(route.children)
//     }
//
//     // 动态 component 替换
//     if (typeof route.component === 'string') {
//       if (route.component === 'layout') {
//         route.component = () => import('@/layout/index.vue')
//       } else {
//         route.component = () => import(`@/views/${route.component}.vue`)
//       }
//     }
//
//     return route
//   })
// }

export default router
