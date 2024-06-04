// The source code including full typescript support is available at:
// https://github.com/shakacode/react_on_rails_demo_ssr_hmr/blob/master/config/webpack/commonWebpackConfig.js

// Common configuration applying to client and server configuration
const { merge } = require('webpack-merge');
const { baseConfig } = require('shakapacker');

const commonOptions = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'sass-loader',
        ],
      },
      {
        test: /\.rt$/i,
        use: [
          'react-templates-loader?modules=amd'
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.css', '.ts', '.tsx'],
  }
};

// Copy the object using merge b/c the baseClientWebpackConfig and commonOptions are mutable globals
const commonWebpackConfig = () => merge({}, baseConfig, commonOptions);

module.exports = commonWebpackConfig;
