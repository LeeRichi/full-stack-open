import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
	name: 'blog',
	initialState: '',
	reducers:
	{
		setBlogs(state, action)
		{
			return action.payload
		},
		appendBlog(state, action)
		{
  		return [...state, action.payload]
		},
		updateBlog(state, action)
		{
			const updatedBlog = action.payload;
			return state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
		},
		removeBlog(state, action) {
			return state.filter(blog => blog.id !== action.payload);
    }
	}
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const likeBlog = (id) =>
{
	return async (dispatch, getState) =>
	{
		const blogs = getState().blogs

		const blogToLike = blogs.find(blog => blog.id === id);

		const newBlogObj = {...blogToLike, likes: blogToLike.likes + 1}

		const res = await blogService.update(id, newBlogObj)

		dispatch(updateBlog(res))
	}
};

export const addBlog = (newObj) => {
	return async (dispatch) =>
	{
		try
		{
			const res = await blogService.create(newObj)
			dispatch(appendBlog(res))
		} catch (error) {
			console.error(`error adding blog: ${error}`)
		}
	}
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch(removeBlog(id));
      dispatch(setNotification(`Blog with id ${id} deleted successfully`, 'success', 5));
    } catch (error) {
      dispatch(setNotification(`Error deleting blog: ${error.message}`, 'error', 5));
    }
  };
};

export default blogSlice.reducer
