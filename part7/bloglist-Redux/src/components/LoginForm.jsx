import React from 'react'

	const LoginForm = ({handleLogin, username, setUsername, password, setPassword}) => (
    <form onSubmit={handleLogin}>
      <div>
      	<label>Username</label>
				<input
					type="text"
					id="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
      	<label>Password</label>
				<input
					type="password"
					id="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
	)

export default LoginForm
