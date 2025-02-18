import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { VStack, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';

const UserDetail = () => {
  const { id } = useParams();

  const users = useSelector((state) => state.users);
  const matchedUser = users.find((user) => user.id == id);
  const usersBlogs = matchedUser.blogs.flatMap((blog) => blog);

  if (!matchedUser) {
    return <div>User not found</div>;
  }

  return (
    <VStack align="start" spacing={4}>
      <Heading as="h2" size="xl">
        User Detail
      </Heading>
      <Text>ID: {matchedUser.id}</Text>
      <Text>Username: {matchedUser.username}</Text>
      <Text>Blogs Created:</Text>
      <ul>
        {usersBlogs.map((blog) => (
          <ChakraLink as={Link} to={`/blogs/${blog.id}`} key={blog.id}>
            <li>{blog.title}</li>
          </ChakraLink>
        ))}
      </ul>
    </VStack>
  );
};

export default UserDetail;
