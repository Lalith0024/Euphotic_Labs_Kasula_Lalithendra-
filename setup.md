# Setup

## Requirements

- Node.js 18 or higher
- npm

## Quick start

```bash
# 1. backend
cd backend
cp .env.example .env
npm install
npm run dev

# 2. frontend (new terminal)
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173`.

## Environment variables

### backend/.env

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 5000 | Port the Express server listens on |
| CLIENT_ORIGIN | http://localhost:5173 | CORS allowed origin |

### frontend/.env

| Variable | Default | Description |
|----------|---------|-------------|
| VITE_API_URL | http://localhost:5000 | Base URL of the backend API |
