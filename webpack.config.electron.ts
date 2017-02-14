/**
 * Build config for electron 'Main Process' file
 */

import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import baseConfig from './webpack.config.base';

const BabiliPlugin = require('babili-webpack-plugin');

export default merge(baseConfig, {
  devtool: 'source-map',

  entry: ['./app/main.development'],

  // 'main.js' in root
  output: {
    path: __dirname,
    filename: './app/main.js'
  },

  plugins: [
		new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],

  /**
   * Set target to Electron specific node.js env.
   * https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
   */
  target: 'electron-main',

  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false
  },
});
