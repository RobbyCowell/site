require('svelte/register')

// import './styles.css';

// import App from './App.svelte';

// const app = new App({
//   target: document.body
// });

// export default app;

// import App from './App.svelte';

// const {css, head, html} = App.render({
//   props: {
//     articleToShow: '001-the-brief'
//   }
// })

// document.querySelector('pre').innerText = html



// const svelteCompiler = require('svelte/compiler');
// const fs = require('fs');
// const path = require('path');

// const pathToComponent = path.join(__dirname, './src/App.svelte');
// const svelteCode = fs.readFileSync(pathToComponent, 'utf8');

// const { js } = svelteCompiler.compile(svelteCode, {
//   generate: 'ssr',
//   hydratable: true,
//   format: 'cjs'
// });

// const pathToSsrCode = path.join(__dirname, 'src/app.ssr.js');
// fs.writeFileSync(pathToSsrCode, js.code, 'utf8');
// const ssrComponent = require(pathToSsrCode).default;

// const { head, html, css } = ssrComponent.render({

// });

// console.log(ssrComponent.render())

const App = require('./public/build/bundle-ssr.js').default;
console.log(App.render({}))