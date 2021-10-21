const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
  entry: {
    'build/bundle': './src/entry.js'
  },
  resolve: {
    alias: {
      svelte: path.dirname(require.resolve('svelte/package.json'))
    },
    extensions: ['.js', '.svelte', '.css'],
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    assetModuleFilename: 'build/images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              dev: !prod
            },
            emitCss: prod,
            hotReload: !prod
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.md$/,
        use: [
          'html-loader',
          'markdown-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false
        }
      },
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  devtool: prod ? false : 'source-map',
  devServer: {
    hot: true,
    port: 1337
  }
};
