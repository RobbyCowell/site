# Log 002: The Setup

## Setting up a Svelte project from scratch
Svelte's docs make it easy to [get started](https://svelte.dev/blog/the-easiest-way-to-get-started), but all approaches seemed to involve downloading templates. I'm sure this is the way to go, but I wanted to figure out how to setup a Svelte app with completely from scratch for the sake of curiosity.

Note: This log steers away form the source code of the repo slightly, because I want it to act as a stand alone tutorial for how to set-up a Svelte project from scratch with webpack.

I decided to use webpack as my module bundler instead of rollup, mostly because I'm familiar with it and planning to write some custom loaders for this project (more on that later). The Svelte team have put together a [great webpack template](https://github.com/sveltejs/template-webpack) that I used as a reference for the following steps.

### Install dependencies
Initialize the project with:
```
npm init
```

Install Svelte:
```
npm install --save-dev svelte 
```

Install webpack and the Svelte loader:
```
npm install --save-dev webpack webpack-cli webpack-dev-server svelte-loader
```

Install the webpack CSS loaders:
```
npm install --save-dev css-loader mini-css-extract-plugin
```
Note, we're using the `mini-css-extract-plugin` to support Svelte's component-scoped styling. You can read more about this approach over on their [GitHub](https://github.com/sveltejs/svelte-loader#extracting-css).

### Set-up project structure
Now we're initialized, let's put the directory structure together, it looks like this:
```
  ...
  public/
    index.html //the html file that will be loaded by the browser
  src/
    dispatches/ //blog articles will be kept here
    App.Svelte //our top-level Svelte component
    entry.js //the js entry-point for the application
    styles.css //the global styles used for the application
  package.json
  README.md
  webpack.config.js // our webpack configuration
```

### Configure the application (`webpack.config.js`)
Before we get started with the actual code, we need to do some configuration,
starting with the webpack config. 

These steps assume the `webpack.config.js ` file is empty.

1. Require `mini-css-extract-plugin`
```
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
```

2. Require Node's path and setup environment checks
```
  ...
  const path = require('path');

  const mode = process.env.NODE_ENV || 'development';
  const prod = mode === 'production';
```

3. Build the module
```
  ...
  module.exports = {};
```

4. Define an entry point ({name-of-entry: {path-to-file})
```
  ...
  module.exports = {
    entry: {
      'build/bundle': './src/entry.js'
    },
  };
```

5. [Configure webpack to allow us to `import` files without their extension (.js, .svelte etc.)](https://webpack.js.org/configuration/resolve/#resolveextensions)
```
  ...
  module.exports = {
    ...
    resolve: {
      extensions: ['.js', '.svelte', '.css'],
    },
  }
```

6. Configure where webpack should output the applications bundles
```
  ...
  module.exports = {
    ...
    output: {
      path: path.join(__dirname, '/public'),
      filename: '[name].js',
      chunkFilename: '[name].[id].js'
    },
  }
```
In this case, we want our bundles output  to the `/public` directory we added earlier, and the `name` of the bundles which will be the name of the entry point we defined above: `build/bundle`. This will output our files like this:
```
  public/
    build/
      bundle.css
      bundle.js
```

7. Configure webpack's rules:
```
  ...
  module.exports = {
    ...
    module: {
      rules: [
        {
          //use the svelte-loader installed earlier to handle .svelte files
          test: /\.svelte$/, 
          use: {
            loader: 'svelte-loader',
            options: {
              compilerOptions: {
                dev: !prod
              },
              //enable css emitting and hot-reloading depending on the environment
              emitCss: prod,
              hotReload: !prod
            }
          }
        }, 
        {
          //use MiniCss extract plugin to handle Svelte's scoped styles and css-loader to handle any other regular css files
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          // this prevents a bug in the svelte-loader, copied from the template mentioned above
          test: /node_modules\/svelte\/.*\.mjs$/,
          resolve: {
            fullySpecified: false
          }
        },
      ]
    }
  },
```

8. Pass in the 'mode' (production or development)
```
  ...
  module.exports = {
    ...
    module
  }
```

9. Configure MiniCSSExtract plugin
```
  ...
  module.exports = {
    ...
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css'
      })
    ],
  }
```

10. Configure webpack dev server
```
  ...
  module.exports = {
    ...
    devtool: prod ? false : 'source-map',
    devServer: {
      hot: true,
      port: 1337
    }
  }
```

The entire webpack.config.js file should look like this:
```
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');

  const path = require('path');

  const mode = process.env.NODE_ENV || 'development';
  const prod = mode === 'production';

  module.exports = {
    entry: {
      'build/bundle': './src/entry.js'
    },
    resolve: {
      extensions: ['.js', '.svelte', '.css'],
    },
    output: {
      path: path.join(__dirname, '/public'),
      filename: '[name].js',
      chunkFilename: '[name].[id].js'
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
          test: /node_modules\/svelte\/.*\.mjs$/,
          resolve: {
            fullySpecified: false
          }
        },
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
```

### Configure the application (`package.json`)
Now we have webpack set-up, let's add a couple of npm scripts to run it.

In the package.json file, update the `scripts` block to this:
```
  "scripts": {
    "build": "NODE_ENV=production webpack",
    "develop": "webpack serve --content-base public"
  },
```

### The first Svelte component
Finally, it's time to code! Let's add a very basic component just to get started, adding the following to `src/App.svelte`:
```
  <script>
    const message = 'Hello, world';
  </script>

  <h1>{ message }</h1>
```

### The first stylesheet
Let's add some basic styles, let's just add this to `src/styles.css`:
```
h1 { color: blue; }
```

### Bring it all together in `entry.js`
OK, now it's time to import our styles and Svelte app into our JS entry point we're using for webpack. Here's what the contents of entry.js will look like:
```
import './styles.css';
import App from './App.svelte';

const app = new App({
  target: document.body
});

export default app;
```
### Add the `index.html` file
Now that webpack has `entry.js` to work on, we need a HTML page that actually uses these bundles and is served by whatever server we end up using. Yes, we could have Webpack generate this index.html file too, but for the purposes of illustration, let's hand-roll `public/index.html`:

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Site - by Robby Cowell</title>
  <link rel='stylesheet' href='/build/bundle.css'>
  <script defer src='/build/bundle.js'></script>
</head>
<body></body>
</html>
```
The only thing worth noting here is the `<link>` and `<script>` tags in the document's `<head>` that are pointing to the compiled bundles webpack has generated for us.

We can now run:
```
npm run build
```
To see these files being compiled and output to the `public/build` directory, and run:
```
npm run develop
```
To see webpack dev server come to life and host our hello world app at [http://localhost:1337](http://localhost:1337)!

That's it! We've set-up a Svelte project from scratch with webpack and are now ready to start building!

### Bonus:
If you're just getting started with Svelte, you should consider installing the [Svelte dev tools extension](https://github.com/RedHatter/svelte-devtools) in your browser (remember to actually have a `<script>` tag in each component you want to see in the dev tools, otherwise it won't show).

If you're using VS code, I also installed [Svelte for VS code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode){:target="_blank"} and [this icon pack](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) that includes icons for `.svelte` files.
