// import React, { useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { getOneBlog, postComment } from '../request'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { v4 as uuidv4 } from 'uuid';

// const BlogDetail = () =>
// {
// 	const [comment, setComment] = useState('')
// 	const { id } = useParams()
// 	const queryClient = useQueryClient();

// 	const { data: blog, isLoading, error } = useQuery({
// 		queryKey: ['blog', id],
// 		queryFn: () => getOneBlog(id),
// 	});

// 	const postCommentMutation = useMutation({
// 		mutationFn: (newComment) => postComment(id, newComment),
// 		onSuccess: () => {
// 			queryClient.invalidateQueries(['blog', id]);
// 		},
// 		onError: (error) => {
// 			// Handle error
// 			console.error('Error posting comment:', error);
// 		},
// 	});


// 	const handleComments = async (e) => {
// 		e.preventDefault();
// 		postCommentMutation.mutate({comment});
// 		setComment('');
// 	};

// 	if (isLoading) {
// 		return <div>Loading...</div>;
//   }

//   if (error) {
// 		return <div>Error fetching blog details</div>;
// 	}

// 	return (
// 		<>
// 			<div>{blog.title}</div>
// 			<div>{blog.url}</div>
// 			<div>{blog.likes}</div>
// 			<div>{blog.user.length !== 0 && blog.user[0]}</div>
// 			<form onSubmit={handleComments}>
// 				<input type="text" name="comment" value={comment} onChange={(e) => setComment(e.target.value)}/>
// 				<button type='sumbit'>add comment</button>
// 			</form>
// 			<div>{blog.comments.map(comment => <li key={uuidv4()}>{comment}</li>)}</div>
// 		</>
// 	)
// }

// export default BlogDetail

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneBlog, postComment } from '../request';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TextField, Button, Typography, List, ListItem, ListItemText, Paper, Box } from '@mui/material';

const BlogDetail = () => {
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: blog, isLoading, error } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => getOneBlog(id),
  });

  const postCommentMutation = useMutation({
    mutationFn: (newComment) => postComment(id, newComment),
    onSuccess: () => {
      queryClient.invalidateQueries(['blog', id]);
    },
    onError: (error) => {
      console.error('Error posting comment:', error);
    },
  });

  const handleComments = async (e) => {
    e.preventDefault();
    postCommentMutation.mutate({ content: comment });
    setComment('');
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error fetching blog details</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h4">{blog.title}</Typography>
      <Typography variant="body1" gutterBottom>{blog.url}</Typography>
      <Typography variant="body2" color="textSecondary">Likes: {blog.likes}</Typography>
      <Typography variant="body2" color="textSecondary">{blog.user.length !== 0 && blog.user[0].username}</Typography>

      <Box component="form" onSubmit={handleComments} sx={{ marginTop: 2 }}>
        <TextField
          label="Add Comment"
          variant="outlined"
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>Add Comment</Button>
      </Box>

      <List sx={{ marginTop: 2 }}>
        {blog.comments.map((comment, index) => (
          <ListItem key={index}>
            <ListItemText primary={comment.content} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default BlogDetail;

