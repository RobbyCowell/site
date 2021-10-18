import Article0, { data as Article0Data } from './001-the-brief/001-the-brief.svelte'; 
import Article1, { data as Article1Data } from './002-the-setup/002-the-setup.svelte'; 
import Article2, { data as Article2Data } from './003-the-articles/003-the-articles.svelte'; 
import Article3, { data as Article3Data } from './004-the-basics/004-the-basics.svelte'; 
import Article4, { data as Article4Data } from './test-article/test-article.svelte'; 

const articles = {
'001-the-brief': { content: Article0, data: Article0Data }
,'002-the-setup': { content: Article1, data: Article1Data }
,'003-the-articles': { content: Article2, data: Article2Data }
,'004-the-basics': { content: Article3, data: Article3Data }
,'test-article': { content: Article4, data: Article4Data }
};

export default articles;