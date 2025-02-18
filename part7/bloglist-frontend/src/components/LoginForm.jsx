import React from 'react';
import { useUser } from '../context/userContext';

const LoginForm = ({ handleLogin }) => {
  const { state, dispatch } = useUser();

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Username</label>
        <input
          type="text"
          id="username"
          value={state.username}
          name="Username"
          onChange={(e) => dispatch({ type: 'SET_USERNAME', payload: e.target.value })}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          id="password"
          value={state.password}
          name="Password"
          onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  );
};

export default LoginForm;
