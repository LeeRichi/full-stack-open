import React, {useState} from 'react'

const BlogForm = ({ onAddBlog }) =>
{
	const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const createBlog = (event) => {
    event.preventDefault()
    onAddBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
	return (
		<>
			<form role="form" onSubmit={createBlog} style={{ display: 'flex', flexDirection: 'column', maxWidth: '200px' }}>
				<h1>create new</h1>
				<label htmlFor="title">Title</label>
				<input id="title" data-testid="title" type="text" name="title" value={title} onChange={handleTitleChange} />

				<label htmlFor="author">Author</label>
				<input id="author" data-testid="author" type="text" name="author" value={author} onChange={handleAuthorChange} />

				<label htmlFor="url">URL</label>
				<input id="url" data-testid="url" type="text" name="url" value={url} onChange={handleUrlChange} />

				<button id="create-button" type="submit" style={{marginTop: '10px'}}>create</button>
			</form>
		</>
	)
}

export default BlogForm
