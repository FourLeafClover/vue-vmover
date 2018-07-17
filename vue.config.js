module.exports = {
  baseUrl: './',
  devServer: {
    port: 7878,
    proxy: {
      '/': {
        target: 'https://app.vmovier.com',
        ws: true,
        changeOrigin: true
      }
    }
  },
  lintOnSave: true,
  productionSourceMap: false
}
