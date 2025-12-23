const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory database (for demonstration purposes)
let books = [
  {
    id: uuidv4(),
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    publishedYear: 1960,
    genre: "Fiction",
    availableCopies: 5,
    totalCopies: 5
  },
  {
    id: uuidv4(),
    title: "1984",
    author: "George Orwell",
    isbn: "978-0-452-28423-4",
    publishedYear: 1949,
    genre: "Dystopian",
    availableCopies: 3,
    totalCopies: 3
  },
  {
    id: uuidv4(),
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0-7432-7356-5",
    publishedYear: 1925,
    genre: "Classic",
    availableCopies: 4,
    totalCopies: 4
  }
];

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Library Management API",
    version: "1.0.0",
    endpoints: {
      "GET /api/books": "Get all books",
      "GET /api/books/:id": "Get a specific book",
      "POST /api/books": "Add a new book",
      "PUT /api/books/:id": "Update a book",
      "DELETE /api/books/:id": "Delete a book",
      "GET /api/books/search": "Search books by title or author"
    }
  });
});

// ==================== CRUD OPERATIONS ====================

// CREATE - Add a new book
app.post('/api/books', (req, res) => {
  try {
    const { title, author, isbn, publishedYear, genre, availableCopies, totalCopies } = req.body;

    // Validation
    if (!title || !author || !isbn) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Title, author, and ISBN are required fields"
      });
    }

    // Check if ISBN already exists
    const existingBook = books.find(book => book.isbn === isbn);
    if (existingBook) {
      return res.status(409).json({
        error: "Conflict",
        message: "A book with this ISBN already exists"
      });
    }

    const newBook = {
      id: uuidv4(),
      title,
      author,
      isbn,
      publishedYear: publishedYear || null,
      genre: genre || "Unknown",
      availableCopies: availableCopies || 1,
      totalCopies: totalCopies || 1,
      createdAt: new Date().toISOString()
    };

    books.push(newBook);

    res.status(201).json({
      message: "Book added successfully",
      book: newBook
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
});

// READ - Get all books
app.get('/api/books', (req, res) => {
  try {
    const { genre, author, available } = req.query;

    let filteredBooks = [...books];

    // Filter by genre
    if (genre) {
      filteredBooks = filteredBooks.filter(book => 
        book.genre.toLowerCase() === genre.toLowerCase()
      );
    }

    // Filter by author
    if (author) {
      filteredBooks = filteredBooks.filter(book => 
        book.author.toLowerCase().includes(author.toLowerCase())
      );
    }

    // Filter by availability
    if (available === 'true') {
      filteredBooks = filteredBooks.filter(book => book.availableCopies > 0);
    }

    res.json({
      count: filteredBooks.length,
      books: filteredBooks
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
});

// READ - Get a specific book by ID
app.get('/api/books/:id', (req, res) => {
  try {
    const { id } = req.params;
    const book = books.find(book => book.id === id);

    if (!book) {
      return res.status(404).json({
        error: "Not Found",
        message: "Book not found"
      });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
});

// READ - Search books
app.get('/api/books/search/query', (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Search query parameter 'q' is required"
      });
    }

    const searchTerm = q.toLowerCase();
    const results = books.filter(book => 
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.isbn.includes(searchTerm) ||
      book.genre.toLowerCase().includes(searchTerm)
    );

    res.json({
      query: q,
      count: results.length,
      results
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
});

// UPDATE - Update a book
app.put('/api/books/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex === -1) {
      return res.status(404).json({
        error: "Not Found",
        message: "Book not found"
      });
    }

    // Check if ISBN is being updated and if it conflicts with another book
    if (updates.isbn && updates.isbn !== books[bookIndex].isbn) {
      const existingBook = books.find(book => book.isbn === updates.isbn);
      if (existingBook) {
        return res.status(409).json({
          error: "Conflict",
          message: "A book with this ISBN already exists"
        });
      }
    }

    // Update the book
    books[bookIndex] = {
      ...books[bookIndex],
      ...updates,
      id: books[bookIndex].id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };

    res.json({
      message: "Book updated successfully",
      book: books[bookIndex]
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
});

// PARTIAL UPDATE - Patch a book
app.patch('/api/books/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex === -1) {
      return res.status(404).json({
        error: "Not Found",
        message: "Book not found"
      });
    }

    // Only update provided fields
    Object.keys(updates).forEach(key => {
      if (key !== 'id') {
        books[bookIndex][key] = updates[key];
      }
    });

    books[bookIndex].updatedAt = new Date().toISOString();

    res.json({
      message: "Book updated successfully",
      book: books[bookIndex]
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
});

// DELETE - Delete a book
app.delete('/api/books/:id', (req, res) => {
  try {
    const { id } = req.params;
    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex === -1) {
      return res.status(404).json({
        error: "Not Found",
        message: "Book not found"
      });
    }

    const deletedBook = books.splice(bookIndex, 1)[0];

    res.json({
      message: "Book deleted successfully",
      book: deletedBook
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
});

// Additional endpoint - Borrow a book
app.post('/api/books/:id/borrow', (req, res) => {
  try {
    const { id } = req.params;
    const book = books.find(book => book.id === id);

    if (!book) {
      return res.status(404).json({
        error: "Not Found",
        message: "Book not found"
      });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({
        error: "Not Available",
        message: "No copies available for borrowing"
      });
    }

    book.availableCopies -= 1;

    res.json({
      message: "Book borrowed successfully",
      book
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
});

// Additional endpoint - Return a book
app.post('/api/books/:id/return', (req, res) => {
  try {
    const { id } = req.params;
    const book = books.find(book => book.id === id);

    if (!book) {
      return res.status(404).json({
        error: "Not Found",
        message: "Book not found"
      });
    }

    if (book.availableCopies >= book.totalCopies) {
      return res.status(400).json({
        error: "Invalid Operation",
        message: "All copies are already in the library"
      });
    }

    book.availableCopies += 1;

    res.json({
      message: "Book returned successfully",
      book
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested endpoint does not exist"
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong!"
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Library API Server is running on http://localhost:${PORT}`);
  console.log(`📚 Total books in library: ${books.length}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET    /`);
  console.log(`  GET    /api/books`);
  console.log(`  GET    /api/books/:id`);
  console.log(`  GET    /api/books/search/query?q=<search_term>`);
  console.log(`  POST   /api/books`);
  console.log(`  PUT    /api/books/:id`);
  console.log(`  PATCH  /api/books/:id`);
  console.log(`  DELETE /api/books/:id`);
  console.log(`  POST   /api/books/:id/borrow`);
  console.log(`  POST   /api/books/:id/return`);
});

module.exports = app;
