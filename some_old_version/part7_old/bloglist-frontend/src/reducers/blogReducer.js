import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    like(state, action)
    {      
      const idToLike = action.payload.id;
      const updatedLikes = action.payload.likes;

      const updatedState = state.map(blog =>
        blog.id === idToLike ? { ...blog, likes: updatedLikes } : blog
      );

      return updatedState;
    },
    appendBlog(state, action)
    {
      state.push(action.payload)
    },
    setBlog(state, action) {
      return action.payload
    },
    removeBlog(state, action)
    {
      const idToRemove = action.payload;
      return state.filter(blog => blog.id !== idToRemove);
    },
    addComment(state, action) {
      const { id, comment } = action.payload;

      const blogToUpdate = state.find(blog => blog.id === id);

      if (blogToUpdate) {
        blogToUpdate.comments = [...blogToUpdate.comments, comment];
      }
    },
  }
})

export const { like, appendBlog, setBlog, removeBlog, addComment } = blogSlice.actions;

export const initializeBlog = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}

export const createBlog = obj =>
{
    const newObj = {
        title: obj.title,
        author: obj.author,
        url: obj.url,
        likes: 0,        
    }
  return async dispatch => {
    const newBlog = await blogService.createNew(newObj)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = id =>
{
  return async dispatch => {
    try {
      await blogService.deleteOne(id);
      dispatch(removeBlog(id));
    } catch (error) {
      console.error('An error occurred while deleting the blog:', error);
    }
  };
};

export const addLikes = (blog) =>
{
  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1,        
  }
  
  return async dispatch =>
  {
    const newObj = await blogService.updateOne(blog.id, updatedBlog)
    console.log(newObj)
    dispatch(like(newObj))
  }
}

export const addCommentAsync = (id, comment) => {
  return async dispatch => {
    try {
      const newComment = await blogService.addComment(id, comment);
      dispatch(addComment({ id, comment: newComment }));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
};

export default blogSlice.reducer;