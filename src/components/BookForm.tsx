import { useState, type FormEvent } from "react";
import type { Book, BookFormData } from "../types/book";
import { GENRES } from "../types/book";

interface BookFormProps {
  book?: Book | null;
  onSubmit: (data: BookFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const emptyForm: BookFormData = {
  title: "",
  author: "",
  genre: "Fiction",
  publicationYear: new Date().getFullYear(),
};

const genreOptions = GENRES.filter((g) => g !== "All");

function getInitialForm(book?: Book | null): BookFormData {
  if (!book) return emptyForm;
  return {
    title: book.title,
    author: book.author,
    genre: book.genre,
    publicationYear: book.publicationYear,
  };
}

export function BookForm({ book, onSubmit, onCancel, loading }: BookFormProps) {
  const [form, setForm] = useState<BookFormData>(() => getInitialForm(book));
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (
    field: keyof BookFormData,
    value: string | number,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setValidationError(null);
  };

  const validate = (): boolean => {
    if (!form.title.trim()) {
      setValidationError("Title is required.");
      return false;
    }
    if (!form.author.trim()) {
      setValidationError("Author is required.");
      return false;
    }
    if (!form.genre) {
      setValidationError("Genre is required.");
      return false;
    }
    const year = Number(form.publicationYear);
    if (!Number.isFinite(year) || year < 1000 || year > 2100) {
      setValidationError("Enter a valid publication year (1000–2100).");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({
      ...form,
      title: form.title.trim(),
      author: form.author.trim(),
      publicationYear: Number(form.publicationYear),
    });
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{book ? "Edit Book" : "Add New Book"}</h2>
      {validationError && (
        <p className="form-error" role="alert">
          {validationError}
        </p>
      )}
      <div className="form-grid">
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            value={form.author}
            onChange={(e) => handleChange("author", e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="form-genre">Genre</label>
          <select
            id="form-genre"
            value={form.genre}
            onChange={(e) => handleChange("genre", e.target.value)}
          >
            {genreOptions.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="year">Publication Year</label>
          <input
            id="year"
            type="number"
            min={1000}
            max={2100}
            value={form.publicationYear}
            onChange={(e) =>
              handleChange("publicationYear", Number(e.target.value))
            }
            required
          />
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : book ? "Update Book" : "Add Book"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
