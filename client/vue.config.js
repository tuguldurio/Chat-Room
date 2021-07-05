module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/chat-room/' : '/',
  configureWebpack:{
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 244000,
      }
    }
  }
}