const path = require('path');//引入path模块
const { defineConfig } = require('@vue/cli-service')
const configJs = require('./config.json');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,//关闭ESlint校验
  publicPath: '/',//基本路径
  outputDir: 'dist',//输出路径
  pages: {
    'vue3-template-work': {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Vue3模板',
    },
  },
  configureWebpack: {
    plugins: [
      require('unplugin-auto-import/webpack')({ /* options */ }),
      require('unplugin-vue-components/webpack')({ /* options */ }),
    ],
  },
  //服务项配置
  devServer: {
    port: "3000",
    proxy: { //开发模式-解决跨域
      '/proxy': {
        'target': configJs.SERVER_URL,
        'secure': false, // false为http访问，true为https访问
        'changeOrigin': true, // 跨域访问设置，true代表跨域
        'pathRewrite': { // 路径改写规则
          '^/proxy': '' // 以/proxy/为开头的改写为''
        }
      }
    }
  }
})
