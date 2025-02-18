const Author = require('../models/author');
const Book = require('../models/book');
const { authors, books } = require('../db');

const initializeDatabase = async () => {
  try {
    const existingAuthors = await Author.countDocuments({});
    const existingBooks = await Book.countDocuments({});

    if (existingAuthors === 0) {
      await Author.insertMany(authors);
    }

    if (existingBooks === 0) {
      for (const book of books) {
        const author = await Author.findOne({ name: book.author });
        const newBook = new Book({
          title: book.title,
          published: book.published,
          author: author._id,
          genres: book.genres,
        });
        await newBook.save();
      }
    }
    console.log('Database initialized with existing data');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

module.exports = initializeDatabase;
