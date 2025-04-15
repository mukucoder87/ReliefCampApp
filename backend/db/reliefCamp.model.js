const mongoose = require('mongoose');

const reliefSchema = new mongoose.Schema({
  district: String,
  campName: String,
  circle: String,
  village: String,
  campIncharge: String,
  latitude: String,
  longitude: String,
  distance: String,
  totalPopulationCapacity: Number,
  totalArea: Number
});

module.exports = mongoose.model('ReliefCamp', reliefSchema);
