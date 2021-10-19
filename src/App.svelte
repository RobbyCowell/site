<script>
  import Article from './components/Article.svelte'
  import articles from './articles/articles.js';

  let articleToShow = null;

  function selectArticle(articleId) {
    articleToShow = articleId;
  }
</script>

<h1>Robby Cowell - 🏗 The Site 🚧</h1>

<h2>Bio</h2>
<p>Hello! I'm Robby, a software engineer, web developer, and social entrepreneur.</p>
<p>I lead a team of engineers building tools to improve cancer care.</p>
<p>I'm a co-founder of <a href="https://easyec.org/">Easy EC</a> - a tool to help young people access emergency contraception.</p>
<p>I worked as a web developer at <a href="https://www.google.com/">Google.</a></p>
<p>You can follow me on <a href="https://twitter.com/RobbyCowell">Twitter</a>, connect on <a href="https://www.linkedin.com/in/robbycowell/">LinkedIn</a>, check out my code on <a href="https://github.com/RobbyCowell/">GitHub</a> or hang out with me on <a href="https://www.twitch.tv/robbycowell">Twitch</a>.</p>

<h2>The Site</h2>
<p>You're visiting my work-in-progress personal site, dubbed the <a href="https://github.com/RobbyCowell/site">'site'</a></p>
<p>The 'site' is an evolving engineering project, inspired by physical construction sites.</p>
<p>I'll be documenting the construction of the project in articles as it's built. This will be a living project, documenting itself as it's built.</p>
<p>With each commit and log, this repository will evolve from the bare-bones state it's in today, to a finished, fully featured website. This first article outlines the requirements and general plan for the project which can be found <a href="https://github.com/RobbyCowell/site/blob/main/src/articles/001-the-brief/001-the-brief.md">here.</a></p>

<h3>Data and Cookies</h3>
The 'site' doesn't collect, share, track, or use any data/cookies for any reason.

<h2>Articles</h2>
<a
  on:click={() => selectArticle(null)} 
  href="#home"
>
  clear article selection
</a>

<hr>
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
<hr>
<div>
  {#if articleToShow}
    <Article 
      metadata={articles[articleToShow].data}
      content={articles[articleToShow].content}
    />
  {/if}
</div>
