const {pathPrefix} = require('./config.js');

module.exports = {
  basePath: pathPrefix,
  // assetPrefix: pathPrefix,
  webpack(config, {webpack}) {
    config.module.rules.push({
      test: /\.proto$/,
      loader: 'pbf-loader',
    })
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
    config.plugins.push(new webpack.IgnorePlugin({resourceRegExp: /\/__tests__\//}));
    return config
  },
};
