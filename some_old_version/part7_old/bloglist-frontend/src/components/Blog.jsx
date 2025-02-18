import Togglable from "./Togglable"
import blogService from "../services/blogs"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addLikes, deleteBlog } from "../reducers/blogReducer"
import { Link } from "react-router-dom"
import { Box, Link as ChakraLink, Button, Heading } from '@chakra-ui/react';
import BlogForm from "./BlogForm"



const Blog = ({errorMessage, setErrorMessage}) =>
{
  const blogs = useSelector(state => state.blog);
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    margin: '10px'
  }

  const onLikePlusOne = async() =>
  {
    dispatch(addLikes(blog))
  }

  const onBlogDelete = () =>
  {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.user?.username}`))
    {
      dispatch(deleteBlog(blog.id))
    }
  }
  
  return (
    <>
      <Heading as="h2" size="xl">
        blogs
      </Heading>
      {errorMessage && (
        <Box color="red.500" p={4} bg="red.100" borderRadius="md">
          {errorMessage.message}
        </Box>
      )}
      <BlogForm setErrorMessage={setErrorMessage} />
      <Box p={10} marginBottom={5}>           
        {blogs.map((blog) =>
          <ChakraLink as={Link} to={`/blogs/${blog.id}`} borderWidth={1} width="200px" fontWeight="bold" fontSize="lg" mb={2} display="block">
            {blog.title}
          </ChakraLink>
        )}
      </Box>
    </>
  )
}

export default Blog