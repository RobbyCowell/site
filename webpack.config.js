const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { mdsvex } = require('mdsvex');

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
    extensions: ['.js', '.svelte', '.css', '.md'],
  },

  output: {
    path: path.join(__dirname, '/public'),
    filename: '[name].js',
    chunkFilename: '[name].[id].js'
  },

  module: {
    rules: [
      {
        test: /.(md|svelte|html|svx)$/,
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              dev: !prod
            },
            extensions: ['.svelte', '.svx', '.md'],
            preprocess: mdsvex({
              extensions: ['.md', '.svx'],
            }),
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
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false
        }
      }
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
