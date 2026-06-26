# Project Context

## What this is

A full-stack dish management dashboard built as a recruiter assignment for Euphotic Labs. The recruiter asked for a database, REST API, and a front-end that lets users toggle the published status of dishes — plus a bonus of real-time updates.

## My approach

I kept the tech choices boring-in-the-good-way: Node + Express + SQLite on the backend, React + Vite on the frontend, Socket.IO for real-time. SQLite means zero database server to spin up — `npm install` and you're running. Socket.IO handles the real-time bonus cleanly.

## Key decisions

- **SQLite over PostgreSQL** — no server setup for the recruiter, no docker-compose, just `npm run dev` and it works. Trivial to swap in Postgres if this were going to production.
- **better-sqlite3** — synchronous sqlite driver, keeps the server code simple and readable with no async db boilerplate.
- **Optimistic UI** — when you click Toggle, the UI updates immediately and rolls back if the API call fails. Feels instant.
- **Socket.IO on the same server** — attaching socket.io to the express http server means one port, one process, no separate WebSocket server.
- **Seed on boot** — the database seeds itself the first time the server starts. No separate seed script to remember to run.

## What I'd change for production

- Swap SQLite for PostgreSQL
- Add authentication
- Add pagination on the API
- Write unit tests for the controller functions
- Set up proper CI/CD
