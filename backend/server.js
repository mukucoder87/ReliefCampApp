const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for demonstration.
// For production, integrate a persistent database (e.g., MongoDB).
const formDataStorage = [];

app.post('/submit', (req, res) => {
  const data = req.body;
  formDataStorage.push(data);
  console.log("Received data:", data);
  res.json({ message: "Data submitted successfully." });
});

// Dashboard endpoint to aggregate data by district
app.get('/dashboardData', (req, res) => {
  const summary = {};
  formDataStorage.forEach(item => {
    const district = item.district || "Unknown";
    if (!summary[district]) {
      summary[district] = {
        count: 0,
        totalPopulationCapacity: 0,
        totalArea: 0
        // Extend this as you add more variables
      };
    }
    summary[district].count++;
    summary[district].totalPopulationCapacity += Number(item.totalPopulationCapacity) || 0;
    summary[district].totalArea += Number(item.totalArea) || 0;
  });
  res.json(summary);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
