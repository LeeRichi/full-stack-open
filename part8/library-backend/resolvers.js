const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken')

const resolvers = {
	Query: {
		authorCount: async () => Author.countDocuments({}),
		bookCount: async () => Book.countDocuments({}),
		allBooks: async (parent, args) =>
		{
			let filteredBooks = Book.find()

			if (args.author)
			{
				// filteredBooks = filteredBooks.filter(book => book.author === args.author)
				const author = await Author.findOne({ name: args.author })
				filteredBooks = filteredBooks.where('author').equals(author._id)
			}
			if (args.genre)
			{
				filteredBooks = filteredBooks.where('genres').in([args.genre])
			}

			const bookWithAuthors = await filteredBooks.populate('author', 'name')
			return bookWithAuthors
		},
		//old
		// allAuthors: () => authors.map(author =>
		// {
		// 	const bookCount = books.filter(book => book.author === author.name).length;
		// 	return {
		// 		...author,
		// 		bookCount: bookCount
		// 	}
		// }),

		// allAuthors: async () => Author.find({}),

		allAuthors: async () => {
			const authors = await Author.find();

			const authorsWithBookCount = await Promise.all(authors.map(async (author) => {
				const bookCount = await Book.countDocuments({ author: author._id });

				return {
					id: author._id,
					name: author.name,
					born: author.born,
					bookCount: bookCount,
				};
			}));

			return authorsWithBookCount;
		},

		me: (root, args, context) =>
		{
			return context.currentUser
		}
	},
	Mutation: {
		addBook: async (root, args, context) =>
		{
			const currentUser = context.currentUser

			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					}
				})
			}
			let newAuthor
			const existingAuthor = await Author.findOne({ name: args.author })
			if (!existingAuthor)
			{
				newAuthor = new Author({
					name: args.author,
					bookCount: 1,
					id: uuid()
				})
				await newAuthor.save()
			}
			else
			{
				existingAuthor.bookCount += 1
				await existingAuthor.save()
			}
			const newBook = new Book({
				title: args.title,
				published: args.published,
				author: existingAuthor ? existingAuthor : newAuthor,
				genres: args.genres,
			})
      await newBook.save()

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

			return newBook
		},
		editAuthor: async (root, args, context) =>
		{
			const currentUser = context.currentUser

			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					}
				})
			}
			const author = await Author.findOne({ name: args.name })
			if (!author) return null
			author.born = args.setBornTo
			await author.save()
			return author
		},
		createUser: async (root, args) => {
			const user = new User({
				username: args.username,
				favoriteGenre: args.favoriteGenre
			})

			try {
				const savedUser = await user.save()
				return savedUser
			} catch (error) {
				throw new GraphQLError('Creating the user failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.username,
						error
					}
				})
			}
		},
		login: async (root, args) =>
		{
			const foundUser = await User.findOne({ username: args.username })
			if ( !foundUser ) {
				throw new GraphQLError('wrong credentials', {
					extensions: {
						code: 'BAD_USER_INPUT'
					}
				})
			}

			const userForToken = {
				username: foundUser.username,
				id: foundUser._id,
			}
			const token = jwt.sign(userForToken, process.env.JWT_SECRET);
			return { value: token };
		}
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers
