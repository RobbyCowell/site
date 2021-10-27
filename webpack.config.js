const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const path = require('path');

module.exports = (env) => {
  const mode = env.production ? 'production' : 'development';
  const prod = mode === 'production';
  const ssr = env.ssr || false;

  return {
    target: ssr ? 'node' : 'web',
    entry: {
      'build/bundle': './src/App.svelte'
    },
    resolve: {
      alias: {
        svelte: path.dirname(require.resolve('svelte/package.json'))
      },
      extensions: ['.js', '.svelte', '.css'],
    },
    output: {
      assetModuleFilename: 'build/images/[hash][ext][query]',
      chunkFilename: ssr ? '[name]-[id]-ssr.js' : ' [name].[id].js',
      filename: ssr ? '[name]-ssr.js' : '[name].js',
      path: path.join(__dirname, '/public'),
      publicPath: '/',
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.svelte$/,
          use: {
            loader: 'svelte-loader',
            options: {
              compilerOptions: {
                dev: !prod,
                format: 'cjs',
                generate: ssr ? 'ssr' : 'dom',
                hydratable: !ssr,
              },
              emitCss: prod,
              hotReload: !prod,
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
        // new TerserPlugin()
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
}
