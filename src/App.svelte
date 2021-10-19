<script>
  import Article from './components/Article.svelte'
  
  import bio from '../content/bio.md'
  import intro from '../content/intro.md';
  import articles from './articles/articles.js';

  let articleToShow = null;

  function selectArticle(articleId) {
    articleToShow = articleId;
  }
</script>

<h1>Robby Cowell - 🏗 The Site 🚧</h1>

{@html bio}
{@html intro}

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
