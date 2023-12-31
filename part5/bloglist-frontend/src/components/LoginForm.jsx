import { useState } from "react"
import loginService from '../services/login'
import blogService from '../services/blogs'
import '../index.css'

const LoginForm = ({setUser, errorMessage, setErrorMessage}) =>
{
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  const handleLogin = async (event) =>
  { 
    event.preventDefault()
    
    try
    {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception)
    {
      console.log(exception)
      setErrorMessage({
        message: 'wrong username or password',
        type: 'error'
      })
      setTimeout(() =>
      {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>login to application</h1>
      {errorMessage && (
        <div className={`message ${errorMessage.type}`}>
          {errorMessage.message}
        </div>
      )}
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">login</button>
    </form>
  )
}
  
export default LoginForm