import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function MoodChart({ moods }) {
  const moodScale = {
    "happy": 5,
    "joyful": 4,
    "neutral": 3,
    "sad": 2,
    "angry": 1
  };

  const formattedData = moods.map(m => ({
    dateTime: new Date(m.createdAt).toLocaleString("en-US", { 
      hour: '2-digit', minute: '2-digit', hour12: true 
    }), // ✅ Shows time
    date: new Date(m.createdAt).toLocaleDateString("en-US"), // ✅ Keeps date
    moodValue: moodScale[m.mood.toLowerCase()] || 3,
    moodLabel: m.mood
  }));

  return (
    <div className="chart-container">
      <h3>Mood Trends</h3>
      <ResponsiveContainer width="90%" height={300}>
        <LineChart data={formattedData}>
          <XAxis dataKey="dateTime" angle={-20} textAnchor="end" /> {/* ✅ Show Time */}
          <YAxis domain={[1, 5]} tickFormatter={(tick) => {
            const moods = { 1: "Angry", 2: "Sad", 3: "Neutral", 4: "Joyful", 5: "Happy" };
            return moods[tick] || tick;
          }} />
          <CartesianGrid stroke="#ccc" />
          <Tooltip 
            formatter={(value, name, props) => {
              return [`Mood: ${props.payload.moodLabel}`, `Date: ${props.payload.date} - ${props.payload.dateTime}`];
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="moodValue" stroke="#6a5acd" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MoodChart;