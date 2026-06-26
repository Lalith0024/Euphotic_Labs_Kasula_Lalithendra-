// just wires the url paths to the controller functions
// keeping routes separate from logic so both stay clean

const express = require("express");
const { getAllDishes, togglePublished } = require("../controllers/dishController");

const router = express.Router();

router.get("/", getAllDishes);
router.patch("/:dishId/toggle", togglePublished);

module.exports = router;
