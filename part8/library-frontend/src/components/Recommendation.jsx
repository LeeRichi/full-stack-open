import React from 'react'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'
import { useQuery } from '@apollo/client'

const Recommendation = ({ show, user }) =>
{
  const books = useQuery(BOOKS_BY_GENRE)

  console.log(books)

  // console.log(books.data.allBooks)

  const filteredBooks = books.data.allBooks.filter(book =>
    book.genres.includes(user.favoriteGenre)
  )

  console.log(filteredBooks)

	if (books.loading) {
    return <div>Loading...</div>
	}

	if (books.error)
	{
    return <div>Error: {books.error.message}</div>
  }

	if (!show)
	{
		return null
	}
	return (
    <>
      <div>Recommendations</div>
      <div>Books in your favorite genre: {user.favoriteGenre}</div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map(book => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
	)
}

export default Recommendation
