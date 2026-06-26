// this seeds the database with the initial dish data from the assignment
// it's safe to run multiple times — it checks if dishes already exist and skips if so
// call it once on first boot from app.js

const db = require("../config/database");

const DISHES = [
  {
    dishId: "d1",
    dishName: "Margherita Pizza",
    imageUrl: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400",
    isPublished: 1,
  },
  {
    dishId: "d2",
    dishName: "Spaghetti Carbonara",
    imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400",
    isPublished: 0,
  },
  {
    dishId: "d3",
    dishName: "Caesar Salad",
    imageUrl: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400",
    isPublished: 1,
  },
  {
    dishId: "d4",
    dishName: "Beef Burger",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    isPublished: 1,
  },
  {
    dishId: "d5",
    dishName: "Chicken Tikka Masala",
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
    isPublished: 0,
  },
  {
    dishId: "d6",
    dishName: "Sushi Platter",
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400",
    isPublished: 1,
  },
  {
    dishId: "d7",
    dishName: "Pad Thai",
    imageUrl: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400",
    isPublished: 0,
  },
  {
    dishId: "d8",
    dishName: "Fish Tacos",
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
    isPublished: 1,
  },
  {
    dishId: "d9",
    dishName: "Wagyu Steak",
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
    isPublished: 1,
  },
  {
    dishId: "d10",
    dishName: "Matcha Cheesecake",
    imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400",
    isPublished: 0,
  },
  {
    dishId: "d11",
    dishName: "Avocado Toast",
    imageUrl: "https://images.unsplash.com/photo-1588137378733-41c0e3a4731b?w=400",
    isPublished: 1,
  },
  {
    dishId: "d12",
    dishName: "Truffle Pasta",
    imageUrl: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400",
    isPublished: 1,
  }
];

function seedDatabase() {
  // check if we already have data — don't re-seed if rows exist
  const count = db.prepare("SELECT COUNT(*) as count FROM dishes").get();
  if (count.count > 0) {
    console.log("Database already seeded, skipping.");
    return;
  }

  const insert = db.prepare(`
    INSERT INTO dishes (dishId, dishName, imageUrl, isPublished)
    VALUES (@dishId, @dishName, @imageUrl, @isPublished)
  `);

  // wrap in a transaction so either all insert or none do
  const insertAll = db.transaction((dishes) => {
    for (const dish of dishes) {
      insert.run(dish);
    }
  });

  insertAll(DISHES);
  console.log(`Seeded ${DISHES.length} dishes into database.`);
}

module.exports = { seedDatabase };
