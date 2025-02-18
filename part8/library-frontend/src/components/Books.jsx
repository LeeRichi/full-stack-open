import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'
import { use } from 'react';

const Books = (props) =>
{
	// const result = useQuery(ALL_BOOKS)
	const [tag, setTag] = useState(null);
  // const result = useQuery(BOOKS_BY_GENRE)
  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>Loading...</div>
  }

	if (result.error)
	{
    return <div>Error: {result.error.message}</div>
  }

  if (!props.show || !result.data) {
    return null
  }

  const books = result.data.allBooks

  console.log(books)

	const uniqueGenres = [...new Set(books.flatMap(book => book.genres))];

	const filteredBooks = tag
    ? books.filter((book) => book.genres.includes(tag))
    : books;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
			</table>
			{uniqueGenres.map(uniqueGenre => <button onClick={() => setTag(uniqueGenre)} key={uniqueGenre}>{uniqueGenre}</button>)}
			<button onClick={() => setTag(null)}>All Books</button>
    </div>
  )
}

export default Books
