import { useState, useEffect, useRef } from 'react'
import blogService from '../services/blogs'
import '../index.css'
import Togglable from './Togglable';

const BlogForm = ({ setBlogs, setErrorMessage }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  // const noteFormRef = useRef()

  const handleCreate = (e) => {
    e.preventDefault();
    const newBlog = { title, author, url }
      blogService
        .create(newBlog)
        .then(returnedBlog =>
        {
            setBlogs((prevBlogs) => [...prevBlogs, returnedBlog]);
            setTitle('');
            setAuthor('');
            setUrl('');
            setErrorMessage({
                message: `New blog ${title} by ${author} added`,
                type: 'success',
            });
            setTimeout(() =>
            {
                setErrorMessage(null)
            }, 5000)
        }).catch(err =>
        {
            setErrorMessage({ message: err, type: 'error' });
            console.error('Error creating: ', err)
        })
  };

  return (
    // <Togglable buttonLabel="new blog" ref={noteFormRef}>
    <Togglable buttonLabel="new blog" hideLabel="cancel">
      <div>
        <h1>create new blog</h1>
        <form onSubmit={handleCreate}>
          <div>
            title:
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    </Togglable>
  );
};

export default BlogForm;
