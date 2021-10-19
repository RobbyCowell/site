<script>
  export let metadata;
  export let content;
</script>

<div>
  <date>Created on: { metadata.publishDate }</date>
  <p>Slug: { metadata.slug }</p>
  {@html content}
</div>
