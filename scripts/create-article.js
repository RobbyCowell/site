fs = require('fs');

const articlesPath = './src/articles/';
const templatesPath = './scripts/templates/';

createArticle = () => {
  //Get name
  const args = process.argv.slice(2);
  const articleName = args[0];

  const articlePath = articlesPath + articleName;

  // Create article directory
  fs.mkdir(articlePath, (err) => {
    if (err) throw err;
  });

  createMetadata(articleName, articlePath);
  createMarkdown(articleName, articlePath);

  refreshArticles();
}

createMetadata = (articleName, articlePath) => {
  const metadataFilePath = `${articlePath}/${articleName}-metadata.js`;

  fs.readFile(`${templatesPath}article-metadata-template.js`, 'utf-8', (err, data) => {
    if (err) throw err;

    data = data.replace(/\$date/g, new Date(Date.now()));
    data = data.replace(/\$slug/g, articleName);

    fs.writeFile(metadataFilePath, data, (err) => { 
      if (err) throw err;

      console.log(`Metadata file created: ${metadataFilePath}`);
    });
  });
}

createMarkdown = (articleName, articlePath) => {
  const mdFilePath = `${articlePath}/${articleName}.md`;

  fs.readFile(`${templatesPath}article-markdown-template.md`, 'utf-8', (err, data) => {
    if (err) throw err;

    data = data.replace(/\$articleName/g, articleName);

    fs.writeFile(mdFilePath, data, (err) => { 
      if (err) throw err;

      console.log(`MD file created: ${mdFilePath}`);
    });
  });
}

refreshArticles = () => {
  let data;
  
  const articles = fs.readdirSync(articlesPath, { withFileTypes: true })
    .filter(dirEntry => dirEntry.isDirectory())
    .map(dirEntry => dirEntry.name);

  const importStatements = articles.map((article, index) => {
    return `import Article${index}Content from './${article}/${article}.md';\nimport Article${index}Data from './${article}/${article}-metadata.js';\n`
  });

  const articlesObject = articles.map((article, index) => {
    return `'${article}': { content: Article${index}Content, data: Article${index}Data }\n`
  });

  data = `${importStatements.join('')}\n`;
  data += `const articles = {\n${articlesObject}};\n`;
  data += `\nexport default articles;`;

  console.log(data)

  fs.writeFile(`${articlesPath}articles.js`, data, (err) => { 
    if (err) throw err;

    console.log('Articles.js updated');
  });
}

createArticle();
