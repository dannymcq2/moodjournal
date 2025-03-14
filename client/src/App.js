import { useEffect, useState } from "react";
import axios from "axios";
import MoodChart from "./MoodChart";
import "./App.css"; // ✅ Import styles

function App() {
  const [moods, setMoods] = useState([]);
  const [mood, setMood] = useState("");
  const [description, setDescription] = useState("");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode); // Save preference
  };

  useEffect(() => {
    axios.get("https://moodjournal-lo9i.onrender.com/api/moods") // ✅ Correct endpoint
      .then(response => setMoods(response.data))
      .catch(error => console.error("Error fetching moods:", error));
  }, []);
  
  const handleDelete = async (id) => {
    try {
      setMoods(moods.map(m => m._id === id ? { ...m, deleting: true } : m));

      setTimeout(async () => {
        await axios.delete(`https://moodjournal-lo9i.onrender.com/api/moods/${id}`); // ✅ Correct endpoint
        setMoods(moods.filter(m => m._id !== id));
      }, 300);
    } catch (error) {
      console.error("Error deleting mood:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood) return;

    try {
      const response = await axios.post("https://moodjournal-lo9i.onrender.com/api/moods", { // ✅ Correct endpoint
        mood,
        description
      });
      setMoods([response.data, ...moods]);
      setMood("");
      setDescription("");
    } catch (error) {
      console.error("Error adding mood:", error);
    }
  };

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Dark Mode Toggle */}
      <button className="toggle-dark" onClick={toggleDarkMode}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="container">
        <h1>Mood Journal</h1>

        {/* Form to Add Mood */}
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Your mood..." 
            value={mood} 
            onChange={(e) => setMood(e.target.value)}
            required
          />
          <input 
            type="text" 
            placeholder="Description (optional)" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Add Mood</button>
        </form>

        {/* Display Moods */}
        <ul>
          {moods.map(m => (
            <li key={m._id} className={m.deleting ? "deleting" : ""}>
              <span className="mood-text">{m.mood}</span>
              <span>{m.description ? `: ${m.description}` : ''}</span>
              <button className="delete-btn" onClick={() => handleDelete(m._id)}>❌</button>
            </li>
          ))}
        </ul>

        {/* Mood Chart */}
        <div className="chart-container">
          <MoodChart moods={moods} />
        </div>
      </div>
    </div>
  );
  
}

export default App;