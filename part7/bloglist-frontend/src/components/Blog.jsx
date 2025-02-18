// import Togglable from "./Toggleable"
// import blogService from '../services/blogs'
// import { Link } from "react-router-dom"

// const Blog = ({ blog, user, addLikes, onDeleteBlog }) =>
// {
// 	const blogStyle = {
// 		paddingTop: 10,
// 		paddingLeft: 2,
// 		border: 'solid',
// 		borderWidth: 1,
// 		marginBottom: 5
// 	}
// 	return (
// 		<div style={blogStyle} id="blog" className="blog">
// 			<Link to={`/blogs/${blog.id}`}>
// 				{blog.title}
// 			</Link>
// 			<Togglable buttonLabel='view'>
// 				{blog.url}
// 				<br/>
//         <p data-testid="blog-likes">
// 					{blog.likes}
// 					<button id="like" onClick={() => addLikes(blog.id)}>like</button>
// 				</p>
// 				{ user && blog.user.length !== 0 && blog.user[0].username === user.username ?
// 					<button id="delete" onClick={() => onDeleteBlog(blog.id)}>delete</button>
// 					:
// 					null
// 				}
// 			</Togglable>
// 			{blog.author}
// 		</div>
// 	)
// }

// export default Blog

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import Togglable from "./Toggleable";
import blogService from '../services/blogs';

const Blog = ({ blog, user, addLikes, onDeleteBlog }) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {blog.title}
          </Link>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {blog.author}
        </Typography>
        <Togglable buttonLabel='view'>
          <Typography variant="body1" gutterBottom>
            {blog.url}
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body2" data-testid="blog-likes">
              Likes: {blog.likes}
            </Typography>
            <Button variant="contained" color="primary" size="small" onClick={() => addLikes(blog.id)} sx={{ marginLeft: 1 }}>
              Like
            </Button>
          </Box>
          { user && blog.user.length !== 0 && blog.user[0].username === user.username &&
            <Button variant="contained" color="secondary" size="small" onClick={() => onDeleteBlog(blog.id)} sx={{ marginTop: 1 }}>
              Delete
            </Button>
          }
        </Togglable>
      </CardContent>
    </Card>
  );
}

export default Blog;
