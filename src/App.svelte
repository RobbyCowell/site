<script>
  import Article from "./components/Article.svelte";

  import bio from "../content/bio.md";
  import intro from "../content/intro.md";
  import articles from "./articles/articles.js";
import { onMount } from "svelte";

  export let articleToShow = null;

  function selectArticle(articleId) {
    articleToShow = articleId;
  }

  onMount(()=> {
    console.log(`mounting: ${articleToShow}`)
    console.log(articles)
    })
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
        <a on:click={() => selectArticle(null)} href="#home"> Home </a>
      {/if}

      <h2>Articles:</h2>
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
    </div>
  </div>
</div>