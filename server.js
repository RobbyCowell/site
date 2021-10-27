require('svelte/register')

const App = require('./public/build/bundle-ssr.js').default;

// const { head, html, css } = App.render({

// });

console.log(App.render({}))