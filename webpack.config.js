const path = require('path');
const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

let conf = {
  context: path.resolve(__dirname, 'src'), // `__dirname` is root of project and `src` is source
  entry: {
    app: [
      './main.jsx',
    ],
    vendor: [
      'react',
      'react-dom',
    ],
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.join(__dirname, '/dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),

    // https://webpack.github.io/docs/list-of-plugins.html#2-explicit-vendor-chunk
    new webpack.optimize.CommonsChunkPlugin({
      // This name 'vendor' ties into the entry definition
      name: 'vendor',
      // We don't want the default vendor.js name
      filename: 'vendor-bundle.js',
      // Passing Infinity just creates the commons chunk, but moves no modules into it.
      // In other words, we only put what's in the vendor entry definition in vendor-bundle.js
      minChunks: Infinity,
    }),
    new ExtractTextPlugin('styles.css')
  ],
  module: {
    loaders:[],
    rules: [
      {
        test: /\.js$/,
        exclude: /(spec|node_modules|bower_components)/,
        loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
        options: {
          babelrc: false,
          presets: ['es2015'],
          plugins: ["transform-class-properties"]
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: ["transform-class-properties"],
              presets: [
                ['es2015', { modules: false }],
                'react',
              ],
            }
          }
        ]
      },
    ]
  },
};
module.exports = (env, argv) => {return conf};
