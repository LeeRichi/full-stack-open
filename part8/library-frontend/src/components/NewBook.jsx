import { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE, CREATE_BOOK } from '../queries'

// const CREATE_BOOK = gql`
//   mutation addBook($title: String!, $author: String!, $published: Int, $genres: [String!]!) {
// 		addBook(
// 			title: $title,
// 			author: $author,
// 			published: $published,
// 			genres: $genres
// 		) {
// 			title
// 			author {
// 				name
// 			}
// 			id
// 			published
// 			genres
// 		}
// 	}
// `

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState(0)
  const [genre, setGenre] = useState('')
	const [genres, setGenres] = useState([])
	const [error, setError] = useState('')

	const [createBook] = useMutation(CREATE_BOOK, {
		refetchQueries: [{ query: ALL_BOOKS }],
		onCompleted: (data) => {
			console.log('Mutation successful:', data)
		},
		onError: (error) => {
			const messages = error.graphQLErrors.map((e) => e.message).join('\n')
			setError(messages)
			console.log('Mutation error:', error)
		},
		update: (cache, response) => {
      cache.updateQuery({ query: BOOKS_BY_GENRE }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook),
        }
      })
		},
		// update: (cache, { data: { addBook } }) => {
    //   // Get the existing books in cache for ALL_BOOKS and BOOKS_BY_GENRE
    //   const existingBooks = cache.readQuery({ query: ALL_BOOKS });
    //   const existingBooksByGenre = cache.readQuery({ query: BOOKS_BY_GENRE, variables: { genre: tag } });

    //   // Update the cache to include the new book
    //   cache.writeQuery({
    //     query: ALL_BOOKS,
    //     data: { allBooks: existingBooks.allBooks.concat(addBook) },
    //   });

    //   if (existingBooksByGenre) {
    //     cache.writeQuery({
    //       query: BOOKS_BY_GENRE,
    //       variables: { genre: tag },
    //       data: {
    //         allBooks: existingBooksByGenre.allBooks.concat(addBook),
    //       },
    //     });
    //   }
    // },
	})

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

		console.log('add book...')
		console.log(author)
		createBook({
      variables: {
        title,
        author,
        published,
        genres,
      },
    })
    setTitle('')
    setPublished(0)
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
		setGenre('')
  }

  return (
		<div>
			{error &&
				<h1>{error}</h1>
			}
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
