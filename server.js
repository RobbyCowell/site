fs = require('fs');

const App = require('./public/build/bundle-ssr.js').default;

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', async (req, res) => {
  const page = await generateHtml();
  res.send(page);
});

app.get('/articles/:articleId', async (req, res) => {
  const articleId = req.params.articleId;

  const page = await generateHtml(articleId);
  res.send(page);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

const generateHtml = async (articleToShow) => {
  let output;

  const { html } = App.render({ articleToShow: articleToShow });
  
  const template = await fs.promises.readFile('./scripts/templates/ssr.html', 'utf8');

  output = await template.replace(/\<\!--\$target--\>/g, html);
  output = await output.replace(/file:\/\//g, '');

  if (articleToShow) {
    output = await output.replace(/\$articleToShow/g, `${articleToShow}`);
  } else {
    output = await output.replace(/'\$articleToShow'/g, null);
  }

  return output;
};
