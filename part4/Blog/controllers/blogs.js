const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) =>
{
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async(request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id)
  {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = request.user;

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Title and URL are required' });
  }

  const likes = body.likes !== undefined ? body.likes : 0;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog.toJSON());
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Token invalid or missing' });
  }

  const user = request.user;
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' });
  }

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(403).json({ error: 'You do not have the right to delete this blog' });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
  
});

blogsRouter.put('/:id', async (request, response) =>
{
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  if (!updatedBlog) {
    return response.status(404).json({ error: 'Blog not found' });
  }
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter