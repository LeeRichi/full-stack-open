const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// test('id uniqueness', async () =>
// {
//   // const blogsAtStart = await helper.blogsInDb()
//   // const blogToCheck = blogsAtStart[0]

//   // expect(blogToCheck).toBeDefined();
//   await api
//     .post('/api/blogs')
//     .expect(201)
//     .expect()
// })

test('id property is named id after creating a blog post', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'This is a test blog post.',       
    url: 'www.google.com',
    likes: 10
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const createdBlog = await helper.specificBlogInDb(response.body.id);

  expect(response.body.id).toBeDefined();

  expect(createdBlog.id).toBeDefined();

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length + 1
  )
});

// test('if the likes property is missing from the request, it will default to the value 0.', async() =>
// {
//   const newBlogWithOutLikes = {
//     title: 'Test Blog',
//     author: 'This is a test blog post.',       
//     url: 'www.google.com',
//     // likes: 10
//   };

//   if (newBlogWithOutLikes.likes === undefined)
//   {
//     const response = await api
//       .post('/api/blogs')
//       .send(...newBlogWithOutLikes, likes: 0)
//       .expect(201)
//       .expect('Content-Type', /application\/json/);
//   }
// })

test('if the likes property is missing, it defaults to 0', async () => {
  const newBlogWithoutLikes = {
    title: 'Test Blog',
    author: 'This is a test blog post.',
    url: 'www.google.com',
    // likes property is intentionally omitted
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlogWithoutLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(response.body.likes).toBeDefined();
  expect(response.body.likes).toBe(0);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('if the title or url properties are missing from the request data, backend responds 400', async () =>
{
  const newBlogWithoutProperties = {
    title: 'Test Blog with missing props',
    author: 'This is a test blog post.',
    likes: 20,
  };

  await api
    .post('/api/blogs')
    .send(newBlogWithoutProperties)
    .expect(400)
})

describe('deletion of a note', () =>
{
  test('succeeds with status code 204 if id is valid', async () =>
  { 
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.content)
  })
})

describe('updating of a blog', () => {
  test('succeeds with status code 200 if the blog is successfully updated', async () => {
    const blogsInDb = await helper.blogsInDb();
    const blogToUpdate = blogsInDb[0];

    blogToUpdate.likes = blogToUpdate.likes + 1;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200);
    
    const updatedBlog = await helper.specificBlogInDb(blogToUpdate.id);
    expect(updatedBlog.likes).toBe(blogToUpdate.likes);
  });
});



afterAll(async () => {
  await mongoose.connection.close()
})