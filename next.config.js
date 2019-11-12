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
    config.module.rules.push({
      test: /\.tsx?$/,
      enforce: 'pre',
      use: [{
        loader: 'tslint-loader',
        options: {
          emitErrors: true,
          typeCheck: true,
          fix: true,
        },
      }],
    })
    return config
  },
};
