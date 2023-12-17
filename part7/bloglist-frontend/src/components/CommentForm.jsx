import React, { useState } from 'react';
import { Input, Button, Text, VStack } from '@chakra-ui/react';
import { addCommentAsync } from '../reducers/blogReducer';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const CommentForm = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const [error, setError] = useState(null);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    try {
      dispatch(addCommentAsync(id, comment));
      setComment('');
      setError(null);
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('Failed to add comment. Please try again.');
    }
  };

  return (
    <VStack align="stretch" spacing={4}>
      <Input
        type="text"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        placeholder="Add a comment..."
      />
      <Button type="submit" onClick={handleCreate} colorScheme="teal">
        Add Comment
      </Button>
      {error && <Text color="red">{error}</Text>}
    </VStack>
  );
};

export default CommentForm;
