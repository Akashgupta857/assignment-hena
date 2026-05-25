import { createBook, listBooks } from "./_store.js";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method === "GET") {
    return res.status(200).json(listBooks());
  }

  if (req.method === "POST") {
    const { title, author, genre, publicationYear } = req.body ?? {};
    if (!title || !author || !genre || publicationYear == null) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const book = createBook({
      title: String(title).trim(),
      author: String(author).trim(),
      genre: String(genre),
      publicationYear: Number(publicationYear),
    });
    return res.status(201).json(book);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
