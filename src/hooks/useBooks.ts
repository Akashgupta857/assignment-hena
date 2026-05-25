import { useCallback, useEffect, useMemo, useState } from "react";
import * as booksApi from "../api/booksApi";
import type { Book, BookFormData } from "../types/book";

interface UseBooksOptions {
  searchQuery: string;
  genreFilter: string;
}

export function useBooks({ searchQuery, genreFilter }: UseBooksOptions) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await booksApi.fetchBooks();
      setBooks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load books");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial API fetch on mount
    void loadBooks();
  }, [loadBooks]);

  const filteredBooks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return books.filter((book) => {
      const matchesGenre =
        genreFilter === "All" || book.genre === genreFilter;
      const matchesSearch =
        !query ||
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query);
      return matchesGenre && matchesSearch;
    });
  }, [books, searchQuery, genreFilter]);

  const addBook = async (data: BookFormData) => {
    setActionLoading(true);
    setError(null);
    try {
      const created = await booksApi.createBook(data);
      setBooks((prev) => [...prev, created]);
      return created;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to add book";
      setError(message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const editBook = async (id: string, data: BookFormData) => {
    setActionLoading(true);
    setError(null);
    try {
      const updated = await booksApi.updateBook(id, data);
      setBooks((prev) => prev.map((b) => (b.id === id ? updated : b)));
      return updated;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update book";
      setError(message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const removeBook = async (id: string) => {
    setActionLoading(true);
    setError(null);
    try {
      await booksApi.deleteBook(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete book";
      setError(message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    books: filteredBooks,
    totalCount: books.length,
    loading,
    error,
    actionLoading,
    loadBooks,
    addBook,
    editBook,
    removeBook,
    clearError,
  };
}
