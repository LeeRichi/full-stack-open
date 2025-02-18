import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from './context/NotificationContext'
import { getAll, setToken, create, update, remove, login } from './request'
import { useUser } from './context/userContext'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Users from './components/Users'
import BlogDetail from './components/BlogDetail'
import MenuItem from '@mui/material/MenuItem';

const App = () =>
{
	const { notification, setErrorMessage } = useNotification()
	const [newBlog, setNewBlog] = useState({
		title: '',
		author: '',
		url: '',
		likes: 0
	})
  const { state, dispatch } = useUser()
	const queryClient = useQueryClient();
	const { data: blogs = [], refetch } = useQuery({
		queryKey: ['blogs'],
		queryFn: getAll,
	});

	useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({ type: 'SET_USER', payload: user });
      setToken(user.token)
    }
  }, [])

	const handleLogin = async (event) =>
	{
		event.preventDefault()
		try
		{
			const user = await login({
        username: state.username,
        password: state.password,
      });
			window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      dispatch({ type: 'SET_USER', payload: user });
      setToken(user.token)
		} catch (exception)
		{
			setErrorMessage('Wrong credentials', 'error')
		}
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
    dispatch({ type: 'LOGOUT' });
  }

	const addBlogMutation = useMutation({
    mutationFn: create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setErrorMessage(`${newBlog.title} by ${newBlog.author} added`, 'success')
    },
    onError: () => {
      setErrorMessage('Error creating blog', 'error')
    },
  });

	const addBlog = async (blogObj) => {
		addBlogMutation.mutate(blogObj)
		setNewBlog({ title: '', author: '', url: '', likes: 0 })
  }

  const addLikesMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) => update(id, updatedBlog),
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: () => {
      setErrorMessage('Error creating blog', 'error')
    },
  })

	const addLikes = async (id) => {
		const blogToUpdate = blogs.find(blog => blog.id === id)
		const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

		addLikesMutation.mutate({id, updatedBlog})
	}

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const onDeleteBlogMutation = useMutation({
    mutationFn: (id) => remove(id),
    onSuccess: () =>
    {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setErrorMessage(`Blog successfully deleted`, 'success')
    },
    onError: (e) =>
    {
      setErrorMessage("Failed to delete blog", 'error')
    }
  })

	const onDeleteBlog = async (id) =>
  {
    console.log(id)
		if (window.confirm("Are you sure you want to delete this blog?"))
		{
			onDeleteBlogMutation.mutate(id)
		}
	};

  return (
    <Router>
      <div>
				<div style={{ display: 'flex' }}>
				<MenuItem>
					<Link to="/blogs" style={{ margin: '0 10px', color: 'blue', textDecoration: 'none' }}>blogs</Link>
					<Link to="/users" style={{ margin: '0 10px', color: 'green', textDecoration: 'none' }}>users</Link>
					{state.user &&
							<div style={{ display: 'flex', alignItems: 'center' }}>
									<span style={{ marginRight: '10px' }}>{state.user.username} logged in</span>
									<button
											onClick={handleLogout}
											style={{ padding: '5px 10px', border: 'none', cursor: 'pointer' }}
									>
											log out
									</button>
							</div>
					}
			</MenuItem>
        </div>
        <Notification notification={notification} />
        {state.user === null ?
          <Togglable buttonLabel="login">
            <LoginForm
              handleLogin={handleLogin}
              />
          </Togglable>
          :
          <Togglable buttonLabel="new blog">
            <BlogForm
              // user={user}
              // handleLogout={handleLogout}
              addBlog={addBlog}
              // newBlog={newBlog}
              // onBlogChange={onBlogChange}
              />
          </Togglable>
        }
      </div>
      <Routes>
        {/* <Route path="/notes" element={<Notes />} /> */}
        <Route
          path="/blogs"
          element={
            <div>
              {sortedBlogs.map((blog) => (
                <Blog key={blog.id} blog={blog} user={state.user} addLikes={addLikes} onDeleteBlog={onDeleteBlog} />
              ))}
            </div>
          }
        />
        {/* {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={state.euser} addLikes={addLikes} onDeleteBlog={onDeleteBlog} />
        )} */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/blogs/:id" element={<BlogDetail blogs={blogs} />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  )
}

export default App
