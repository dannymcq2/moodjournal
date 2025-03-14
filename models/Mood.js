const mongoose = require("mongoose");

const MoodSchema = new mongoose.Schema({
  mood: String,
  description: String,
  createdAt: { type: Date, default: Date.now } // ✅ Auto-add timestamp
});

module.exports = mongoose.model("Mood", MoodSchema);