const mongoose = require("mongoose");

const MoodSchema = new mongoose.Schema({
  mood: { type: String, required: true },
  description: String
}, { timestamps: true });  // ✅ Adds createdAt & updatedAt automatically

module.exports = mongoose.model("Mood", MoodSchema);