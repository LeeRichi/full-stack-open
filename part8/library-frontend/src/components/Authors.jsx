import { gql, useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'

const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			id
			born
			bookCount
		}
	}
`

const UPDATE_AUTHOR = gql`
  mutation editAuthor($name: String!, $birthyear: Int!) {
		editAuthor(
			name: $name,
			setBornTo: $birthyear,
		) {
			name
			born
		}
	}
`

const Authors = (props) =>
{
	const result = useQuery(ALL_AUTHORS)
	const [name, setName] = useState('')
	const [birthyear, setBirthyear] = useState('')
	const [error, setError] = useState('')

	const [editAuthor] = useMutation(UPDATE_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
		onCompleted: (data) => {
			console.log('Mutation successful:', data)
		},
		onError: (error) => {
			const messages = error.graphQLErrors.map((e) => e.message).join('\n')
			setError(messages)
			console.log('Mutation error:', error)
		},
	})

	console.log(result)
	if (result.loading) {
    return <div>Loading...</div>
  }

  if (result.error) {
    return <div>Error: {error.message}</div>
  }

  if (!props.show || !result.data) {
    return null
	}

	const authors = result.data.allAuthors
	console.log(authors)

	const submitAuthor = (event) => {
		event.preventDefault()
		editAuthor({
			variables: {
				name,
				birthyear,
			},
		})
		setName('')
		setBirthyear(0)
	};

  return (
		<div>
			{error &&
				<h1>{error}</h1>
			}
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
			</table>

			<h2>set birthyear</h2>
			<form onSubmit={submitAuthor}>
        {/* <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div> */}
				<select
					onChange={({ target }) => setName(target.value)}
				>
					<option value="" disabled>select an author</option>
					{authors.map(author =>
						{
							return <option key={author.id} value={author.name} >{author.name}</option>
						}
					)}
				</select>
        <div>
          birthyear
          <input
            value={birthyear}
            onChange={({ target }) => setBirthyear(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
