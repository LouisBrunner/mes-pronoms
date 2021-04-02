const { pathPrefix } = require('./config.js');

module.exports = {
  future: {
    webpack5: true,
  },
  assetPrefix: pathPrefix,
  webpack(config) {
    config.module.rules.push({
      test: /\.tsx?$/,
      enforce: 'pre',
      use: [{
        loader: 'eslint-loader',
        options: {
          emitErrors: true,
          typeCheck: true,
        },
      }],
    })
    return config
  },
};
