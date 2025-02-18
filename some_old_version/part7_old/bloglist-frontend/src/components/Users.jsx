import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeUsers } from '../reducers/usersReducer';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  VStack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <VStack align="start" spacing={4}>
      <Heading as="h2" size="xl">
        Users
      </Heading>
      <Table>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Blogs Created</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users?.map((user) => (
            <Tr key={user.id}>
              <Td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </Td>
              <Td>{user.blogs.length}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default Users;
