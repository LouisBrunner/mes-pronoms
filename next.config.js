const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  assetPrefix: isProd ? '/mes-pronoms/' : '/',
  exportPathMap: function() {
    return {
      '/': { page: '/' }
    }
  },
  webpack(config, options) {
    config.resolve.modules = [__dirname, 'node_modules']
    return config
  },
}
