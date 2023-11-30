const _ = require('lodash');

const dummy = (blogs) =>
{
    return 1;
}

const totalLikes = (blogPosts) => {
  const sum = (array) => array.reduce((total, current) => total + current, 0);
  
  const likesArray = blogPosts.map(post => post.likes);
  const totalLikesValue = sum(likesArray);

  return totalLikesValue;
};

const favoriteBlog = (blogPosts) => {
  const likesArray = blogPosts.map(post => post.likes);
  const highestLikes = Math.max(...likesArray);
  const favoriteBlogPost = blogPosts.find(post => post.likes === highestLikes);

  if (favoriteBlogPost) {
    return {
      title: favoriteBlogPost.title,
      author: favoriteBlogPost.author,
      likes: favoriteBlogPost.likes,
    };
  } else {
    return null;
  }
};

const mostBlogs = (blogPosts) =>
{
  const authorCounts = _.countBy(blogPosts, 'author');
  const mostBlogsAuthor = _.maxBy(_.keys(authorCounts), (author) => authorCounts[author]);
  if (mostBlogsAuthor) {
    return {
      author: mostBlogsAuthor,
      blogs: authorCounts[mostBlogsAuthor],
    };
  } else {
    return null;
  }
}

const mostLikes = (blogPosts) => {
  const authors = _.groupBy(blogPosts, 'author');

  const mostLikesAuthor = _.maxBy(_.keys(authors), (author) =>
    _.sumBy(authors[author], 'likes')
  );

  if (mostLikesAuthor) {
    const totalLikes = _.sumBy(authors[mostLikesAuthor], 'likes');
    return {
      author: mostLikesAuthor,
      likes: totalLikes,
    };
  } else {
    return null;
  }
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
