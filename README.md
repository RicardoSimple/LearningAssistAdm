# vue-element-admin

这是一个通用的后台管理系统模板，基于 vue.js 和 element-ui 实现。该模板包含完整的项目结构和代码逻辑，可以作为后台管理系统开发的基础。

## 项目使用步骤

### 安装项目依赖

```shell
npm install

yarn

pnpm install

```

### 运行项目

```shell
npm run serve
```

### 打包项目

```shell
npm run build
```

### 代码检查

```shell
npm run lint
```

## 前端项目结构

vue-element-admin/  
├── .env // 环境变量配置文件  
├── .env.development // 开发环境的环境变量配置文件  
├── .env.production // 生产环境的环境变量配置文件  
├── .eslintrc.js // ESLint 配置文件  
├── .gitignore // Git 忽略文件  
├── babel.config.js // Babel 配置文件  
├── LICENSE // 项目许可证文件  
├── package-lock.json // 记录项目依赖的确切版本  
├── package.json // 项目依赖和脚本配置文件  
├── README.md // 项目说明文档  
├── vue.config.js // Vue CLI 配置文件  
├── public/ // 静态资源目录  
│ ├── favicon.ico // 网站图标  
│ └── index.html // 入口 HTML 文件  
└── src/ // 源代码目录  
 ├── api/ // API 请求目录  
 │ └── ... // API 请求文件  
 ├── assets/ // 资源文件目录  
 │ ├── icon/ // 图标文件  
 │ ├── images/ // 图片文件  
 │ └── ... // 其他资源文件  
 ├── components/ // 可复用的 Vue 组件目录  
 │ └── ... // Vue 组件文件  
 ├── directive/ // 自定义 Vue 指令目录  
 │ └── ... // 自定义指令文件  
 ├── filters/ // Vue 过滤器目录  
 │ └── ... // 过滤器文件  
 ├── icons/ // 项目使用的图标目录  
 │ └── ... // 图标文件  
 ├── lang/ // 国际化文件目录  
 │ └── ... // 国际化配置文件  
 ├── layout/ // 布局组件目录  
 │ ├── components/ // 布局组件中使用的子组件  
 │ └── ... // 布局组件文件  
 ├── mixins/ // Vue 混入目录  
 │ └── ... // 混入文件  
 ├── plugins/ // Vue 插件目录  
 │ └── ... // 插件文件  
 ├── router/ // Vue 路由配置目录  
 │ ├── index.js // 路由入口文件  
 │ └── ... // 路由配置文件  
 ├── store/ // Vuex 状态管理目录  
 │ ├── index.js // Vuex 入口文件  
 │ ├── modules/ // Vuex 模块目录  
 │ └── ... // Vuex 相关文件  
 ├── styles/ // 全局样式目录  
 │ ├── index.scss // 全局样式入口文件  
 │ └── ... // 其他样式文件  
 ├── utils/ // 工具函数目录  
 │ └── ... // 工具函数文件  
 ├── views/ // 页面目录  
 │ ├── dashboard/ // 仪表盘页面目录  
 │ │ └── ... // 仪表盘页面文件  
 │ ├── login/ // 登录页面目录  
 │ │ └── ... // 登录页面文件  
 │ ├── ... // 其他页面目录  
 │ └── index.js // 页面路由映射文件  
 ├── App.vue // 根组件文件  
 ├── main.js // 入口 JS 文件  
 └── permission.js // 权限控制文件

6. 配置环境变量（可选）

如果你的 API 请求需要不同的基础 URL（比如开发环境和生产环境），你可以使用 Vue CLI 的环境变量功能。在项目的根目录下创建 .env.development 和 .env.production 文件，并在其中设置 VUE_APP_BASE_API 变量。这样，你就可以在 axios.js 文件中引用这个变量来设置 baseURL。

例如，在 .env.development 中：

```
VUE_APP_BASE_API=http://localhost:3000
```

在 .env.production 中：

```
VUE_APP_BASE_API=https://api.example.com
```

确保在 axios.js 文件中使用 process.env.VUE_APP_BASE_API 来读取这个变量。

7. 添加请求和响应拦截器（可选）

在 `src/utils/axios.js` 文件中，你可以添加请求和响应的拦截器，用于处理一些通用的逻辑，比如添加请求头、处理响应数据格式、统一处理错误等。

**注意事项**

- 确保你的后端 API 已经配置好，并能够正常处理前端发送的请求。
- 如果你的后端 API 需要跨域访问，确保后端已经配置了 CORS（跨源资源共享）。
- 在生产环境中，注意保护你的 API 密钥和敏感信息，不要硬编码在前端代码中。

这样，你就完成了 `axios` 的整合和使用，并封装了登录接口到 `src/api/users.js` 文件中。现在你可以在你的 Vue 组件中方便地调用这个接口，并进行后续的逻辑处理。
