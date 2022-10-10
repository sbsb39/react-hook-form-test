const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// dotenv.config({
//   path: `./.env`
// });

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: [path.resolve(__dirname, 'src/index.tsx'), path.resolve(__dirname, 'src/assets/stylesheets/app.scss')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    environment: {
      arrowFunction: false,
      bigIntLiteral: false,
      const: false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: false
    }
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        exclude: /@babel(?:\/|\\{1,2})runtime|core-js/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },

      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
            // options: {
            //   name: 'assets/images/[name].[ext]',
            //   limit: 100, // 100 bytes
            //   emitFile: false,
            //   esModule: false
            // }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './public/assets',
          to: './assets',
          globOptions: {
            dot: false,
            gitignore: false
          }
        },
        {
          from: './public/robots.txt',
          to: './'
        },
        {
          from: './src/assets/images/favicon.ico',
          to: './'
        },
        {
          from: './src/assets',
          to: './assets',
          globOptions: {
            dot: false,
            gitignore: false,
            ignore: ['favicon.ico', '.gitkeep', '.DS_Store', '*.sass', '*.scss', '*.less']
          }
        }
      ]
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.ts', '.tsx', '.js', 'jsx']
  },
  // devServer: {
  //   historyApiFallback: true,
  //   allowedHosts: 'all'
  // }
  devServer: {
    port: 3001,
    // http2: true,
    // https: true,
    host: '0.0.0.0',
    compress: true,
    allowedHosts: 'all',
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    client: {
      overlay: false,
      logging: 'info',
      reconnect: true
    },
    proxy: {
      '/api': {
        target: 'https://intaxi-api-dev.dogfoot.net',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
