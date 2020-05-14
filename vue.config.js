module.exports = {
    publicPath: './',
    devServer: {
      hotOnly: true,
      proxy: {
        '/api': {
          target: 'http://121.37.158.6:8082',   //代理接口
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''    //代理的路径
          }
        }
      }
  }
}