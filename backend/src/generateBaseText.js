const Blog = require('./dao/Blog');
const { createBaseTextForBlog } = require('./lib/utils');

Blog.findAll()
.then((blogs) => {
  for(const blog of blogs) {
    Blog.update({
      ...blog,
      ...createBaseTextForBlog(blog)
    }, {
      where: {
        slug: blog.slug
      }
    })
    .catch((e) => {console.log(`Generate error for ${blog.slug}.`); console.log(e)});
  }
})
.catch((e) => {console.log('Error query blogs.'); console.log(e)});
