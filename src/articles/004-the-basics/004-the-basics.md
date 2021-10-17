# Log 004: The Basics
So the articles for `the site` are now stored as plain Markdown files, which are then imported and rendered from [Svelte](https://svelte.dev/).

I want to clean things up before I start going exploring solutions for a hybrid web-app.

The tasks I want to tackle are:
 - Create a simple interface to display the articles separately as opposed to dumping them all on the page ([#3](https://github.com/RobbyCowell/site/issues/3))
 - Write a script that generates ([#4](https://github.com/RobbyCowell/site/issues/4)):
	 - The scaffolding for a new article
	 - The metadata for a new article
- Make `the site` a somewhat functioning website that can replace the old robbycowell.com ([#5](https://github.com/RobbyCowell/site/issues/5))
- Add some basic, and lightweight styles to `the site` ([#6](https://github.com/RobbyCowell/site/issues/6))
- Associate each log to a Netlify build and Git Commit ([#7](https://github.com/RobbyCowell/site/issues/7))

The numbered links next to each task above are links to the GitHub issues. I plan to track all tasks for the project this way.

## Creating a user interface to show the posts [#3](https://github.com/RobbyCowell/site/issues/3)
I'm excited about this one, it's the first task that will really involve writing some [Svelte](https://svelte.dev/) code!

### The `articles` module
The first thing I did was clean up `App.svelte`, and import all articles into an `articles.js` module that looked like this:
```
import One from './001-the-brief/001-the-brief.svelte';
import Two from './002-the-setup/002-the-setup.svelte';
import Three from './003-the-articles/003-the-articles.svelte';

const articles = {
  One,
  Two,
  Three
};

export default articles;
```
Then in `App.svelte` I can just import the whole `articles` module like so:
```
import articles from './articles/articles.js';
```
Then I can render a specified article by doing something like this:
```
<svelte:component this={articles[articleKey]} />
```
It should also be relatively simple to automate the maintenance of `articles.js` through the script I plan to write for [#4](https://github.com/RobbyCowell/site/issues/4).

### Displaying the articles
Now I have a nice object of articles, I should be able to access each one pretty easily.

We need a way to track which article is currently being displayed:
```
let articleToShow = null;
```
Then we need a way to change the article being displayed:
```
function selectArticle(articleId) {
  articleToShow = articleId;
}
```

Now we can render a list of articles and display the respective article `on:click`:
```
<h3>Articles</h3>
<ul>
  {#each Object.keys(articles) as article}
    <li>
      <a 
        on:click={() => selectArticle(article)}
        href="#{`article-${articleToShow}`}"
      >
        {article}
      </a>
    </li>
  {/each}
</ul>
```

### Bringing in the metadata
So far so good. We're dynamically displaying a list of articles and then displaying the relevant article based on the user's selection.

But there's a problem: the app doesn't know about each article's metadata. Let's fix that.

First, let's make each article component a module and explicitly export our metadata:
```
// 001-the-brief.svelte
<script context="module">
  import metadata from './001-the-brief-metadata.js';
  import article from './001-the-brief.md';

  export const data = metadata;
</script>

<div>
  {@html article}
</div>
```
Now I'm going to pull in that data to `articles.js` and export an object for each article, which will have two properties: `content` and `data`.

`articles.js` now looks like this:
```
import One, { data as articleOneData } from './001-the-brief/001-the-brief.svelte';
import Two, { data as articleTwoData } from './002-the-setup/002-the-setup.svelte';
import Three, { data as articleThreeData } from './003-the-articles/003-the-articles.svelte';

const articles = {
  'one': { content: One, data: articleOneData },
  'two': { content: Two, data: articleTwoData },
  'three': { content: Three, data: articleThreeData }
};

export default articles;
```
The metadata should now exist in the `articles.js` module! Let's try displaying the slug at the top of each article:
```
// App.svelte
<div>
  {#if articleToShow}
    <h3>Slug: {articles[articleToShow].data.slug}</h3>
    <svelte:component this={articles[articleToShow].content} />
  {/if}
</div>
```
*Note that I needed an if statement here to avoid issues in cases where no article is selected but we're trying to display one*

That should do it, selecting each article now shows its slug as intended!
