import Togglable from "./Togglable"
import blogService from "../services/blogs"
import { useState, useEffect } from "react"

const Blog = ({ blog, setBlogs, user, mockHandler }) =>
{
  const [latestBlog, setLatestBlog] = useState(blog);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const onLikePlusOne = async() =>
  {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1
    });

    setLatestBlog(updatedBlog);

    setBlogs((prevBlogs) =>
      prevBlogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
    );  
  }

  const onBlogDelete = () =>
  {
    blogService.remove(blog.id)
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
          Likes: {latestBlog.likes}
          {/* <button onClick={onLikePlusOne} className="btnTest">like</button>           */}
          <button onClick={() => {
            onLikePlusOne();
            mockHandler();
          }}>like</button>
          <br />
          {blog.user?.username === user.username ? <button onClick={onBlogDelete}>delete</button> : null}
        </Togglable>
      </div>      
    </div>
  )
}

export default Blog