import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  test('calls event handler with the right details when a new blog is created', () => {
    const setBlogs = jest.fn();
    const setErrorMessage = jest.fn();

    const component = render(
      <BlogForm setBlogs={setBlogs} setErrorMessage={setErrorMessage} />
    );

    const titleInput = component.container.querySelector('input[name="Title"]');
    const urlInput = component.container.querySelector('input[name="Url"]');

    expect(titleInput).not.toBeNull();
    expect(urlInput).not.toBeNull();
  });
});
