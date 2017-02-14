/**
 * Base webpack config used across other specific configs
 */

import * as path from 'path';
const { dependencies, externals } = require('./app/package.json');

export default {
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loaders: ['ts-loader'],
      exclude: /node_modules/
    },{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',

    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },

  plugins: [],

  externals: Object.keys(externals || {})
};
