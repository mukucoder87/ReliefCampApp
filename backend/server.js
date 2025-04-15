const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔌 Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/reliefcamp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connected to MongoDB");
}).catch(err => {
  console.error("❌ MongoDB connection error:", err);
});

// ✅ Import model
const ReliefCamp = require('./db/reliefCamp.model');

// 📨 Submit Data
app.post('/submit', async (req, res) => {
  try {
    const camp = new ReliefCamp(req.body);
    await camp.save();
    console.log("📥 Saved data:", req.body);
    res.json({ message: "Data saved successfully to MongoDB." });
  } catch (error) {
    console.error("❌ Save error:", error);
    res.status(500).json({ error: "Failed to save data." });
  }
});

// 📊 Dashboard Summary
app.get('/dashboardData', async (req, res) => {
  try {
    const data = await ReliefCamp.find();
    const summary = {};

    data.forEach(item => {
      const district = item.district || "Unknown";
      if (!summary[district]) {
        summary[district] = {
          count: 0,
          totalPopulationCapacity: 0,
          totalArea: 0
        };
      }
      summary[district].count++;
      summary[district].totalPopulationCapacity += item.totalPopulationCapacity || 0;
      summary[district].totalArea += item.totalArea || 0;
    });

    res.json(summary);
  } catch (err) {
    console.error("❌ Dashboard error:", err);
    res.status(500).json({ error: "Dashboard generation failed." });
  }
});

app.get('/', (req, res) => {
  res.send('🌐 MongoDB-powered Server is working!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
