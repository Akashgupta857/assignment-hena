import type { Book, BookFormData } from "../types/book";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new Error(message || `Request failed (${response.status})`);
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return response.json() as Promise<T>;
}

export async function fetchBooks(): Promise<Book[]> {
  const response = await fetch(`${API_BASE}/books`);
  return handleResponse<Book[]>(response);
}

export async function createBook(data: BookFormData): Promise<Book> {
  const response = await fetch(`${API_BASE}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Book>(response);
}

export async function updateBook(
  id: string,
  data: BookFormData,
): Promise<Book> {
  const response = await fetch(`${API_BASE}/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, id }),
  });
  return handleResponse<Book>(response);
}

export async function deleteBook(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/books/${id}`, {
    method: "DELETE",
  });
  return handleResponse<void>(response);
}
