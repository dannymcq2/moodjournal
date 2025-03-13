const Mood = require("../models/Mood");

// Get all moods
const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find().sort({ date: -1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add new mood
const addMood = async (req, res) => {
  try {
    const { mood, description } = req.body;
    const newMood = new Mood({ mood, description });
    await newMood.save();
    res.status(201).json(newMood);
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
};

// Delete a mood entry
const deleteMood = async (req, res) => {
  try {
    await Mood.findByIdAndDelete(req.params.id);
    res.json({ message: "Mood deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getMoods, addMood, deleteMood };