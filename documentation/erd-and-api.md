# ERD and API Structure

## Database Schema

```mermaid
erDiagram
    DISHES {
        TEXT dishId PK
        TEXT dishName
        TEXT imageUrl
        INTEGER isPublished
    }
```

Note: SQLite doesn't have a native boolean type so `isPublished` is stored as `0` or `1` and converted to `true/false` by the API before sending to the client.

---

## API Flow

```mermaid
flowchart TD
    Client["React Frontend"]
    API["Express API\n(localhost:5000)"]
    DB["SQLite DB\n(dishes.db)"]
    Socket["Socket.IO\n(same server)"]

    Client -- "GET /api/dishes" --> API
    API -- "SELECT * FROM dishes" --> DB
    DB -- "rows" --> API
    API -- "JSON { data: [...] }" --> Client

    Client -- "PATCH /api/dishes/:id/toggle" --> API
    API -- "UPDATE dishes SET isPublished..." --> DB
    DB -- "ok" --> API
    API -- "emit dish:updated" --> Socket
    Socket -- "broadcast to all clients" --> Client
    API -- "JSON { data: updatedDish }" --> Client
```

---

## Real-Time Update Flow (Bonus)

```mermaid
sequenceDiagram
    participant A as Client A (Dashboard)
    participant S as Express + Socket.IO
    participant B as Client B (another tab / Postman)

    A->>S: connects via WebSocket
    B->>S: PATCH /api/dishes/d1/toggle
    S->>S: update db
    S-->>A: emit("dish:updated", updatedDish)
    A->>A: update React state, show toast
```
