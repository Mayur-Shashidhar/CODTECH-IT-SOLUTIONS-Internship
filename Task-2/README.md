# Library Management System - RESTful API

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.18+-blue.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A complete RESTful API for managing a library's book inventory with full CRUD operations.

---

## 📋 Table of Contents
- [Overview](#overview)
- [Task Requirements & Completion](#task-requirements--completion)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints Quick Reference](#api-endpoints-quick-reference)
- [Detailed API Documentation](#detailed-api-documentation)
- [Testing Examples](#testing-examples)
- [Error Handling](#error-handling)
- [Data Model](#data-model)
- [Project Structure](#project-structure)
- [Learning Outcomes](#learning-outcomes)
- [License](#license)

---

## Overview

This is a RESTful API for managing a library's book inventory system. It provides full CRUD (Create, Read, Update, Delete) operations for managing books, along with advanced features like search, filtering, and a borrow/return system.

**Base URL:** `http://localhost:3000`

---

## Task Requirements & Completion

### 📋 Original Task
**Design a RESTful API for a library or inventory system, implementing CRUD operations.**

**Deliverable:** API documentation and code with functional endpoints.

### ✅ Completed Deliverables

#### 1. ✅ Fully Functional RESTful API
- **File:** `server.js`
- **Framework:** Express.js (Node.js)
- **Status:** Completed and tested

#### 2. ✅ Complete CRUD Operations

**CREATE**
- `POST /api/books` - Add new books with validation

**READ**
- `GET /api/books` - Get all books with filtering options
- `GET /api/books/:id` - Get specific book by ID
- `GET /api/books/search/query?q=term` - Search functionality

**UPDATE**
- `PUT /api/books/:id` - Full update of book
- `PATCH /api/books/:id` - Partial update of book

**DELETE**
- `DELETE /api/books/:id` - Remove book from inventory

#### 3. ✅ Additional Features Implemented
- Borrow/Return system for book lending
- Advanced filtering (by genre, author, availability)
- Comprehensive search across multiple fields
- Input validation and error handling
- Unique ISBN validation
- UUID-based ID generation
- Request logging
- Proper HTTP status codes

#### 4. ✅ Comprehensive Documentation
Complete technical documentation with:
- All endpoint descriptions
- Request/response examples
- Error handling
- Query parameters
- Data models
- Testing examples

**Status:** READY FOR SUBMISSION ✅

---

## ✨ Features

✅ **Full CRUD Operations** - Create, Read, Update, and Delete books  
✅ **Search Functionality** - Search books by title, author, ISBN, or genre  
✅ **Filter Options** - Filter books by genre, author, and availability  
✅ **Inventory Management** - Track available and total copies  
✅ **Borrow/Return System** - Manage book lending  
✅ **Input Validation** - Comprehensive error handling and validation  
✅ **RESTful Architecture** - Following REST best practices  
✅ **Unique ISBN Validation** - Prevents duplicate entries  
✅ **Detailed Error Messages** - Clear and informative error responses  

### Key Technical Features

1. **RESTful Architecture** ✅
   - Proper HTTP methods (GET, POST, PUT, PATCH, DELETE)
   - Resource-based URLs
   - Stateless operations

2. **Data Validation** ✅
   - Required field validation
   - Unique ISBN constraint
   - Proper error messages

3. **Error Handling** ✅
   - 400 Bad Request for invalid data
   - 404 Not Found for missing resources
   - 409 Conflict for duplicates
   - 500 Internal Server Error handling

4. **Query Features** ✅
   - Filtering by genre, author, availability
   - Full-text search
   - Multiple filter combinations

5. **Inventory Management** ✅
   - Track available vs total copies
   - Borrow/return operations
   - Availability checking

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v4.18.2
- **ID Generation:** UUID v4
- **Data Storage:** In-memory (Array-based)
- **Development Tool:** Nodemon v3.0.2

---

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Steps

1. **Navigate to the project directory:**
```bash
cd /Users/mayurshadhidhar/Documents/two
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the server:**
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

4. **Verify the server is running:**
```bash
curl http://localhost:3000
```

You should see:
```
🚀 Library API Server is running on http://localhost:3000
📚 Total books in library: 3
```

---

## 🚀 Usage

### Starting the Server
```bash
npm start
```

The server will start on `http://localhost:3000`

### Development Mode (with auto-reload)
```bash
npm run dev
```

---

## 📍 API Endpoints Quick Reference

**Total Endpoints:** 10

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| GET | `/api/books` | Get all books (with optional filters) |
| GET | `/api/books/:id` | Get a specific book by ID |
| GET | `/api/books/search/query?q=term` | Search books |
| POST | `/api/books` | Add a new book |
| PUT | `/api/books/:id` | Update a book (full replacement) |
| PATCH | `/api/books/:id` | Update a book (partial update) |
| DELETE | `/api/books/:id` | Delete a book |
| POST | `/api/books/:id/borrow` | Borrow a book |
| POST | `/api/books/:id/return` | Return a book |

---

## 📖 Detailed API Documentation

### 1. Get API Information
**GET** `/`

Returns API information and available endpoints.

**Example:**
```bash
curl http://localhost:3000
```

**Response (200 OK):**
```json
{
  "message": "Welcome to Library Management API",
  "version": "1.0.0",
  "endpoints": {
    "GET /api/books": "Get all books",
    "GET /api/books/:id": "Get a specific book",
    "POST /api/books": "Add a new book",
    "PUT /api/books/:id": "Update a book",
    "DELETE /api/books/:id": "Delete a book"
  }
}
```

---

### 2. Get All Books
**GET** `/api/books`

Retrieve all books from the library. Supports filtering.

**Query Parameters:**
- `genre` (optional) - Filter by genre
- `author` (optional) - Filter by author name
- `available` (optional) - Filter by availability (true/false)

**Examples:**
```bash
# Get all books
curl http://localhost:3000/api/books

# Filter by genre
curl "http://localhost:3000/api/books?genre=Fiction"

# Filter by author
curl "http://localhost:3000/api/books?author=Harper"

# Filter by availability
curl "http://localhost:3000/api/books?available=true"

# Combine filters
curl "http://localhost:3000/api/books?genre=Fiction&available=true"
```

**Response (200 OK):**
```json
{
  "count": 3,
  "books": [
    {
      "id": "uuid",
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "isbn": "978-0-06-112008-4",
      "publishedYear": 1960,
      "genre": "Fiction",
      "availableCopies": 5,
      "totalCopies": 5
    }
  ]
}
```

---

### 3. Get Book by ID
**GET** `/api/books/:id`

Retrieve a specific book by its unique ID.

**Example:**
```bash
curl http://localhost:3000/api/books/{BOOK_ID}
```

**Response (200 OK):**
```json
{
  "id": "uuid",
  "title": "1984",
  "author": "George Orwell",
  "isbn": "978-0-452-28423-4",
  "publishedYear": 1949,
  "genre": "Dystopian",
  "availableCopies": 3,
  "totalCopies": 3
}
```

**Response (404 Not Found):**
```json
{
  "error": "Not Found",
  "message": "Book not found"
}
```

---

### 4. Search Books
**GET** `/api/books/search/query?q=<term>`

Search books by title, author, ISBN, or genre.

**Query Parameters:**
- `q` (required) - Search term

**Example:**
```bash
curl "http://localhost:3000/api/books/search/query?q=gatsby"
```

**Response (200 OK):**
```json
{
  "query": "gatsby",
  "count": 1,
  "results": [
    {
      "id": "uuid",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "isbn": "978-0-7432-7356-5",
      "publishedYear": 1925,
      "genre": "Classic",
      "availableCopies": 4,
      "totalCopies": 4
    }
  ]
}
```

---

### 5. Create a New Book
**POST** `/api/books`

Add a new book to the library inventory.

**Request Headers:**
```
Content-Type: application/json
```

**Required Fields:**
- `title` - Book title
- `author` - Book author
- `isbn` - ISBN number (must be unique)

**Optional Fields:**
- `publishedYear` - Year of publication
- `genre` - Book genre
- `availableCopies` - Number of available copies (default: 1)
- `totalCopies` - Total number of copies (default: 1)

**Example:**
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "isbn": "978-0-547-92822-7",
    "publishedYear": 1937,
    "genre": "Fantasy",
    "availableCopies": 4,
    "totalCopies": 4
  }'
```

**Response (201 Created):**
```json
{
  "message": "Book added successfully",
  "book": {
    "id": "new-uuid",
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "isbn": "978-0-547-92822-7",
    "publishedYear": 1937,
    "genre": "Fantasy",
    "availableCopies": 4,
    "totalCopies": 4,
    "createdAt": "2025-12-23T10:30:00.000Z"
  }
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Validation Error",
  "message": "Title, author, and ISBN are required fields"
}
```

**Response (409 Conflict):**
```json
{
  "error": "Conflict",
  "message": "A book with this ISBN already exists"
}
```

---

### 6. Update Book (Full)
**PUT** `/api/books/:id`

Update all fields of an existing book.

**Example:**
```bash
curl -X PUT http://localhost:3000/api/books/{BOOK_ID} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "1984 (Updated Edition)",
    "author": "George Orwell",
    "isbn": "978-0-452-28423-4",
    "publishedYear": 1949,
    "genre": "Dystopian Fiction",
    "availableCopies": 5,
    "totalCopies": 5
  }'
```

**Response (200 OK):**
```json
{
  "message": "Book updated successfully",
  "book": {
    "id": "uuid",
    "title": "1984 (Updated Edition)",
    "author": "George Orwell",
    "isbn": "978-0-452-28423-4",
    "publishedYear": 1949,
    "genre": "Dystopian Fiction",
    "availableCopies": 5,
    "totalCopies": 5,
    "updatedAt": "2025-12-23T10:45:00.000Z"
  }
}
```

---

### 7. Update Book (Partial)
**PATCH** `/api/books/:id`

Update specific fields of an existing book.

**Example:**
```bash
curl -X PATCH http://localhost:3000/api/books/{BOOK_ID} \
  -H "Content-Type: application/json" \
  -d '{"availableCopies": 7, "genre": "American Literature"}'
```

**Response (200 OK):**
```json
{
  "message": "Book updated successfully",
  "book": {
    "id": "uuid",
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "isbn": "978-0-06-112008-4",
    "publishedYear": 1960,
    "genre": "American Literature",
    "availableCopies": 7,
    "totalCopies": 5,
    "updatedAt": "2025-12-23T11:00:00.000Z"
  }
}
```

---

### 8. Delete a Book
**DELETE** `/api/books/:id`

Remove a book from the library inventory.

**Example:**
```bash
curl -X DELETE http://localhost:3000/api/books/{BOOK_ID}
```

**Response (200 OK):**
```json
{
  "message": "Book deleted successfully",
  "book": {
    "id": "uuid",
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "isbn": "978-0-06-112008-4",
    "publishedYear": 1960,
    "genre": "Fiction",
    "availableCopies": 5,
    "totalCopies": 5
  }
}
```

---

### 9. Borrow a Book
**POST** `/api/books/:id/borrow`

Borrow a book (decreases available copies by 1).

**Example:**
```bash
curl -X POST http://localhost:3000/api/books/{BOOK_ID}/borrow
```

**Response (200 OK):**
```json
{
  "message": "Book borrowed successfully",
  "book": {
    "id": "uuid",
    "title": "To Kill a Mockingbird",
    "availableCopies": 4,
    "totalCopies": 5
  }
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Not Available",
  "message": "No copies available for borrowing"
}
```

---

### 10. Return a Book
**POST** `/api/books/:id/return`

Return a borrowed book (increases available copies by 1).

**Example:**
```bash
curl -X POST http://localhost:3000/api/books/{BOOK_ID}/return
```

**Response (200 OK):**
```json
{
  "message": "Book returned successfully",
  "book": {
    "id": "uuid",
    "title": "To Kill a Mockingbird",
    "availableCopies": 5,
    "totalCopies": 5
  }
}
```

---

## 🧪 Testing Examples

### Complete Test Workflow

#### Step 1: Get all books
```bash
curl http://localhost:3000/api/books
```

#### Step 2: Add a new book
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "isbn": "978-0-14-143951-8",
    "publishedYear": 1813,
    "genre": "Romance",
    "availableCopies": 6,
    "totalCopies": 6
  }'
```

#### Step 3: Search for the new book
```bash
curl "http://localhost:3000/api/books/search/query?q=pride"
```

#### Step 4: Update book (partial)
```bash
curl -X PATCH http://localhost:3000/api/books/{BOOK_ID} \
  -H "Content-Type: application/json" \
  -d '{"availableCopies": 10}'
```

#### Step 5: Borrow a book
```bash
curl -X POST http://localhost:3000/api/books/{BOOK_ID}/borrow
```

#### Step 6: Return a book
```bash
curl -X POST http://localhost:3000/api/books/{BOOK_ID}/return
```

#### Step 7: Delete a book
```bash
curl -X DELETE http://localhost:3000/api/books/{BOOK_ID}
```

### Using Postman or Thunder Client

1. **Import Collection:** Use `Library_API_Postman_Collection.json`
2. Set the request type (GET, POST, PUT, PATCH, DELETE)
3. Add request body for POST/PUT operations
4. Set Content-Type header to `application/json`
5. Send requests and view responses

---

## Error Handling

### Standard Error Format
All error responses follow this format:
```json
{
  "error": "Error Type",
  "message": "Detailed error message"
}
```

### Common HTTP Status Codes
- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict (e.g., duplicate ISBN)
- `500 Internal Server Error` - Server error

### Error Testing Examples

**Test 1: Missing required fields**
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title": "Incomplete Book"}'
```
Expected: 400 Bad Request

**Test 2: Duplicate ISBN**
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Duplicate",
    "author": "Test",
    "isbn": "978-0-06-112008-4"
  }'
```
Expected: 409 Conflict

---

## Data Model

### Book Object Structure
```json
{
  "id": "string (UUID)",
  "title": "string",
  "author": "string",
  "isbn": "string (unique)",
  "publishedYear": "number (optional)",
  "genre": "string",
  "availableCopies": "number",
  "totalCopies": "number",
  "createdAt": "string (ISO 8601 timestamp)",
  "updatedAt": "string (ISO 8601 timestamp)"
}
```

### Notes
- IDs are UUIDs generated automatically
- ISBN numbers must be unique
- Book IDs cannot be changed once created
- Timestamps are in ISO 8601 format

---

## 📁 Project Structure

```
library-api/
├── server.js                              # Main API implementation
├── package.json                           # Dependencies and scripts
├── README.md                              # Complete documentation (this file)
├── Library_API_Postman_Collection.json    # Postman collection
├── .gitignore                             # Git ignore file
└── node_modules/                          # Dependencies
```

---

## 💾 Sample Data

The API comes pre-loaded with 3 sample books:
1. **To Kill a Mockingbird** by Harper Lee (Fiction, 1960)
2. **1984** by George Orwell (Dystopian, 1949)
3. **The Great Gatsby** by F. Scott Fitzgerald (Classic, 1925)

---

## 🎓 Learning Outcomes

This project demonstrates understanding of:
- RESTful API design principles
- HTTP methods and status codes
- Express.js framework and middleware
- CRUD operations implementation
- Input validation and error handling
- Response formatting and structure
- Query parameter handling
- UUID-based ID generation
- In-memory data management
- API documentation best practices
- Testing methodologies

---

### ✅ Requirements Met

| Requirement | Status | Details |
|-------------|--------|---------|
| RESTful API Design | ✅ | Complete with 10 endpoints |
| CRUD Operations | ✅ | All implemented and tested |
| Library System | ✅ | Full inventory management |
| API Documentation | ✅ | Comprehensive with examples |
| Functional Code | ✅ | Fully working with validation |
| Error Handling | ✅ | Proper status codes and messages |



---

## 📝 License

This project is licensed under the MIT License.

---
