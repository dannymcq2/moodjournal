require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const moodRoutes = require("./routes/moodRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/moods", moodRoutes);

// Connect to database
const connectDB = require("./config/db");
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));