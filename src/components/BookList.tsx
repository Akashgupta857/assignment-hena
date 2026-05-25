import type { Book } from "../types/book";
import { BookCard } from "./BookCard";

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
  disabled?: boolean;
}

export function BookList({ books, onEdit, onDelete, disabled }: BookListProps) {
  if (books.length === 0) {
    return (
      <p className="empty-state">
        No books match your search or filter. Try adjusting your criteria or add
        a new book.
      </p>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
