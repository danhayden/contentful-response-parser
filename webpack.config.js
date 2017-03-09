const path = require('path')
const webpack = require('webpack')

module.exports = (env) => {
  return {
    entry: {
      'index': path.resolve(__dirname, 'src/index.js')
    },
    output: {
      path: path.join(__dirname, 'dist/'),
      filename: '[name].js',
      library: 'contentfulResponseParser',
      libraryTarget: 'umd'
    },
    watch: env.develop,
    resolve: {
      alias: {
        data: path.resolve(__dirname, 'src/data/'),
        app: path.resolve(__dirname, 'src/scripts/app/'),
        lib: path.resolve(__dirname, 'src/scripts/lib/'),
        config: path.resolve(__dirname, 'app.config.js'),
        firebaseAPI: path.resolve(__dirname, 'src/scripts/firebaseAPI/')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader'],
          exclude: [path.resolve(__dirname, 'node_modules')]
        }
      ]
    },
    plugins: [
      env.production && new webpack.DefinePlugin({'process.env': {'NODE_ENV': `"production"`}}),
      env.production && new webpack.optimize.UglifyJsPlugin()
    ].filter(f => f)
  }
}
