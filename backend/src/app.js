// main express app setup
// http server, socket.io, cors, routes, error handler all wired here
// server.js just calls this and starts listening

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const dishRoutes = require("./routes/dishRoutes");
const errorHandler = require("./middleware/errorHandler");
const { seedDatabase } = require("./utils/seed");

const app = express();
const httpServer = http.createServer(app);

// attach socket.io to the http server
// allowing connections from wherever the frontend is running
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// make io available anywhere via req.app.get("io")
// controllers use this to emit real-time updates
app.set("io", io);

// standard middleware
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// seed on startup — safe to run every boot, skips if already seeded
seedDatabase();

// routes
app.use("/api/dishes", dishRoutes);

// health check — quick way to verify the api is alive
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// catch-all for routes that don't exist
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// global error handler — must be last
app.use(errorHandler);

// log whenever a socket client connects or disconnects
io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

module.exports = { httpServer };
