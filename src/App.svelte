<script>
  import articles from './articles/articles.js';

  let articleToShow = null;

  function selectArticle(articleId) {
    articleToShow = articleId;
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
    <h3>Slug: {articles[articleToShow].data.slug}</h3>
    <svelte:component this={articles[articleToShow].content} />
  {/if}
</div>
