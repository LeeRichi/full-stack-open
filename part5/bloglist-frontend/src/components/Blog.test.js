import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import Blog from './Blog';

describe('Blog component', () => {
  test('renders blog title and author by default', () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 10,
    };

    render(<Blog blog={blog} setBlogs={() => {}} user={{ username: 'testuser' }} />);

    expect(screen.getByText(/Title: Test Blog/)).toBeInTheDocument();
    expect(screen.getByText(/Author: Test Author/)).toBeInTheDocument();

    expect(screen.getByText(/Url:/)).toHaveStyle({ display: 'none' });
    expect(screen.getByText(/Likes:/)).toHaveStyle({ display: 'none' });
  });

  test('shows URL and likes when "view" button is clicked', async() => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 10,
    };

    const mockHandler = jest.fn()

    render(<Blog blog={blog} setBlogs={() => { }} user={{ username: 'testuser' }} mockHandler={mockHandler} />);

    const user = userEvent.setup()
    const button = screen.getByText(/view/)
    await user.click(button)

    expect(screen.getByText(/Url:/)).toBeInTheDocument();
    expect(screen.getByText(/Likes:/)).toBeInTheDocument();
  });


  test('If the like button is clicked, mockHandler should be called', async () => {
    const blog = {
      id: 1,
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 10,
    };

    const mockHandler = jest.fn();

    render(<Blog blog={blog} setBlogs={() => {}} user={{ username: 'testuser' }} mockHandler={mockHandler} />);

    fireEvent.click(screen.getByText(/like/));
    fireEvent.click(screen.getByText(/like/));

    expect(mockHandler).toHaveBeenCalledTimes(2);
  });
})
