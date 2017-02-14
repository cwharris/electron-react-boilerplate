if (process.env.NODE_ENV === 'production') {
  exports.default = require('./configureStore.production');
} else {
  exports.default = require('./configureStore.development');
}
