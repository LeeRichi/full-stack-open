import { useState } from 'react';
import { Input, Button, FormControl, FormLabel, VStack } from '@chakra-ui/react';
import Togglable from './Togglable';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';

const BlogForm = ({ setErrorMessage }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const handleCreate = (e) => {
    e.preventDefault();
    const newBlog = { title, author, url };
    blogService
      .createNew(newBlog)
      .then((returnedBlog) => {
        dispatch(createBlog(returnedBlog));
        setTitle('');
        setAuthor('');
        setUrl('');
        setErrorMessage({
          message: `New blog ${title} by ${author} added`,
          type: 'success',
        });
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      })
      .catch((err) => {
        setErrorMessage({ message: err, type: 'error' });
        console.error('Error creating: ', err);
      });
  };

  return (
    <Togglable buttonLabel="new blog" hideLabel="cancel">
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Title:</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title-input"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Author:</FormLabel>
          <Input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author-input"
          />
        </FormControl>
        <FormControl>
          <FormLabel>URL:</FormLabel>
          <Input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="url-input"
          />
        </FormControl>
        <Button
          type="submit"
          id="create-btn"
          onClick={handleCreate}
          size="md"
          width="100%"
        >
          Create
        </Button>
      </VStack>
    </Togglable>
  );
};

export default BlogForm;
