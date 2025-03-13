const express = require("express");
const { getMoods, addMood, deleteMood } = require("../controllers/moodController");

const router = express.Router();

router.get("/", getMoods);
router.post("/", addMood);
router.delete("/:id", deleteMood);

module.exports = router;