/* eslint-disable global-require, import/no-extraneous-dependencies */

const express = require('express');
const favicon = require('serve-favicon');

// --- create our express server ----------------------------------------------
const app = express();

app.use(favicon('./public/favicon.ico'));
app.use(express.static('./public'));

/**
 * Start the app one way or another.
 * @see https://github.com/60frames/webpack-hot-server-middleware#production-setup
 */
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
  const config = require('./webpack.config');
  const webpackCompiler = webpack(config);

  app.use(webpackDevMiddleware(webpackCompiler, {
    serverSideRender: true,
  }));
  // NOTE: Only the client bundle needs to be passed to `webpack-hot-middleware`.
  app.use(webpackHotMiddleware(webpackCompiler.compilers.find(compiler => compiler.name === 'client')));
  app.use(webpackHotServerMiddleware(webpackCompiler));
} else {
  // Require the compiled server code.
  const serverRenderer = require('./dist/server').default; // eslint-disable-line import/no-unresolved

  // Require the client webpack stats, needed for serving the correct js file.
  const stats = require('./public/dist/stats.json'); // eslint-disable-line import/no-unresolved

  app.use(express.static('./public'));

  // Pass the client webpack stats to the server.
  app.use(serverRenderer({ clientStats: stats }));
}

// ---and start listening -----------------------------------------------------

app.listen(process.env.PORT);
