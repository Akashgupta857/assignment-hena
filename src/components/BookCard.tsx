import type { Book } from "../types/book";

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
  disabled?: boolean;
}

export function BookCard({ book, onEdit, onDelete, disabled }: BookCardProps) {
  const handleDelete = () => {
    if (
      window.confirm(
        `Delete "${book.title}" by ${book.author}? This cannot be undone.`,
      )
    ) {
      onDelete(book.id);
    }
  };

  return (
    <article className="book-card">
      <header>
        <h3>{book.title}</h3>
        <span className="genre-badge">{book.genre}</span>
      </header>
      <dl className="book-meta">
        <div>
          <dt>Author</dt>
          <dd>{book.author}</dd>
        </div>
        <div>
          <dt>Published</dt>
          <dd>{book.publicationYear}</dd>
        </div>
      </dl>
      <div className="card-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onEdit(book)}
          disabled={disabled}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDelete}
          disabled={disabled}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
