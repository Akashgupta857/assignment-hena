# Book Management System

A React application for managing a library of books with full CRUD operations, search, and genre filtering. Data is persisted via a [JSON Server](https://github.com/typicode/json-server) REST API.

## Features

- **View** all books (title, author, genre, publication year)
- **Add** new books via a validated form
- **Edit** existing books
- **Delete** books with confirmation
- **Search** by title or author (client-side)
- **Filter** by genre
- Loading states, error handling with retry, and empty states

## Tech Stack

- React 19 + TypeScript + Vite
- JSON Server (mock REST API)
- CSS (no external UI framework)

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm 9+

## Local Setup

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd book-management-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment (optional)**

   Copy the example env file. The default points to the local API:

   ```bash
   cp .env.example .env
   ```

   Default value: `VITE_API_URL=http://localhost:3001`

4. **Run the API and frontend together**

   ```bash
   npm run dev:all
   ```

   Or run in separate terminals:

   ```bash
   npm run api    # JSON Server at http://localhost:3001
   npm run dev    # Vite dev server at http://localhost:5173
   ```

5. Open **http://localhost:5173** in your browser.

## Available Scripts

| Script          | Description                          |
|-----------------|--------------------------------------|
| `npm run dev`   | Start Vite dev server only           |
| `npm run api`   | Start JSON Server on port 3001       |
| `npm run dev:all` | Run API + frontend concurrently    |
| `npm run build` | Production build to `dist/`        |
| `npm run preview` | Preview production build locally |
| `npm run lint`  | Run ESLint                           |

## API Endpoints

Base URL: `http://localhost:3001` (or your deployed API URL)

| Method | Endpoint        | Description   |
|--------|-----------------|---------------|
| GET    | `/books`        | List all books |
| POST   | `/books`        | Create a book  |
| PUT    | `/books/:id`    | Update a book  |
| DELETE | `/books/:id`    | Delete a book  |

Seed data lives in [`db.json`](./db.json).

## Deployment

The app uses a **split deployment**: JSON Server on [Render](https://render.com) (free tier) and the React frontend on [Vercel](https://vercel.com).

### 1. Deploy the API (Render)

1. Push this repo to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/) → **New** → **Blueprint**.
3. Connect your repo. Render reads [`render.yaml`](./render.yaml) and creates a web service.
4. After deploy, copy the service URL (e.g. `https://book-management-api.onrender.com`).

### 2. Deploy the frontend (Vercel)

1. Go to [Vercel](https://vercel.com) → **Add New Project** → import your GitHub repo.
2. Framework preset: **Vite**
3. Add environment variable:
   - `VITE_API_URL` = your Render API URL (no trailing slash)
4. Deploy.

### 3. CORS

JSON Server enables CORS by default. If you use another host, ensure the API allows requests from your Vercel domain.

## Project Structure

```
├── db.json                 # API seed data
├── render.yaml             # Render deployment config
├── vercel.json             # SPA routing for Vercel
├── src/
│   ├── api/booksApi.ts     # HTTP client
│   ├── hooks/useBooks.ts   # Data + CRUD logic
│   ├── components/         # UI components
│   └── types/book.ts       # TypeScript types
```

## Submission Links

After deploying, update this section with your URLs:

| Item              | URL |
|-------------------|-----|
| GitHub Repository | _Add your repo URL_ |
| Live Application  | _Add your Vercel URL_ |
| API (optional)    | _Add your Render API URL_ |

Submit the assignment: [Google Form](https://docs.google.com/forms/d/e/1FAIpQLSdOutwnDspdl4Xat8cCA2h6F8HpVz1ji1Sna_nWAE0-zafwww/viewform?usp=publish-editor)

## License

MIT
