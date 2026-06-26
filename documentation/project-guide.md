# Project Guide

## How to run this

### Prerequisites
- Node.js 18+
- npm

### Start the backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Server runs on `http://localhost:5000`. Database auto-creates and seeds on first boot.

### Start the frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

### Check it's working

- Open `http://localhost:5173` — you should see 8 dishes
- Click any Toggle button — the card updates instantly
- Open a second browser tab — toggling in one tab updates the other in real time (Socket.IO)
- To test the bonus: use curl or Postman to call `PATCH http://localhost:5000/api/dishes/d1/toggle` — both tabs update without you touching the UI

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/dishes` | Fetch all dishes |
| PATCH | `/api/dishes/:dishId/toggle` | Toggle isPublished for one dish |
| GET | `/health` | Server health check |

---

## Folder structure at a glance

```
backend/
  src/
    config/     ← db connection
    controllers/ ← business logic
    routes/     ← url → controller wiring
    middleware/ ← error handler
    utils/      ← seed script
  server.js     ← entry point

frontend/
  src/
    api/        ← axios calls
    components/ ← ui components
    hooks/      ← useDishes (data + socket)
    App.jsx     ← root layout

documentation/
  context.md
  project-guide.md
  erd-and-api.md

setup.md      ← (root)
README.md     ← (root)
```
