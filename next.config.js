module.exports = {
  webpack (config, options) {
    config.resolve.modules = [__dirname, 'node_modules']
    return config
  }
}
