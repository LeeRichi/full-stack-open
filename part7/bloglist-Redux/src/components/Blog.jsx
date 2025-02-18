import Togglable from "./Toggleable"
import blogService from '../services/blogs'

const Blog = ({ blog, user, addLikes, onDeleteBlog }) =>
{
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}
	return (
		<div style={blogStyle} id="blog" className="blog">
			{blog.title}
			<Togglable buttonLabel='view'>
				{blog.url}
				<br/>
        <p data-testid="blog-likes">
					{blog.likes}
					<button id="like" onClick={() => addLikes(blog.id)}>like</button>
				</p>
				{ user && blog.user.length != 0 && blog.user[0].username === user.username ?
					<button id="delete" onClick={() => onDeleteBlog(blog.id)}>delete</button>
					:
					null
				}
			</Togglable>
			{blog.author}
		</div>
	)
}

export default Blog
