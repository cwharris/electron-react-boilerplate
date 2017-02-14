/** Used in .babelrc for 'test' environment */

// for babel-plugin-webpack-loaders
import devConfig from './webpack.config.development';

module.exports = {
  output: {
    libraryTarget: 'commonjs2'
  }
};
