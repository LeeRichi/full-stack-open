import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

import { vi } from 'vitest' // ✅ Import vi from Vitest

test('renders content and url/likes should not show initially', () => {
  const blog = {
    author: 'Component testing is done with react-testing-library',
    title: 'title',
    likes: 0,
    url: 'yoyoyo'
  }

  render(<Blog blog={blog} />)

  const likes = screen.queryByText('likes')
  expect(likes).not.toBeInTheDocument()

  const url = screen.queryByText('url')
  expect(url).not.toBeInTheDocument()
})

test('when click the btn, likes and url shows', () => {
  const blog = {
    author: 'Component testing is done with react-testing-library',
    title: 'title',
    likes: 0,
    url: 'yoyoyo'
	}

  render(<Blog blog={blog}/>)

  const button = screen.getByText('view')
	fireEvent.click(button)

  const likes = screen.queryByTestId('blog-likes')
  expect(likes).toBeInTheDocument()

  const url = screen.getByText('yoyoyo')
	expect(url).toBeInTheDocument()
})


test('when click the like btn twice, prop has to be called twice', () => {
  const blog = {
    author: 'Component testing is done with react-testing-library',
    title: 'title',
    likes: 0,
    url: 'yoyoyo'
  }

  const addLikesMock = vi.fn() // ✅ Use vi.fn() for Vitest

	render(<Blog blog={blog} addLikes={addLikesMock} />)

  const viewButton = screen.getByText('view')
  fireEvent.click(viewButton)

	const likeButton = screen.getByText('like')
	fireEvent.click(likeButton)
	fireEvent.click(likeButton)

  expect(addLikesMock).toHaveBeenCalledTimes(2)
})

test('new blog form calls addBlog with the right details when submitted', async () => {
  const addBlogMock = vi.fn(); // ✅ Mock function for addBlog

  render(<BlogForm addBlog={addBlogMock} />);

  // Get input fields and button
  const titleInput = await screen.queryByTestId('title'); // Finds input by its label text
  const authorInput = await screen.queryByTestId('author');
  const urlInput = await screen.queryByTestId('url');
  const sendButton = screen.getByText('create'); // Finds the 'create' button

  // Type in the input fields
  await userEvent.type(titleInput, 'Blog title');
  await userEvent.type(authorInput, 'Author name');
  await userEvent.type(urlInput, 'http://example.com');

  // Submit the form
  await userEvent.click(sendButton);

  // Check if addBlogMock was called with correct data
  expect(addBlogMock).toHaveBeenCalledTimes(1);
  const mockData = addBlogMock.mock.calls[0][0]; // First argument of the first call
  expect(mockData.title).toBe('Blog title');
  expect(mockData.author).toBe('Author name');
  expect(mockData.url).toBe('http://example.com');
});
