const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    bookCount: Int!
    born: Int
  }

  type Book {
    title: String!
    published: Int!,
    author: String,
    id: ID!
    genres: [String!]!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook (
        title: String!
        author: String
        published: Int!
        genres: [String!]!
    ): Book
    editAuthor (
        name: String!
        setBornTo: Int
    ): Author
  }
`

const resolvers = {
    Query: {
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (parent, args) =>
        {
            let filteredBooks = books;

            if (args.author)
            {
                filteredBooks = filteredBooks.filter(book => book.author === args.author);
            }

            if (args.genre)
            {
                filteredBooks = filteredBooks.filter(book => book.genres.includes(args.genre));
            }

            // return books;

            return filteredBooks.map(book => ({
                title: book.title,
                author: book.author,
                published: book.published,
                genres: book.genres,
            }));
        },
        allAuthors: () => authors                                         
    },
    Book: {
        author: (parent) => 
            parent.author,
        // {
        //     const authorName = parent.author;
        //     return authors.find(author => author.name === authorName);
        // },
    },
    Author: {
        bookCount: (parent) =>
        {
            return books.filter(book => book.author === parent.name).length;
        },
        name: (root) => root.name,
        id: (root) => root.id,
        born: (root) => root.born,
    },
    Mutation: {
        addBook(parent, args) {
            const { title, author, published, genres } = args;

            // Check if the book with the same title already exists
            if (books.find((b) => b.title === title)) {
            throw new GraphQLError('Name must be unique', {
                extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: title,
                },
            });
            }

            // Check if the author already exists
            let matchedAuthor = authors.find((a) => a.name === author);

            // If the author doesn't exist, add them to the authors array
            if (!matchedAuthor) {
            matchedAuthor = {
                name: author,
                id: uuid(),
                born: null, // You might want to set a default value or prompt for this
            };
            authors.push(matchedAuthor);
            }

            // Add the new book
            const newBook = {
            title,
            author,
            published,
            genres,
            id: uuid(),
            };
            books.push(newBook);

            // Return the new book
            return newBook;
        },
        editAuthor(parent, args) {
            const matchedAuthor = authors.find((a) => a.name === args.name);

            let originalName;

            if (matchedAuthor) {
            originalName = matchedAuthor.name;

            matchedAuthor.name = args.name;
            matchedAuthor.born = args.setBornTo;

            console.log(`Author ${originalName} updated to ${matchedAuthor.name}`);

            return matchedAuthor;
            } else {
                console.error('Author not found');
                return null;
            }
        }
    }
}



const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})