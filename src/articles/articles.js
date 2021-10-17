import One, { data as articleOneData } from './001-the-brief/001-the-brief.svelte';
import Two, { data as articleTwoData } from './002-the-setup/002-the-setup.svelte';
import Three, { data as articleThreeData } from './003-the-articles/003-the-articles.svelte';

const articles = {
  'one': { content: One, data: articleOneData },
  'two': { content: Two, data: articleTwoData },
  'three': { content: Three, data: articleThreeData }
};

export default articles;