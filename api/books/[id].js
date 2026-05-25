import { findBook, removeBook, updateBook } from "../_store.js";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "Book id is required" });
  }

  if (req.method === "GET") {
    const book = findBook(id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    return res.status(200).json(book);
  }

  if (req.method === "PUT") {
    const { title, author, genre, publicationYear } = req.body ?? {};
    if (!title || !author || !genre || publicationYear == null) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const updated = updateBook(id, {
      title: String(title).trim(),
      author: String(author).trim(),
      genre: String(genre),
      publicationYear: Number(publicationYear),
    });
    if (!updated) return res.status(404).json({ error: "Book not found" });
    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    const deleted = removeBook(id);
    if (!deleted) return res.status(404).json({ error: "Book not found" });
    return res.status(204).end();
  }

  return res.status(405).json({ error: "Method not allowed" });
}
