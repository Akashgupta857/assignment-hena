export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
}

export type BookFormData = Omit<Book, "id">;

export const GENRES = [
  "All",
  "Fiction",
  "Classic",
  "Fantasy",
  "Dystopian",
  "Non-Fiction",
  "Science Fiction",
  "Mystery",
  "Biography",
] as const;
