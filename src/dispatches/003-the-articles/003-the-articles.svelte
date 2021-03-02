<script>
  import metadata from './elements/003-the-articles-metadata.js';
  import article from './elements/003-the-articles.md';
</script>

<div>
  <p>Date: {metadata.publishDate}</p>
  <p>Slug: {metadata.slug}</p>
  <p>Permalink: {metadata.permalink}</p>

  {@html article}
</div>