const axios = require('axios').default;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = async () => {
  const response = await axios.get('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@mattclaffey')
    .catch(error => console.error(error));

  const performanceRelatedPosts = response.data.items.filter(({ categories }) => {
    const performanceTags = ['performance', 'web-performance', 'pwa', 'amp', 'progressive-web-app', 'offline-first'];
    const hasPerformanceTags = categories.some(category => performanceTags.indexOf(category) !== -1);

    return hasPerformanceTags;
  }).map(post => {
    const newPost = { ...post };
    const date = new Date(newPost.pubDate);
    newPost.pubDate = date;

    const dom = new JSDOM(`<!DOCTYPE html> ${newPost.content}`);
    const intro = dom.window.document.querySelector('p:not(.medium-feed-image)').outerHTML;

    newPost.shortDescription = intro.replace(/<img[^>]*>/g,"").replace(/<figure.*>.*?<\/figure>/ig,'');

    return newPost;
  });

  return {
    posts: performanceRelatedPosts,
  };
};
