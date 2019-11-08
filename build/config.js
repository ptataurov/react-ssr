const { join } = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const { NODE_ENV = 'development' } = process.env

const IS_DEVELOPMENT = NODE_ENV === 'development'

const commonConfig = () => {
  return {
    port: 8080,
    publicPath: '/assets/'
  }
}

const createTarget = ({
  // Target name
  target
}) => {
  const { publicPath } = commonConfig()

  /**
   * Root of project
   */
  const root = join(__dirname, '../')

  /**
   * Path for compiled assets
   */
  const dist = join(root, 'dist', target)

  /**
   * Source directory
   */
  const src = join(root, 'src')

  /**
   * Name of output bundles
   */
  const name = IS_DEVELOPMENT ? '[name].js' : '[hash:16].js'

  const IS_SERVER = target === 'server'
  const IS_CLIENT = target === 'client'

  return {
    root,
    src,
    dist,

    isDevelopment: IS_DEVELOPMENT,

    webpack: {
      name: target,
      entry: join(src, target + '.js'),
      devtool: IS_DEVELOPMENT ? 'cheap-module-eval-source-map' : false,

      mode: NODE_ENV,
      watch: IS_DEVELOPMENT,

      output: {
        path: dist,
        filename: name,
        chunkFilename: name,
        publicPath
      },

      optimization: {
        minimize: !IS_DEVELOPMENT,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              output: {
                comments: false
              }
            }
          })
        ]
      },

      stats: {
        entrypoints: true
      },

      resolve: {
        modules: ['node_modules', 'src']
      },

      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      corejs: '3.4',
                      modules: false,
                      loose: true,
                      useBuiltIns: 'usage'
                    }
                  ],
                  '@babel/preset-react'
                ],
                plugins: ['@babel/plugin-transform-runtime']
              }
            }
          }
        ]
      },

      plugins: [
        new webpack.DefinePlugin({
          IS_SERVER: JSON.stringify(IS_SERVER),
          IS_CLIENT: JSON.stringify(IS_CLIENT),
          'typeof window': JSON.stringify(IS_CLIENT ? 'object' : 'undefined'),
          'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
        }),

        new webpack.NoEmitOnErrorsPlugin()
      ]
    }
  }
}

module.exports = {
  commonConfig,
  createTarget
}
