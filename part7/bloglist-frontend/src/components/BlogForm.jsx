import { useState, useEffect, useRef } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable';
import { useDispatch } from 'react-redux';
import { appendBlog, createBlog, setBlog } from '../reducers/blogReducer';

// const BlogForm = ({ setBlogs, setErrorMessage }) => {
  const BlogForm = ({ setErrorMessage }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

    // const noteFormRef = useRef()
  const dispatch = useDispatch();

  const handleCreate = (e) => {
    e.preventDefault();
    const newBlog = { title, author, url }
      blogService
        .createNew(newBlog)
        .then(returnedBlog =>
        {
          dispatch(createBlog(returnedBlog))
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
              id='title-input'
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
              id='author-input'
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
              id='url-input'
            />
          </div>
          <button type="submit" id="create-btn">create</button>
        </form>
      </div>
    </Togglable>
  );
};

export default BlogForm;
