// so this file is basically the single place where we open the sqlite connection
// and make sure the dishes table exists before anything else tries to use it
// using better-sqlite3 which is synchronous — keeps things simple, no callback hell
// the db file sits in /data/ which is gitignored so it never gets committed

const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const DATA_DIR = path.join(__dirname, "../../data");
const DB_PATH = path.join(DATA_DIR, "dishes.db");

// make the data folder if it doesn't exist yet — first run thing
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const db = new Database(DB_PATH);

// turn on WAL mode — better for concurrent reads, generally faster
db.pragma("journal_mode = WAL");

// create the table if it isn't there yet
// isPublished stored as INTEGER (0 or 1) because sqlite doesn't have a boolean type
db.exec(`
  CREATE TABLE IF NOT EXISTS dishes (
    dishId     TEXT PRIMARY KEY,
    dishName   TEXT NOT NULL,
    imageUrl   TEXT NOT NULL,
    isPublished INTEGER NOT NULL DEFAULT 0
  )
`);

module.exports = db;
