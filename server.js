fs = require('fs');

const App = require('./public/build/bundle-ssr.js').default;

const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', async (req, res) => {
  // TODO: Replace the arg to generateHtml with the article param from the request URL
  const page = await generateHtml('001-the-brief');
  console.log(page);
  res.send(page);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const generateHtml = async (articleToShow) => {
  const { html } = App.render({ articleToShow: articleToShow });
  
  // TODO: see if there's a way to do this in one function call
  const template = await fs.promises.readFile('./public/tmp.html', 'utf8');
  const rendered = await template.replace(/\<\!--\$target--\>/g, html);
  const cleaned = await rendered.replace(/file:\/\//g, '');

  // TODO: clean this up
  let final = '';
  if (articleToShow) {
    final = await cleaned.replace(/\$articleToShow/g, `${articleToShow}`);
  } else {
    final = await cleaned.replace(/'\$articleToShow'/g, null);
  }

  return final;
}
