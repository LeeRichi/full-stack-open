import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm' 
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlog } from './reducers/blogReducer'
import { userLogout } from './reducers/userReducer'
import { setUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import UserDetail from './components/UserDetail'
import BlogDetail from './components/BlogDetail'
import { Box, Button, Flex, Spacer, Text, VStack, Heading } from '@chakra-ui/react';

const App = () => {
  const [errorMessage, setErrorMessage] = useState('')
  
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blog);
  const user = useSelector(state => state.user)

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
    <Box p={5}>
      <Flex>
        <VStack spacing={4}>          
          <nav>
            <Flex justifyContent="space-between" alignItems="center">
              <Box>
                <ul style={{ listStyle: 'none', display: 'flex', gap: '10px', padding: 0 }}>
                  <li style={{ display: 'flex', alignItems: 'center', borderRight: '1px solid grey', paddingRight: '10px' }}>
                    <Link to="/">Home</Link>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', borderRight: '1px solid grey', paddingRight: '10px' }}>
                    <Link to="/users">
                      <Text>Users</Text>
                    </Link>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center' }}>
                    {user && (
                      <Flex align="center">
                        <Text>{user.username} logged in</Text>
                        <Button onClick={onLogout} ml={2}>
                          Logout
                        </Button>
                      </Flex>
                    )}
                  </li>
                </ul>
              </Box>
            </Flex>
          </nav>
          {user ? (
            <>             
              <Routes>
                <Route path="/" element={<Blog errorMessage={errorMessage} setErrorMessage={setErrorMessage} />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<UserDetail />} />
                <Route path="/blogs/:id" element={<BlogDetail />} />
              </Routes>
            </>
          ) : (
            <LoginForm />
          )}
        </VStack>
        <Spacer />
      </Flex>
    </Box>
  );
}

export default App
