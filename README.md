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

## 后端项目地址和接口文档地址

后端项目地址：https://gitee.com/fly-sy/my-backend-app

接口文档地址：https://console-docs.apipost.cn/preview/5a1b8d8bcff54220/350d2d652cd952ce

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

## 格式化风格

**为什么使用 eslint + perttier 组合作为代码的格式化风格？**

eslint 是一种代码规范和质量检查工具，它可以检测和报告代码中的问题，如语法错误、格式错误、命名错误等。

perttier 是一个代码格式化工具，它可以将代码按照统一的风格进行格式化。

使用 eslint + perttier 组合可以保证代码风格的一致性和质量。

**eslint**
常用的`.eslintrc.js`文件配置如下

```js
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
```

**perttier**

1. 在 vscode 中安装 `Prettier - Code formatter` 插件

2. 在项目的根目录创建`.prettierrc.json`文件并添加如下配置

```json
{
  "semi": false, // 是否在语句末尾添加分号
  "singleQuote": true, // 使用单引号代替双引号
  "trailingComma": "none", // 在对象或数组最后一个元素后面是否添加逗号
  "singleAttributePerLine": true // 是否将每个属性放在单独的一行
}
```

## rest 重置样式配置

1. 创建`src/styles/index.scss` 和 `src/styles/normalize.css`

2. 在`src/styles/normalize.css`中添加如下样式

```css
/*! normalize.css v8.0.1 | MIT License | https://github.com/necolas/normalize.css */

/* Document
  ========================================================================== */

/**
* 1. Correct the line height in all browsers.
* 2. Prevent adjustments of font size after orientation changes in iOS.
*/

html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

/* Sections
  ========================================================================== */

/**
* Remove the margin in all browsers.
*/

body {
  margin: 0;
}

/**
* Render the `main` element consistently in IE.
*/

main {
  display: block;
}

/**
* Correct the font size and margin on `h1` elements within `section` and
* `article` contexts in Chrome, Firefox, and Safari.
*/

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

/* Grouping content
  ========================================================================== */

/**
* 1. Add the correct box sizing in Firefox.
* 2. Show the overflow in Edge and IE.
*/

hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}

/**
* 1. Correct the inheritance and scaling of font size in all browsers.
* 2. Correct the odd `em` font sizing in all browsers.
*/

pre {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/* Text-level semantics
  ========================================================================== */

/**
* Remove the gray background on active links in IE 10.
*/

a {
  background-color: transparent;
}

/**
* 1. Remove the bottom border in Chrome 57-
* 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
*/

abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: underline; /* 2 */
  text-decoration: underline dotted; /* 2 */
}

/**
* Add the correct font weight in Chrome, Edge, and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/**
* 1. Correct the inheritance and scaling of font size in all browsers.
* 2. Correct the odd `em` font sizing in all browsers.
*/

code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/**
* Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/**
* Prevent `sub` and `sup` elements from affecting the line height in
* all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Embedded content
  ========================================================================== */

/**
* Remove the border on images inside links in IE 10.
*/

img {
  border-style: none;
}

/* Forms
  ========================================================================== */

/**
* 1. Change the font styles in all browsers.
* 2. Remove the margin in Firefox and Safari.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}

/**
* Show the overflow in IE.
* 1. Show the overflow in Edge.
*/

button,
input {
  /* 1 */
  overflow: visible;
}

/**
* Remove the inheritance of text transform in Edge, Firefox, and IE.
* 1. Remove the inheritance of text transform in Firefox.
*/

button,
select {
  /* 1 */
  text-transform: none;
}

/**
* Correct the inability to style clickable types in iOS and Safari.
*/

button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button;
}

/**
* Remove the inner border and padding in Firefox.
*/

button::-moz-focus-inner,
[type='button']::-moz-focus-inner,
[type='reset']::-moz-focus-inner,
[type='submit']::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
* Restore the focus styles unset by the previous rule.
*/

button:-moz-focusring,
[type='button']:-moz-focusring,
[type='reset']:-moz-focusring,
[type='submit']:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
* Correct the padding in Firefox.
*/

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
* 1. Correct the text wrapping in Edge and IE.
* 2. Correct the color inheritance from `fieldset` elements in IE.
* 3. Remove the padding so developers are not caught out when they zero out
*    `fieldset` elements in all browsers.
*/

legend {
  box-sizing: border-box; /* 1 */
  color: inherit; /* 2 */
  display: table; /* 1 */
  max-width: 100%; /* 1 */
  padding: 0; /* 3 */
  white-space: normal; /* 1 */
}

/**
* Add the correct vertical alignment in Chrome, Firefox, and Opera.
*/

progress {
  vertical-align: baseline;
}

/**
* Remove the default vertical scrollbar in IE 10+.
*/

textarea {
  overflow: auto;
}

/**
* 1. Add the correct box sizing in IE 10.
* 2. Remove the padding in IE 10.
*/

[type='checkbox'],
[type='radio'] {
  box-sizing: border-box; /* 1 */
  padding: 0; /* 2 */
}

/**
* Correct the cursor style of increment and decrement buttons in Chrome.
*/

[type='number']::-webkit-inner-spin-button,
[type='number']::-webkit-outer-spin-button {
  height: auto;
}

/**
* 1. Correct the odd appearance in Chrome and Safari.
* 2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/**
* Remove the inner padding in Chrome and Safari on macOS.
*/

[type='search']::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
* 1. Correct the inability to style clickable types in iOS and Safari.
* 2. Change font properties to `inherit` in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/* Interactive
  ========================================================================== */

/*
* Add the correct display in Edge, IE 10+, and Firefox.
*/

details {
  display: block;
}

/*
* Add the correct display in all browsers.
*/

summary {
  display: list-item;
}

/* Misc
  ========================================================================== */

/**
* Add the correct display in IE 10+.
*/

template {
  display: none;
}

/**
* Add the correct display in IE 10.
*/

[hidden] {
  display: none;
}
```

3. 在`src/styles/index.scss`中引入`normalize.css`

```scss
@import url('./normalize.css');
```

4. 在 main.js 中引入`styles/index.scss`

```js
import '@/styles/index.scss'
```

## vue-cli 中使用 element-ui

在 Vue CLI 项目中使用 Element UI 可以通过以下步骤进行：

1. 安装 Element UI

首先，你需要使用 npm 或 yarn 将 Element UI 安装到你的 Vue CLI 项目中。在项目根目录下打开命令行窗口，然后运行以下命令：

使用 npm：

```bash
npm i element-ui -S
```

或者使用 yarn：

```bash
yarn add element-ui
```

2. 引入 Element UI

在你的 Vue CLI 项目中，你需要将 Element UI 引入到你的项目中。在你的 `main.js` 文件中，添加以下代码：

```javascript
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
```

这里，我们首先导入了 Vue 和 ElementUI。然后，我们导入了 Element UI 的样式文件。最后，我们通过 `Vue.use(ElementUI)` 将 Element UI 添加到 Vue 中。

3. 开始使用 Element UI

现在，你就可以在你的 Vue 组件中使用 Element UI 的组件了。例如，你可以在你的组件中添加一个按钮：

```vue
<template>
  <div>
    <el-button type="primary">主要按钮</el-button>
  </div>
</template>
```

注意，Element UI 的组件通常都以 `el-` 开头。

4. 按需引入

如果你希望只引入需要的 Element UI 组件，以减少项目的体积，你可以使用按需引入的方式。这需要使用到 Babel 插件 `babel-plugin-component`。首先，你需要安装这个插件：

```bash
npm install babel-plugin-component -D
```

然后，在你的 `.babelrc` 或 `babel.config.js` 文件中，添加以下配置：

```json
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

接下来，你可以只引入你需要的组件和样式：

```javascript
import Vue from 'vue'
import { Button, Select } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Button)
Vue.use(Select)
```

这样，你就只会引入 Button 和 Select 组件以及它们的样式，而不会引入整个 Element UI 库。

**抽离代码**

将 Element UI 抽离到 `src/plugins/ElementUI.js` 文件中是一个很好的做法，这样可以更好地组织代码并使其易于管理。下面是如何实现这一点的步骤：

1. **创建 `ElementUI.js` 文件**

首先，在 `src/plugins` 目录下创建一个新的文件 `ElementUI.js`。

2. **安装并引入 Element UI**

在 `ElementUI.js` 文件中，安装并引入 Element UI 及其样式文件。

```javascript
// src/plugins/ElementUI.js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default () => {
  Vue.use(ElementUI)
}
```

这里我们导出了一个函数，这个函数会调用 `Vue.use(ElementUI)` 来安装 Element UI 插件。

3. **在 `main.js` 中引入并使用 `ElementUI.js`**

接下来，在 `main.js` 文件中，你需要引入并使用这个 `ElementUI.js` 文件。

```javascript
// src/main.js
import Vue from 'vue'
import App from './App.vue'
import ElementUI from './plugins/ElementUI'

// 使用 ElementUI 插件
ElementUI()

new Vue({
  render: (h) => h(App)
}).$mount('#app')
```

在这里，我们引入 `ElementUI` 函数，并立即调用它，从而安装 Element UI 插件。

4. **按需引入（可选）**

如果你希望按需引入 Element UI 的组件，你可以在 `ElementUI.js` 文件中做相应的配置，并使用 `babel-plugin-component`。这要求你已经安装并配置了该插件。

```javascript
// src/plugins/ElementUI.js
import Vue from 'vue'
import { Button, Select } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default () => {
  Vue.component(Button.name, Button)
  Vue.component(Select.name, Select)
  // ... 引入其他需要的组件
}
```

然后在 `main.js` 中使用它：

```javascript
// src/main.js
import Vue from 'vue'
import App from './App.vue'
import ElementUI from './plugins/ElementUI'

// 使用 ElementUI 插件中的组件
ElementUI()

new Vue({
  render: (h) => h(App)
}).$mount('#app')
```

这样，你就成功地将 Element UI 的引入和使用抽离到了 `src/plugins/ElementUI.js` 文件中，并在 `main.js` 中进行了引入和使用。这有助于保持你的 `main.js` 文件更加简洁，并且让你的插件和配置更加模块化。

## vue-cli 中使用 axios

1. 安装 `axios`

首先，确保你的项目中已经安装了 `axios`。如果没有，请在项目根目录下运行以下命令进行安装：

```bash
npm install axios --save
```

或者，如果你使用 `yarn`：

```bash
yarn add axios
```

2. 创建 `axios` 实例并封装请求方法

在 `src/utils/axios.js` 文件中，创建并配置 `axios` 的实例，并封装一些通用的请求方法：

```javascript
// src/utils/axios.js
import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 使用环境变量配置基础URL
  timeout: 5000 // 请求超时时间
  // 其他配置，比如 headers、拦截器等
})

export default service
```

3. 创建 API 文件并封装接口

在 `src/api` 文件夹下创建对应的接口文件，比如 `users.js`，并封装具体的接口请求：

```javascript
// src/api/users.js
import request from '@/utils/axios'

// 登录接口
export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

// 其他用户相关接口...
```

4. 在组件中使用 API

在你的 Vue 组件中，你可以直接引入并使用这些封装好的 API 函数：

```javascript
// src/views/Login.vue
<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input v-model="username" type="text" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script>
import { login } from '@/api/users'; // 引入登录接口

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await login({ username: this.username, password: this.password });
        if (response.data.success) {
          // 登录成功逻辑处理，比如跳转到主页
          console.log('登录成功', response.data);
        } else {
          // 登录失败逻辑处理，比如显示错误信息
          console.error('登录失败', response.data.message);
        }
      } catch (error) {
        // 请求错误处理
        console.error('请求出错', error);
      }
    }
  }
};
</script>
```

5. 处理响应和错误

在上述的 `handleSubmit` 方法中，我们处理了登录接口的响应。根据后端返回的响应数据，我们可以判断登录是否成功，并相应地执行不同的逻辑。同时，我们也捕获了可能发生的请求错误，并打印了错误信息。

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
