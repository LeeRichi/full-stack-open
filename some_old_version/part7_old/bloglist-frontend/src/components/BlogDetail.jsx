import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addLikes } from '../reducers/blogReducer';
import CommentForm from './CommentForm';
import { Box, Heading, Link, Text, Button } from '@chakra-ui/react';

const BlogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blog);
  const matchedBlog = blogs.find((blog) => blog.id == id);
  const blogComments = matchedBlog.comments?.map((comment) => comment.content);

  if (!matchedBlog) {
    return <div>Blog not found</div>;
  }

  const handleLike = () => {
    dispatch(addLikes(matchedBlog));
  };

  return (
    <Box>
      {matchedBlog.url && (
        <Link href={matchedBlog.url} target="_blank" rel="noopener noreferrer">
          {matchedBlog.url}
        </Link>
      )}
      <Heading as="h2" size="xl">
        {matchedBlog.title}
      </Heading>
      <Text>
        Likes: {matchedBlog.likes}
        <Button ml={2} onClick={handleLike}>
          Like
        </Button>
      </Text>
      <Text>Added by: {matchedBlog.author}</Text>
      <Heading as="h3" size="lg">
        Comments
      </Heading>
      <CommentForm />
      <ul>
        {blogComments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </Box>
  );
};

export default BlogDetail;
