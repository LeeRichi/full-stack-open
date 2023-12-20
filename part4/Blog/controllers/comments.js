const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get("/", async (request, response) => {
    const comments = await Comment.find({ blogs: request.params.id });
    console.log(comments)
    response.json(comments);
});

  

module.exports = commentsRouter;