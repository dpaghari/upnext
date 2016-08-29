var webpack = require('webpack');
var path = require('path');


module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8080/',
    'webpack/hot/only-dev-server',
    './src/components/js/client.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // loader: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
        query: {
          presets: ['react', 'es2015'],
          plugins: ['react-html-attrs', 'transform-class-properties']
        }
      },
      {
        test: /\.css$/, exclude: /\.useable\.css$/, loader: "style!css"
      },
      {
        test: /\.useable\.css$/, loader: "style/useable!css"
      },
      {
        test: /\.scss$/, loaders: ["style", "css", "sass"]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
