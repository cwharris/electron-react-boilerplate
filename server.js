/**
 * Setup and run the development server for Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 */
"use strict";
var express = require("express");
var webpack = require("webpack");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var child_process_1 = require("child_process");
var webpack_config_development_1 = require("./webpack.config.development");
var argv = require('minimist')(process.argv.slice(2));
var app = express();
var compiler = webpack(webpack_config_development_1["default"]);
var PORT = process.env.PORT || 3000;
var wdm = webpackDevMiddleware(compiler, {
    publicPath: webpack_config_development_1["default"].output.publicPath,
    stats: {
        colors: true
    }
});
app.use(wdm);
app.use(webpackHotMiddleware(compiler));
var server = app.listen(PORT, 'localhost', function (serverError) {
    if (serverError) {
        return console.error(serverError);
    }
    if (argv['start-hot']) {
        child_process_1.spawn('npm', ['run', 'start-hot'], { shell: true, env: process.env, stdio: 'inherit' })
            .on('close', function (code) { return process.exit(code); })
            .on('error', function (spawnError) { return console.error(spawnError); });
    }
    console.log("Listening at http://localhost:" + PORT);
});
process.on('SIGTERM', function () {
    console.log('Stopping dev server');
    wdm.close();
    server.close(function () {
        process.exit(0);
    });
});
