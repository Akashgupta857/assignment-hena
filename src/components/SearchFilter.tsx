import { GENRES } from "../types/book";

interface SearchFilterProps {
  searchQuery: string;
  genreFilter: string;
  onSearchChange: (value: string) => void;
  onGenreChange: (value: string) => void;
}

export function SearchFilter({
  searchQuery,
  genreFilter,
  onSearchChange,
  onGenreChange,
}: SearchFilterProps) {
  return (
    <section className="search-filter" aria-label="Search and filter books">
      <div className="field">
        <label htmlFor="search">Search by title or author</label>
        <input
          id="search"
          type="search"
          placeholder="e.g. Tolkien, 1984..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="genre">Filter by genre</label>
        <select
          id="genre"
          value={genreFilter}
          onChange={(e) => onGenreChange(e.target.value)}
        >
          {GENRES.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
