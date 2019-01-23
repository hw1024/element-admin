module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/',
  lintOnSave: process.env.NODE_ENV !== 'production',
  outputDir: './dist',
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时， template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '未来已至~',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    subpage: 'src/main.js'
  },
  css: {
    loaderOptions: {
      // 全局sass导入
      sass: {
        data: `@import 'src/scss/variables.scss';`
      }
    }
  },
  // 不需要生产环境的 source map
  productionSourceMap: false,
  // 类似以前的webpack插件配置
  configureWebpack: {},
  // 等同于webpack上的devServer
  devServer: {
    // 反向代理
    proxy: {
      '/api': {
        target: 'http://localhost:13666/',
        changeOrigin: true,
        pathRewrite: {'^/api': '/api'}
      }
    },
    host: 'localhost',
    port: '1688',
  }
}