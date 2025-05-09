const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      port: 9559, // ✅ 指定端口号
      client: {
        overlay: false
      }
    }
  }
})
