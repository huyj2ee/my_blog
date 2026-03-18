const lemmatizer = require('wink-lemmatizer');
const { convert } = require('html-to-text');

function convertToBaseForm(txt) {
  return txt.replace(/\b\w+\b/g, (w) => {
    let lower = w.toLowerCase();
    let lemma = lemmatizer.verb(lower);
    if (lemma === lower) {
      lemma = lemmatizer.noun(lower);
    }
    if (lemma === lower) {
      lemma = lemmatizer.adjective(lower);
    }
    return lemma;
  });
}

function createBaseTextForBlog(blog) {
  const textContent = convert(blog.content, {
    wordwrap: false,
    selectors: [
      { selector: 'a', options: { ignoreHref: true } }
    ]
  });
  return {
    baseTitle: convertToBaseForm(blog.title),
    baseBrief: convertToBaseForm(blog.brief),
    baseContent: convertToBaseForm(textContent)
  };
}

module.exports = {
  createBaseTextForBlog
};