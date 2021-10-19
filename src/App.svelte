<script>
  import Article from './components/Article.svelte'
  import articles from './articles/articles.js';

  let articleToShow = null;

  function selectArticle(articleId) {
    articleToShow = articleId;
    console.log(articles)
  }
</script>

<h1>🏗 The Site 🚧</h1>

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

<div>
  {#if articleToShow}
    <Article 
      metadata={articles[articleToShow].data}
      content={articles[articleToShow].content}
    />
  {/if}
</div>
