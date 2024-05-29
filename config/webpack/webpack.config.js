// See the shakacode/shakapacker README and docs directory for advice on customizing your webpackConfig.
const { generateWebpackConfig } = require('shakapacker')

const customConfig = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.css']
  }
}

const webpackConfig = generateWebpackConfig(customConfig)

module.exports = webpackConfig
