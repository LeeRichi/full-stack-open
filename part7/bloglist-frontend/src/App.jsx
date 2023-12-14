import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm' 
import BlogForm from './components/BlogForm'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlog } from './reducers/blogReducer'
import { userLogout } from './reducers/userReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
  const [errorMessage, setErrorMessage] = useState('')
  
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blog);
  const user = useSelector(state => state.user)

  console.log(user)
  console.log(blogs)

  useEffect(() => {
    dispatch(initializeBlog()) 
  }, []) 

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const onLogout = () =>
  {
    dispatch(userLogout())    
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
        {/* <BlogForm setBlogs={setBlogs} setErrorMessage={setErrorMessage} /> */}
        <BlogForm setErrorMessage={setErrorMessage} />
        {blogs?.map(blog =>
          // <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user}/>
          <div key={blog.id} className="blog">
            {/* <Blog blog={blog} setBlogs={setBlogs} user={user}/> */}
            {/* <Blog blog={blog} user={user} /> */}
            <Blog blog={blog}/>
          </div>
        )}
      </div>
      : <LoginForm errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
  )
}

export default App
