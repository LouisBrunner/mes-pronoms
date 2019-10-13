const { pathPrefix } = require('./config.js');

module.exports = {
  assetPrefix: pathPrefix,
  exportPathMap: function() {
    return {
      '/': { page: '/' }
    }
  },
  webpack(config) {
    config.resolve.modules = [__dirname, 'node_modules']
    return config
  },
};
