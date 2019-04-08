const path = require('path');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  name: 'client',
  target: 'web',
  mode: !isDev ? 'production' : 'development',
  devtool: 'source-map',

  // Only use hot-middleware in development.
  entry: !isDev
    ? ['./src/client.js']
    : ['webpack-hot-middleware/client', './src/client.js'],

  output: {
    // Filename hashes in production only.
    filename: !isDev ? 'client.[hash].js' : 'client.js',
    path: path.resolve(__dirname, './public/dist'),
    publicPath: '/dist/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          'eslint-loader',
          'stylelint-custom-processor-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: [
          'react-hot-loader/webpack',
        ],
        include: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
              ],
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]',
            outputPath: 'fonts/',
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]',
            outputPath: 'img/',
          },
        },
      },
    ],
  },

  devServer: !isDev
    ? {}
    : {
      contentBase: path.resolve(__dirname, './public/dist/'),
      overlay: true,
      hot: true,
      stats: {
        colors: true,
      },
    },

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),

    isDev ? new webpack.HotModuleReplacementPlugin() : false,

    new webpack.NoEmitOnErrorsPlugin(),
  ].filter(Boolean),
};
