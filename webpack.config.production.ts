/**
 * Build config for electron 'Renderer Process' file
 */

import * as path from 'path';
import * as webpack from 'webpack';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as merge from 'webpack-merge';
import baseConfig from './webpack.config.base';

const BabiliPlugin = require('babili-webpack-plugin');

export default merge(baseConfig, {
  devtool: 'cheap-module-source-map',

  entry: ['./app/index'],

  output: {
    path: path.join(__dirname, 'app/dist'),
    publicPath: '../dist/'
  },

  module: {
    loaders: [
      // Extract all .global.css to style.css as is
      {
        test: /\.global\.css$/,
        loader: ExtractTextPlugin.extract({
					loader:"css-loader",
					fallbackLoader:"style-loader"
				})
      },

      // Pipe other styles through css modules and append to style.css
      {
        test: /^((?!\.global).)*\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          fallbackLoader: 'style-loader'
				})
      },

      // Fonts
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },

      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        loader: 'url-loader'
      }
    ]
  },

  plugins: [
    /**
     * Assign the module and chunk ids by occurrence count
     * Reduces total file size and is recommended
     */
    new webpack.optimize.OccurrenceOrderPlugin(true),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

		new webpack.optimize.UglifyJsPlugin(),

    new ExtractTextPlugin({
			filename: "style.css",
			allChunks: true
		}),

    /**
     * Dynamically generate index.html page
     */
    new HtmlWebpackPlugin({
      filename: '../app.html',
      template: 'app/app.html',
      inject: false
    })
  ],

  // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
  target: 'electron-renderer'
});
