# 005-server-side-rendering

## Problem 1: Document is not defined
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

