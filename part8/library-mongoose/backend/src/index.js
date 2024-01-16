require('dotenv').config()

const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')

const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const AuthorModel = require('./models/author')
const BookModel = require('./models/book')
const UserModel = require('./models/user')

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

// let authors = [];
// let books = [];

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    bookCount: Int
    born: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook (
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ): Book
    editAuthor (
        name: String!
        setBornTo: Int
    ): Author
    addAuthor (
      name: String!
      born: Int
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => BookModel.collection.countDocuments(),
    authorCount: () => AuthorModel.collection.countDocuments(),
    allBooks: async (parent, args) => {
      const books = await BookModel.find({}).populate('author');

      books.map(book => console.log(book.author))

      return books.map(book => ({
        title: book.title,
        author: book.author ? { 
          id: book.author._id,
          name: book.author.name || "Unknown Author"
        } : null,     
        published: book.published,
        genres: book.genres,
        id: book.id,
      }));
    },

    // allAuthors: () => authors  
    allAuthors: async () =>
    {
      const authors = await AuthorModel.find({});
      return authors;
    },
    me: async (root, args, context) => {
      return context.currentUser
    }
  },
  Book: {
    author: (parent) => 
      parent.author, 
  },
  Author: {
    bookCount: async (parent) =>
    {
      const foundAuthor = await AuthorModel.findOne({ name: parent.name })
      const foundBooks = await BookModel.find({ author : foundAuthor.id })
      return foundBooks.length;
    },
    name: (root) => root.name,
    id: (root) => root.id,
    born: (root) => root.born,
  },
  Mutation: {
    addBook: async (parent, args) => {
      const { title, author, published, genres } = args;

      if (title.length < 3 || author.length < 3) {
        throw new GraphQLError('Title and author must have a minimum length of 3 characters.');
      }
      
      const authorId = author.toString();

      const book = new BookModel({ title, author: authorId, published, genres });

      try {
        const savedBook = await book.save();
        return {
          title: savedBook.title,
          author: {
            id: savedBook.author.toString(),
          },
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
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
    },
    addAuthor: async (parent, args) => {
      const { name, born } = args;
      const author = new AuthorModel({ name, born });

      try {
        const savedAuthor = await author.save();
        return savedAuthor;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    createUser: async (root, args) => {
      const user = new UserModel({ username: args.username })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await UserModel.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const authHeader = req ? req.headers.authorization : null;

    if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
      const token = authHeader.substring(7);
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await UserModel.findById(decodedToken.id);
        return { currentUser };
      } catch (error) {
        // Token is invalid or expired
        console.error('Error decoding token:', error.message);
      }
    }

    // No token or invalid token
    return { currentUser: null };
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

//test