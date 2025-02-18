const Book = require('../models/book');
const Author = require('../models/author');
const { authors, books } = require('../db');

// Loop through each author and update their `books` field by associating the correct books.
const updateAuthors = async () => {
  for (const author of authors) {
    // Find the books written by the current author
    const authorBooks = books.filter(book => book.author === author.name);

    // If there are books for this author, update the `books` array for the author
    if (authorBooks.length > 0) {
      const authorDoc = await Author.findOne({ name: author.name });

      // Map the books to their ObjectId references
      const bookIds = await Promise.all(
        authorBooks.map(async (book) => {
          const existingBook = await Book.findOne({ title: book.title });
          return existingBook._id; // Return the ObjectId for the book
        })
      );

      // Add the book references to the author's `books` field
      authorDoc.books.push(...bookIds);

      // Save the author document
      await authorDoc.save();
      console.log(`Books added to ${author.name}`);
    }
  }
};

module.exports = { updateAuthors };
