import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { gql, useQuery, useApolloClient, useMutation, useSubscription } from '@apollo/client'
import LoginForm from "./components/LoginForm";
import { ALL_BOOKS, ME, BOOK_ADDED } from './queries.js'
import Recommendation from './components/Recommendation.jsx'

export const updateCache = (cache, query, addedPerson) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    }
  })
}

const App = () =>
{
	const [page, setPage] = useState("login")
	const [token, setToken] = useState(null)
	const [error, setError] = useState(null)
	const client = useApolloClient()
	const loggedUser = useQuery(ME)

  console.log(loggedUser)

  useEffect(() =>
  {
    console.log()
    if (localStorage.getItem('library-user-token'))
    {
      setPage('authors')
      setToken(localStorage.getItem('library-user-token'))
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) =>
    {
      const addedBook = data.data.bookAdded
      window.alert(`${addedBook.title} added`)

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)

      // client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) =>
      // {
      //   return {
      //     allBooks: allBooks.concat(addedBook),
      //   }
      // })
    },
    onError: (error) =>
    {
      console.log(error)
      console.error(error)
    }
  })

	const onLogout = () => {
		setToken(null)
		setPage("login")
    localStorage.clear()
    client.resetStore()
  }

	if (!token)
	{
		return (
      <div>
				<h1>Log in</h1>
        <LoginForm setError={setError} setToken={setToken} show={page === "login"} setPage={setPage} />
			</div>
		);
  }

  return (
		<div>
			{error && <h2>{error}</h2>}
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
				{!token ?
					<button onClick={() => setPage("login")}>log in</button>
          :
          <>
						<button onClick={() => setPage("add")}>add book</button>
						<button onClick={() => setPage("recommendation")}>recommendation</button>
            <button onClick={() => onLogout()}>log out</button>
          </>
				}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

			<NewBook show={page === "add"} />

			{/* <Recommendation show={page === "recommendation"} user={loggedUser.data.me} /> */}

      <LoginForm setError={setError} setToken={setToken} show={page === "login"} setPage={setPage} />
    </div>
  );
};

export default App;
