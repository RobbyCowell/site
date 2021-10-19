import Article0Content from './001-the-brief/001-the-brief.md';
import Article0Data from './001-the-brief/001-the-brief-metadata.js';
import Article1Content from './002-the-setup/002-the-setup.md';
import Article1Data from './002-the-setup/002-the-setup-metadata.js';
import Article2Content from './003-the-articles/003-the-articles.md';
import Article2Data from './003-the-articles/003-the-articles-metadata.js';
import Article3Content from './004-the-basics/004-the-basics.md';
import Article3Data from './004-the-basics/004-the-basics-metadata.js';

const articles = {
'001-the-brief': { content: Article0Content, data: Article0Data }
,'002-the-setup': { content: Article1Content, data: Article1Data }
,'003-the-articles': { content: Article2Content, data: Article2Data }
,'004-the-basics': { content: Article3Content, data: Article3Data }
};

export default articles;