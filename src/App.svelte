<script>
  import { onMount } from 'svelte';

  import Article from "./components/Article.svelte";

  import bio from "../content/bio.md";
  import intro from "../content/intro.md";
  import articles from "./articles/articles.js";

  export let articleToShow = null;

  onMount(() => {
    window.onpopstate = (event) => {
      if (event.state) articleToShow = event.state.article;
    }
  });

  function selectArticle(articleId) {
    let stateObject = {
      article: articleId,
    };

    articleToShow = articleId;

    if (articleId) { 
      history.pushState(stateObject, "", `/articles/${articleId}`);
    } else {
      history.pushState(stateObject, "", "/");
    }
  }
</script>

<div class="container">
  <div class="row">
    <div class="column">
      <h1>Robby Cowell - Software Engineer</h1>

      {#if !articleToShow}
        {@html bio}
        {@html intro}
      {/if}

      {#if articleToShow}
        <a on:click|preventDefault={() => selectArticle(null)} href="../."> Home </a>
      {/if}

      <h2>Articles:</h2>
      <ul>
        {#each Object.keys(articles) as article}
          <li>
            <a
              on:click|preventDefault={ () => selectArticle(article) }
              href="{`articles/${articleToShow}`}"
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
    </div>
  </div>
</div>