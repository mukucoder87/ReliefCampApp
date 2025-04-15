const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for demonstration.
const formDataStorage = [];

app.post('/submit', (req, res) => {
  const data = req.body;
  formDataStorage.push(data);
  console.log("Received data:", data);
  res.json({ message: "Data submitted successfully." });
});

app.get('/dashboardData', (req, res) => {
  const summary = {};
  formDataStorage.forEach(item => {
    const district = item.district || "Unknown";
    if (!summary[district]) {
      summary[district] = {
        count: 0,
        totalPopulationCapacity: 0,
        totalArea: 0
      };
    }
    summary[district].count++;
    summary[district].totalPopulationCapacity += Number(item.totalPopulationCapacity) || 0;
    summary[district].totalArea += Number(item.totalArea) || 0;
  });
  res.json(summary);
});

app.get('/', (req, res) => {
  res.send('Server is working!');
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
