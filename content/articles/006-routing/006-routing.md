# Log 006-routing
Routing is an essential piece of most websites, and this one is no different. Specifically, I want visitors to be able to come straight to the site via URLs like: `.../articles/006-routing`, and also navigate to these URLs from within the site.

So there's two main areas of concern here: 
  1. Server-side routing (for visitors coming from elsewhere)
  2. For visitors coming from within the site.

Let's start with the server-side routing (because it's out of my comfort zone these days and I want to get it out the way!).

## Server-side routing
Before I start coding this, I need to think about how the URLs should look.

Right now, they're kind of ugly: 
`http://localhost:3000/#article-005-server-side-rendering`

I think something like this would be better:
`http://localhost:3000/articles/005-server-side-rendering`

So let's adjust the site to manage the URLs in this way.

Essentially, we just want to render the Svelte app with the correct props on the server-side and return it. So building from the code we had in 005 (TODO: add link), we'll add a new route in `server.js` to handle `/articles/` requests:
```
app.get('/articles/:articleId', async (req, res) => {
  const articleId = req.params.articleId;

  const page = await generateHtml(articleId);
  res.send(page);
});
```

So we can now make requests like `.../articles/006-routing` and the server will render the correct article by grabbing the `:articleId` param from the URL.

We can then assume that the default route `/` is the homepage (for now), and we simply don't pass in any `articleId`:

```
app.get('/', async (req, res) => {
  const page = await generateHtml();
  res.send(page);
});
```

## Client side routing
That should handle things on the server-side (for now).

To handle routing on the client-side, we'll use the built-in History API.

The API makes life a lot easier, and we can simply rewrite the selectArticle function in App.js to something like this:
```
  function selectArticle(articleId) {
    // State object to store info about the current point in history, in this case, the selected article
    let stateObject = {
      article: articleId,
    };

    articleToShow = articleId;

    // 'Navigate' to a specific URL
    if (articleId) { 
      history.pushState(stateObject, "", `/articles/${articleId}`);
    } else {
      history.pushState(stateObject, "", "/");
    }
  }
```

With `history.pushState` we're kind of faking navigation to an actual page, and are instead just adding a new point in the brwoesers history with infor about the currently selected article. On the surface-level, the app will still behave like a regular website: you click a link, and the URL and the page changes, but in reality we're just using the Svelte app to update the content being rendered (no page reload).

Coupled with the server-side routing, this approach should be fairly robust. We're missing one thing though, what happens when a visitor uses the back/forward arrows? Right now, the URL will update, but the App won't - not good!

The solution to this is to add an event listener that checks for when the browser's history state has changed, and then set the current `articleId` to the value (`articleToShow`) that was set previously in the `stateObject` object in the code block above.

The listener, using Svelete's `onMount` function, looks like this:
```
  onMount(() => {
    window.onpopstate = (event) => {
      if (event.state) articleToShow = event.state.article;
    }
  });
```

Finally, to get this to work properly, we need to prevent the browser from attempting to make a GET request to these 'fake' URLs, as that would defeat the object of having a hybrid app in the first place.

So in Svelte, all the onClick events on these internal links should be provided with the `preventDefault` option:

```
<a
  on:click|preventDefault={ () => selectArticle(article) }
  href="{`articles/${articleToShow}`}"
>
```

And that's all the changes that were needed to get the routing up and running. Now, once fully-deployed, the 'site' will function and appear to be a regular website.

## Other changes
Seeing as we now need to additionally compile the server-side app so it can be rendered by the server, AND the client-side app, I created a new npm script in `package.json` that does both at once:

```
"build": "npm run build-client && npm run build-ssr",
```

I also need to make some changes so I can still run the site in development mode, as the template we were using relies on the server to populate the value for `$articleToShow` in our html template, and running both a client and dev server to test locally is quite an ask (especially considering there's no actual back-end here).

So I made two html templates, one for the `server.js` script to process: `ssr.html`, and one specifically for development that Webpack can serve: `dev.html`. I moved both to `scripts/templates` where the other templates live.

The only difference between the two is that `ssr.html` has the `$articleToShow` placeholder for the `articleToShow` property, and `dev.html` has null. This lets me test the app without a server, albeit starting from the homepage everytime as `articleToShow` is always `null`. It's easy enough to check the server locally by simple running `node ./server.js`.

Testing locally, I can see that the site (both client and server side) are behaving as they should. I'm looking for a single GET request that returns a pre-rendered page on the initial page-load, and then no further GET requests as I navigate between the URLs.

I'm seeing both of these behaviours and that is certainly good enough (for now!).

The next challenge is: hosting. By adding a server, I can no longer use default Netlify et. al. so I need to find a reasonable way to deploy both the client and server.
