# 007-deployment

## Intro
The site's server-side rendering and routing functionality is now working as intended, and while this is primarily a front-end blog, I want to share the entire development process. As many know, a project working locally is *not* the same as working online.

## Provider selection
There are many, many options for NodeJS hosting/cloud providers in 2022, but I'm going to go with GCP's App Engine because:

  - I'm familiar with App Engine - while working at Google, the site I was responsible for was hosted by App Engine

  - App Engine's free tier is pretty generous, and will likely remain free for my traffic expectations

  - Carbon neutral data-centers

  - Relatively simple deployment process

## Configuring 'the site' for App Engine
The key piece of configuration for most App Engine app's is the `app.yaml` file, which tells App Engine which runtime to use, how to handle various static paths, and a whole load more.

### App.yaml

My initial app.yaml looked like this:

```
runtime: nodejs16

handlers:
- url: /build
  static_dir: public/build

- url: /(.*\.(gif|png|jpg))$
  static_files: public/build/images/\1
  upload: public/build/images/.*\.(gif|png|jpg)$
```

Essentially I'm just specifying the runtime and how the URLs should map to the various static directories. This should be enough to get us going, or so I thought.

### App Engine NodeJs endless reload

Deploying my app resulted in an endless page-load attempt, I could tell from the logs that the server was starting, but when I tried to load the homepage, the browser would never get a completed request and the page would be in an endless loading state.

After some research, it seemed that my app's main problem was how I was handling the ports (more server-side inclined folks are probably rolling their eyes at this point!), so in `server.js` I had to change:

```
const port = 3000;
```

to:

```
const port = process.env.PORT || 3000;
```

The line above was causing the endless loading issue, presumably because App Engine was choosing the port for me and `3000` wasn't availble.

### `.glcoudignore`

A `.gcloudignore` file is automatically added by the Google Cloud SDK, which just specifieis what files should be ignored for upload/deployment.

### Changes to `package.json`
I added a `start` script to `package.json` that App Engine looks for and executes automatically (you can specifiy the exact script but it requires additional config), it also gives me a slightly cleaner way to run the server locally, rather than typing: `node ./server.js` I can now type: `npm start`, a win-win!

```
...
"scripts": {
  "start": "node server.js"
}
```

Finally, I was getting a `module not found` error for `Express` when deploying the app, it turns out that server-side dependencies need to be specified in the `dependencies` propert in `package.json`, so I simply cut and pasted the `Express` line in `devDependencies` to `dependencies`, redeployed, and everything seems to work nicely (routing and all)!

And that's it for deployment!

### Notes
I noticed that the site is not caching images, so is making new http requests for images each time an article with an image is loaded, so that's something to fix up in the future.

I also want to set-up an automatic deployment to App Engine when I merge the code into `main`. I'll probably do this with GitHub Actions in the future.

I am going to configure the DNS for `robbycowell.com` to point to this new App Engine app.