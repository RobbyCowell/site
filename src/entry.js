import './styles.css';

import App from './App.svelte';

const app = new App({
  target: document.body,
  props: { articleToShow: document.app.articleToShow },
  hydrate: true
});

export default app;