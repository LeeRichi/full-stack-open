import Togglable from "./Togglable"
import blogService from "../services/blogs"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addLikes, deleteBlog } from "../reducers/blogReducer"

const Blog = ({ blog, }) =>
{
  const user = useSelector((state) => state.user)
  const [latestBlog, setLatestBlog] = useState(blog);
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const onLikePlusOne = async() =>
  {
    dispatch(addLikes(blog))
  }

  const onBlogDelete = () =>
  {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.user?.username}`))
    {
      dispatch(deleteBlog(blog.id))
    }
  }

  useEffect(() => {
    setLatestBlog(blog);
  }, [blog]);

  return (
    <div style={blogStyle}>
      <div>
        Title: {blog.title}<br />
        Author: {blog.author}
        <Togglable buttonLabel="view" hideLabel="hide">
          Url: {blog.url}<br />
          Likes: {blog.likes}
          <button onClick={() => {
            onLikePlusOne();
          }}>like</button>
          <br />
          {blog.user?.id === user.id ? <button onClick={onBlogDelete}>delete</button> : null}
        </Togglable>
      </div>      
    </div>
  )
}

export default Blog