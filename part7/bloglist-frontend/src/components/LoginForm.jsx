import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from "../reducers/userReducer";
import { Box, Button, Heading, Input, VStack } from '@chakra-ui/react';

const LoginForm = ({ errorMessage, setErrorMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(userLogin(username, password));
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log(exception);
      setErrorMessage({
        message: 'Wrong username or password',
        type: 'error'
      });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <VStack spacing={4} align="center" justify="center">
      <Heading as="h1" size="lg">
        Login to Application
      </Heading>
      {errorMessage && (
        <Box color="red.500" p={4} bg="red.100" borderRadius="md">
          {errorMessage.message}
        </Box>
      )}
      <Box>
        <label htmlFor="username">Username</label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </Box>
      <Box>
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </Box>
      <Button type="submit" colorScheme="teal" onClick={handleLogin}>
        Login
      </Button>
    </VStack>
  );
};

export default LoginForm;
