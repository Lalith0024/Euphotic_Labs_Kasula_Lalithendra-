// all the actual logic for dish operations lives here
// controllers stay thin and readable — no db calls scattered across routes
// any function that talks to the database goes through here

const db = require("../config/database");

// getAllDishes — simple select all, returns every dish ordered by name
// used by the frontend on initial load and after reconnects
function getAllDishes(req, res, next) {
  try {
    const dishes = db.prepare("SELECT * FROM dishes ORDER BY dishName ASC").all();

    // convert isPublished from 0/1 back to boolean for the client
    const formatted = dishes.map((d) => ({
      ...d,
      isPublished: d.isPublished === 1,
    }));

    res.json({ success: true, data: formatted });
  } catch (err) {
    next(err);
  }
}

// togglePublished — flips the isPublished value for one dish by its id
// returns the updated dish so the client can update state without a refetch
// also fires the socket event so ALL connected clients see the change in real time
function togglePublished(req, res, next) {
  try {
    const { dishId } = req.params;

    // grab the dish first — 404 if it doesn't exist
    const dish = db.prepare("SELECT * FROM dishes WHERE dishId = ?").get(dishId);
    if (!dish) {
      return res.status(404).json({ success: false, message: "Dish not found." });
    }

    // flip it
    const newStatus = dish.isPublished === 1 ? 0 : 1;
    db.prepare("UPDATE dishes SET isPublished = ? WHERE dishId = ?").run(newStatus, dishId);

    const updatedDish = {
      ...dish,
      isPublished: newStatus === 1,
    };

    // get the socket.io instance we attached to the app in app.js
    // and broadcast to all connected clients so they update in real time
    const io = req.app.get("io");
    if (io) {
      io.emit("dish:updated", updatedDish);
    }

    res.json({ success: true, data: updatedDish });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllDishes, togglePublished };
