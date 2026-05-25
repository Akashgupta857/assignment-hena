import { useState } from "react";
import { BookForm } from "./components/BookForm";
import { BookList } from "./components/BookList";
import { ErrorBanner } from "./components/ErrorBanner";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { SearchFilter } from "./components/SearchFilter";
import { useBooks } from "./hooks/useBooks";
import type { Book, BookFormData } from "./types/book";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [showForm, setShowForm] = useState(false);

  const {
    books,
    totalCount,
    loading,
    error,
    actionLoading,
    loadBooks,
    addBook,
    editBook,
    removeBook,
    clearError,
  } = useBooks({ searchQuery, genreFilter });

  const handleAddClick = () => {
    setEditingBook(null);
    setShowForm(true);
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleFormSubmit = async (data: BookFormData) => {
    if (editingBook) {
      await editBook(editingBook.id, data);
    } else {
      await addBook(data);
    }
    setShowForm(false);
    setEditingBook(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Book Management System</h1>
          <p className="subtitle">
            View, add, edit, and delete books — with search and genre filters.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddClick}
          disabled={actionLoading}
        >
          + Add Book
        </button>
      </header>

      {error && (
        <ErrorBanner
          message={error}
          onDismiss={clearError}
          onRetry={loadBooks}
        />
      )}

      <SearchFilter
        searchQuery={searchQuery}
        genreFilter={genreFilter}
        onSearchChange={setSearchQuery}
        onGenreChange={setGenreFilter}
      />

      <p className="results-count" aria-live="polite">
        Showing {books.length} of {totalCount} book{totalCount !== 1 ? "s" : ""}
      </p>

      {showForm && (
        <div className="form-panel">
          <BookForm
            key={editingBook?.id ?? "new"}
            book={editingBook}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            loading={actionLoading}
          />
        </div>
      )}

      <main>
        {loading ? (
          <LoadingSpinner label="Loading books..." />
        ) : (
          <BookList
            books={books}
            onEdit={handleEdit}
            onDelete={removeBook}
            disabled={actionLoading}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Book Management System — React + JSON Server API</p>
      </footer>
    </div>
  );
}

export default App;
