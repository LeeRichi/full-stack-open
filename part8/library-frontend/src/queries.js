import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const ME = gql`
	query Me {
		me {
			username
			favoriteGenre
		}
	}
`

export const ALL_BOOKS = gql`
	query {
		allBooks {
			title
			author
			{
				name
				born
			}
			published
			genres
		}
	}
`

export const BOOKS_BY_GENRE = gql`
  query BooksByGenre($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int, $genres: [String!]!) {
		addBook(
			title: $title,
			author: $author,
			published: $published,
			genres: $genres
		) {
			title
			author {
				name
			}
			id
			published
			genres
		}
	}
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
		published
		author {
			name
		}
		genres
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
