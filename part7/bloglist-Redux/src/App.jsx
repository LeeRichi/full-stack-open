import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, likeBlog, deleteBlog, addBlog } from './reducers/blogReducer'
import { storeLoggedInUser } from './reducers/userReducer'
import { setUser } from './reducers/userReducer'

const App = () =>
{
	const dispatch = useDispatch()
	const store_blogs = useSelector(state => state.blogs)
	const store_user = useSelector(state => state.user)
	console.log(store_user)
	console.log(store_blogs)
	const [blogs, setBlogs] = useState([])
	const [newBlog, setNewBlog] = useState({
		title: '',
		author: '',
		url: '',
		likes: 0
	})
	// const [notification, setNotification] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	// const [user, setUser] = useState(null)

	const setErrorMessage = (message, type) =>
	{
		dispatch(setNotification(message, type, 5))
		//old
		// setNotification({ message, type })
		// setTimeout(() => setNotification(null), 5000)
	}

  useEffect(() => {
    dispatch(initializeBlogs())
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		console.log(loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

	const handleLogin = async (event) =>
	{
		event.preventDefault()
		dispatch(storeLoggedInUser({ username, password }))
		// setUser(user)
		setUsername('')
		setPassword('')
		// try
		// {
		// 	const user = await loginService.login({
		// 		username, password,
		// 	})
		// 	window.localStorage.setItem(
    //     'loggedBlogappUser', JSON.stringify(user)
    //   )
    //   blogService.setToken(user.token)
		// 	setUser(user)
		// 	setUsername('')
		// 	setPassword('')
		// } catch (exception)
		// {
		// 	setErrorMessage('Wrong credentials', 'error')
		// }
	}

	// const onBlogChange = (event) => {
	// 	const { name, value } = event.target
	// 	setNewBlog(prevBlog => ({
	// 		...prevBlog,
	// 		[name]: value,
	// 	}))
	// }

	const handleLogout = (e) =>
	{
		window.localStorage.removeItem('loggedBlogappUser')
		dispatch(setUser(null))
	}

	const onAddBlog = async (blogObj) =>
	{
		dispatch(addBlog(blogObj))
		// try {
		// 	const createdBlog = await blogService.create(blogObj)
		// 	setBlogs([...blogs, createdBlog])
		// 	setNewBlog({ title: '', author: '', url: '', likes: 0 })
		// 	setErrorMessage(`${blogObj.title} by ${blogObj.author} added`, 'success')
		// } catch (error) {
		// 	console.error('Error creating blog:', error)
		// 	setErrorMessage('Error creating blog', 'error')
		// }
	}

	const addLikes = async (id) => {
		// const blogToUpdate = blogs.find(blog => blog.id === id)
		// const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

		// try {
		// 	await blogService.update(id, updatedBlog)
		// 	setBlogs(blogs.map(blog => blog.id === id ? updatedBlog : blog))
		// } catch (error) {
		// 	console.error(error)
		// }
		dispatch(likeBlog(id))
	}

	const sortedBlogs = [...store_blogs].sort((a, b) => b.likes - a.likes)

	const onDeleteBlog = async (id) =>
	{
		if (window.confirm("Are you sure you want to delete this blog?"))
		{
			dispatch(deleteBlog(id))
			// try {
			// 	await blogService.remove(id)
			// 	setBlogs(blogs.filter(blog => blog.id !== id))
			// 	setErrorMessage(`Blog ${id} successfully deleted`, 'success')
			// } catch (error) {
			// 	console.error("Error deleting blog:", error)
			// 	setErrorMessage("Failed to delete blog", 'error')
			// }
		}
	};

  return (
    <div>
			<h2>blogs</h2>
			{store_user &&
				<div>{store_user.username} logged in
					<button onClick={handleLogout}>log out</button>
				</div>
			}
			<Notification />
			{store_user === null ?
				<Togglable buttonLabel="login">
					<LoginForm
						handleLogin={handleLogin}
						username={username}
						setUsername={setUsername}
						password={password}
						setPassword={setPassword}
					/>
				</Togglable>
				:
				<Togglable buttonLabel="new blog">
					<BlogForm
						// user={user}
						// handleLogout={handleLogout}
						onAddBlog={onAddBlog}
						// newBlog={newBlog}
						// onBlogChange={onBlogChange}
					/>
				</Togglable>
			}
			{sortedBlogs.map(blog =>
				<Blog key={blog.id} blog={blog} user={store_user} addLikes={addLikes} onDeleteBlog={onDeleteBlog} />
      )}
    </div>
  )
}

export default App
