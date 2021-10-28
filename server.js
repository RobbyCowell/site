fs = require('fs');
const http = require('http');

const App = require('./public/build/bundle-ssr.js').default;

const listener = async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const page = await generateHtml('004-the-basics');
  res.end(page);
}

const generateHtml = async (articleToShow) => {
  const { html } = App.render({ articleToShow });
  const template = await fs.promises.readFile('./public/index.html', 'utf8');
  return template.replace(/\<\!--\$target--\>/g, html);
}

const server = http.createServer(listener);
server.listen(8080);

// fs.readFile('./public/index.html', 'utf-8', (err, data) => {
//   if (err) throw err;

//   data = data.replace(/\<\!--\$target--\>/g, html);

//   // TODO: replace this with server-side response
//   // compileSSRHtml(data, true);
// });

// const compileSSRHtml = (data, writeTestFile) => {
//   console.log(data);

//   if (writeTestFile) {
//     fs.writeFile('./public/index-test.html', data, 'utf-8', (err) => {
//       if (err) throw err;
//       console.log('The file has been saved!');
//     });
//   }
// }
