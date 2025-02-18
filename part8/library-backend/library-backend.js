const { ApolloServer, Mutation } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
//8.13
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const { authors, books } = require('./db');
const initializeDatabase = require('./scripts/initDatabase');
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql');
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const { updateAuthors } = require('./scripts/updateForAuthorBooks');

//8.17
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
// const { useServer } = require('graphql-ws')
// const useServer = require('graphql-ws')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(async() => {
		console.log('connected to MongoDB')
    // await initializeDatabase()
    // await updateAuthors()
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

mongoose.set('debug', true);

// const typeDefs = `
// 	type Author {
// 		name: String!
// 		id: ID!
// 		born: Int
// 		bookCount: Int!
// 	}

// 	type Book {
// 		title: String!
//     published: Int
//   	author: Author!
//     id: ID!
//     genres: [String!]!
// 	}

// 	type User {
// 		username: String!
// 		favoriteGenre: String!
// 		id: ID!
// 	}

// 	type Token {
// 		value: String!
// 	}

//   type Query {
// 		authorCount: Int!
//     bookCount: Int!
//   	allBooks(author: String, genre: String): [Book!]!
// 		allAuthors: [Author!]!
// 		me: User
//   }

// 	type Mutation {
// 		addBook (
// 			title: String!
// 			published: Int
// 			author: String!
// 			genres: [String!]!
// 		): Book
// 		editAuthor (
// 			name: String!
// 			setBornTo: Int!
// 		) : Author
// 		createUser(
// 			username: String!
// 			favoriteGenre: String!
// 		): User
// 		login(
// 			username: String!
// 			password: String!
// 		): Token
// 	}
// `

// const resolvers = {
//   Query: {
//     authorCount: async () => Author.countDocuments({}),
//     bookCount: async () => Book.countDocuments({}),
// 		allBooks: async (parent, args) =>
// 		{
//       let filteredBooks = Book.find()

// 			if (args.author)
// 			{
// 				// filteredBooks = filteredBooks.filter(book => book.author === args.author)
// 				const author = await Author.findOne({ name: args.author })
//         filteredBooks = filteredBooks.where('author').equals(author._id)
// 			}
// 			if (args.genre)
// 			{
//         filteredBooks = filteredBooks.where('genres').in([args.genre])
// 			}

// 			const bookWithAuthors = await filteredBooks.populate('author', 'name')
// 			return bookWithAuthors
// 		},
// 		//old
// 		// allAuthors: () => authors.map(author =>
// 		// {
// 		// 	const bookCount = books.filter(book => book.author === author.name).length;
// 		// 	return {
// 		// 		...author,
// 		// 		bookCount: bookCount
// 		// 	}
// 		// }),
// 		allAuthors: async () => Author.find({}),
// 		me: (root, args, context) =>
// 		{
// 			return context.currentUser
// 		}
// 	},
// 	Mutation: {
// 		addBook: async (root, args, context) =>
// 		{
//       const currentUser = context.currentUser

//       if (!currentUser) {
//         throw new GraphQLError('not authenticated', {
//           extensions: {
//             code: 'BAD_USER_INPUT',
//           }
//         })
//       }
// 			let newAuthor
// 			const existingAuthor = await Author.findOne({ name: args.author })
// 			if (!existingAuthor)
// 			{
// 				newAuthor = new Author({
// 					name: args.author,
// 					bookCount: 1,
// 					id: uuid()
// 				})
//         await newAuthor.save()
// 			}
// 			else
// 			{
// 				existingAuthor.bookCount += 1
// 				await existingAuthor.save()
// 			}
// 			const newBook = new Book({
// 				title: args.title,
// 				published: args.published,
// 				author: existingAuthor ? existingAuthor : newAuthor,
// 				genres: args.genres,
// 			})
// 			await newBook.save()
// 			return newBook
// 		},
// 		editAuthor: async (root, args, context) =>
// 		{
// 			const currentUser = context.currentUser

//       if (!currentUser) {
//         throw new GraphQLError('not authenticated', {
//           extensions: {
//             code: 'BAD_USER_INPUT',
//           }
//         })
//       }
// 		 	const author = await Author.findOne({ name: args.name })
// 			if (!author) return null
// 			author.born = args.setBornTo
// 			await author.save()
// 			return author
// 		},
// 		createUser: async (root, args) => {
// 			const user = new User({
// 				username: args.username,
// 				favoriteGenre: args.favoriteGenre
// 			})

// 			try {
// 				const savedUser = await user.save()
// 				return savedUser
// 			} catch (error) {
// 				throw new GraphQLError('Creating the user failed', {
// 					extensions: {
// 						code: 'BAD_USER_INPUT',
// 						invalidArgs: args.username,
// 						error
// 					}
// 				})
// 			}
// 		},
// 		login: async (root, args) =>
// 		{
// 			const foundUser = await User.findOne({ username: args.username })
// 			if ( !foundUser ) {
// 				throw new GraphQLError('wrong credentials', {
// 					extensions: {
// 						code: 'BAD_USER_INPUT'
// 					}
// 				})
// 			}

// 			const userForToken = {
// 				username: foundUser.username,
// 				id: foundUser._id,
// 			}
// 			const token = jwt.sign(userForToken, process.env.JWT_SECRET);
// 			return { value: token };
// 		}
// 	}
// }

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   formatError: (err) => {
//     console.error(err);  // Log full error details
//     return err;
//   },
//   // other server configurations
// });


// const corsOptions = {
//   origin: 'http://localhost:5173', // Replace with your frontend URL
//   credentials: true, // Allow cookies and headers to be sent with requests
// }

// startStandaloneServer(server, {
//   listen: { port: 4000 },
//   cors: corsOptions,
// 	context: async ({ req, res }) =>
// 	{
// 		const auth = req ? req.headers.authorization : null
// 		// console.log(auth)
// 		if (auth && (auth.startsWith('Bearer ')))
// 		{
// 			const token = auth.substring(7)
// 			const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

//       const currentUser = await User
// 				.findById(decodedToken.id)

// 			console.log(currentUser)

//       return { currentUser }
//     }
//   },
// }).then(({ url }) => {
//   console.log(`Server ready at ${url}`)
// })

// async function initialize() {
//   await initializeDatabase(); // Call manually when needed
// }

// // // Example of calling the function manually (can be triggered by a route or command)
// initialize();

const start = async () => {
  const app = express()
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const httpServer = http.createServer(app)
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })
  const serverCleanup = useServer({ schema }, wsServer);  // Wire up WebSocket server for GraphQL subscriptions

  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
    {
    async serverWillStart() {
      return {
        async drainServer() {
          await serverCleanup.dispose();
        },
      };
    }
    },
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
          const currentUser = await User.findById(decodedToken.id)
          return { currentUser }
        }
      },
    }),
  )

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()
