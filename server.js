fs = require('fs');
require('svelte/register')

const App = require('./public/build/bundle-ssr.js').default;

const { html, css } = App.render({articleToShow: '001-the-brief'});

fs.readFile('./public/index.html', 'utf-8', (err, data) => {
  if (err) throw err;

  data = data.replace(/\<\!--\$target--\>/g, html);

  // TODO: replace this with server-side response
  compileSSRHtml(data, true);
});

const compileSSRHtml = (data, writeTestFile) => {
  console.log(data);

  if (writeTestFile) {
    fs.writeFile('./public/index-test.html', data, 'utf-8', (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  }
}
