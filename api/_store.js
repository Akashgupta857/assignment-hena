const seedBooks = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    publicationYear: 1960,
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    publicationYear: 1949,
  },
  {
    id: "3",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    publicationYear: 1925,
  },
  {
    id: "4",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "Non-Fiction",
    publicationYear: 2011,
  },
  {
    id: "5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    publicationYear: 1937,
  },
];

let books = [...seedBooks];
let nextId =
  books.reduce((max, b) => Math.max(max, Number.parseInt(b.id, 10) || 0), 0) + 1;

export function listBooks() {
  return books;
}

export function findBook(id) {
  return books.find((b) => b.id === id);
}

export function createBook(data) {
  const book = { ...data, id: String(nextId++) };
  books = [...books, book];
  return book;
}

export function updateBook(id, data) {
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) return null;
  const updated = { ...data, id };
  books = books.map((b) => (b.id === id ? updated : b));
  return updated;
}

export function removeBook(id) {
  const before = books.length;
  books = books.filter((b) => b.id !== id);
  return books.length < before;
}
