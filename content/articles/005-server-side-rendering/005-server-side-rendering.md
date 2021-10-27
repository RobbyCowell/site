# 005-server-side-rendering

# Notes


# Article

# Server-side rendering

1. Configure Webpack to render the Svelte app on the server-side. This is usually pretty simple, but because I'm compiling my site's content from Markdown, I need to compile everything on the server-side too, which means running Webpack.

### Problem 1: Document is not defined
After configuring webpack to render the SSR version of the code:
```
    module: {
      rules: [
        {
          test: /\.svelte$/,
          use: {
            loader: 'svelte-loader',
            options: {
              compilerOptions: {
                dev: !isProd,
                format: 'cjs',
                generate: isSSR ? 'ssr' : 'dom',
                hydratable: true,
              },
              emitCss: isProd,
              hotReload: !isProd
            }
          }
        },
```
And then importing it and attempting to render it on the server-side like so:
```
const App = require('./public/build/bundle-ssr.js');
console.log(App.render({}));
```
I get `ReferenceError: document is not defined`

I am trying to render a chunk compiled for the web in a node.js environment.

I need to create a webpack config that can handle the bundling of the app for both browser and node environments.

libraryTarget: 'umd',
different entry webpack configs

## 2. Build entire page in Node

## 3. Serve pre-compiled page and hydrate it

## 4. Implement routing

## 5. Implement history