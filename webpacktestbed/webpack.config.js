var webpack = require('webpack');

var sassPaths = require('node-neat').includePaths.map(function(sassPath) {
  return 'includePaths[]=' + sassPath;
}).join('&');

module.exports = {
  context: __dirname,

  devtool: 'eval-source-map',

  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],

  output: {
    path:       __dirname + '/build',
    filename:   'bundle.js',
    publicPath: '/static/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, [/\/moment$/])
  ],

  module: {
    loaders: [
      {
        test:   /\.scss$/,
        loader: 'style!css!sass?outputStyle=expanded&' + sassPaths,
      },
      {
        test:   /\.css$/,
        loader: 'style!css?modules',
      },
      {
        test:    /\.jsx?$/,
        exclude: [/(node_modules)/, /(react-overlays)/],
        loaders: ['babel']
      },
      { test: /\.json$/, loader: 'json' },
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  }
};
