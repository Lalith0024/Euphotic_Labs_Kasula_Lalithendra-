# Dish Management Dashboard — Euphotic Labs Assignment

## The assignment

Build a system to manage and display dish information. The recruiter asked for:

1. A database with `dishId`, `dishName`, `imageUrl`, `isPublished` fields, seeded with their data
2. A REST API to fetch dishes and toggle publish status
3. A React dashboard to display dishes and toggle status with UI + backend sync
4. **Bonus:** Real-time updates — if a dish is toggled directly in the backend (not through the UI), the dashboard updates automatically

## My approach

I treated this like I'd treat a real feature at a SaaS company — not just "make it work" but make it maintainable, handle edge cases, and give the user a polished experience.

**Backend:** Node.js + Express + SQLite (via better-sqlite3) + Socket.IO. SQLite means zero external database setup — `npm install` and you're running. The database seeds itself automatically on the first boot. Socket.IO is attached to the same Express HTTP server so there's only one port to manage.

**Frontend:** React + Vite + Tailwind CSS. Clean light theme, responsive grid, skeleton loading states, optimistic UI updates (the toggle feels instant and rolls back gracefully if the API fails), search and filter, and a live indicator that confirms the socket connection is active.

**Real-time bonus:** When any client (or a direct API call via Postman/curl) toggles a dish, the backend emits a `dish:updated` Socket.IO event to every connected client. All dashboards update live with a toast notification — no polling, no page refresh.

## Tech stack

| Layer | Tech | Why |
|-------|------|-----|
| Runtime | Node.js 18 | Stable, widespread, recruiter-friendly |
| API framework | Express | Minimal, well-understood, easy to read |
| Database | SQLite (better-sqlite3) | No server needed, perfect for assignments and prototypes |
| Real-time | Socket.IO | Easiest path to reliable WebSocket with fallbacks |
| Frontend | React + Vite | Fast DX, standard in most product teams |
| Styling | Tailwind CSS | Utility-first, consistent, easy to maintain |
| HTTP client | Axios | Clean error handling vs fetch |
| Notifications | react-hot-toast | Lightweight, looks good |

## Relevance to Euphotic Labs

Euphotic Labs works on food-tech and platform products where real-time state management — publishing menus, updating availability, syncing across clients — is a core concern. This assignment maps directly to that: a live-updating dashboard where operators can control dish visibility, backed by a clean API that any other service could also call. The Socket.IO real-time layer is exactly the pattern you'd use for kitchen display systems, live order boards, or multi-operator admin panels.

## Optimizations

- **Optimistic UI** — toggles feel instant; errors roll back gracefully
- **Debounce-free search** — filtering happens in memory on the client, no API calls per keystroke
- **WAL mode on SQLite** — better concurrency and read performance
- **Skeleton loading** — no layout shift, better perceived performance
- **Single socket server** — socket.io piggybacks on the same Express HTTP server, no extra port
- **Seed guard** — seeding checks row count first, safe to restart the server without duplicating data

## Running locally

See [setup.md](./setup.md) for full instructions.

```bash
# backend
cd backend && npm install && npm run dev

# frontend (new terminal)
cd frontend && npm install && npm run dev
```

Open `http://localhost:5173`.
