import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm' 
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
    {
      const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const onLogout = () =>
  {
    setUser('')
    window.localStorage.clear();
  }

  return (
    user ?
      <div>
        <h2>blogs</h2>
        {errorMessage && (
          <div className={`message ${errorMessage.type}`}>
            {errorMessage.message}
          </div>
        )}
        {user.username} logged in <button onClick={onLogout}>logout</button>
        <BlogForm setBlogs={setBlogs} setErrorMessage={setErrorMessage} />
        {blogs?.map(blog =>
          // <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user}/>
          <div key={blog.id} className="blog">
            <Blog blog={blog} setBlogs={setBlogs} user={user}/>
          </div>
        )}
      </div>
      : <LoginForm setUser={setUser} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
  )
}

export default App
