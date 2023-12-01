const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
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

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Title and URL are required' });
  }

  const likes = body.likes !== undefined ? body.likes : 0;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: likes,
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog.toJSON());
})

blogsRouter.delete('/:id', async (request, response) =>
{
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) =>
{
  const body = request.body

  // const blog = new Blog({
  //   title: body.title,
  //   author: body.author,
  //   url: body.url,
  //   likes: body.likes
  // })

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