// entry point — loads env vars and starts the http server
// keeping this separate from app.js so tests can import app without starting the server

require("dotenv").config();
const { httpServer } = require("./src/app");

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
