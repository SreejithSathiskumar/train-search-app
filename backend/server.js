// const express = require("express");
// const cors = require("cors");
// const app = express();
// const api = require("./api");
// const db = require("./database");

// app.use(cors());
// app.use(express.json());
// app.use("/api", api);
// db.connect();

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });/

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const db = require("./database");
const Train = require("./database/models/train");
const app = express();

app.use(cors());
app.use(express.json());
const api = require("./api");
// mongoose.connect('mongodb://localhost:27017/train_search_app', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((error) => {
//   console.log('Error connecting to MongoDB:', error.message);
// });

// const trainSchema = new mongoose.Schema({
//   trainName: { type: String, required: true },
//   stops: [{
//     station: { type: String, required: true },
//     distanceFromPrev: { type: Number, required: true },
//     departureTime: { type: String, required: true }
//   }]
// });
app.use("/api", api);
db.connect();

// app.get('/api/trains', async (req, res) => {
//   const { source, destination } = req.query;

//   const trains = await Train.find({
//     'stops.station': { $all: [source, destination] }
//   }).sort({ 'stops.departureTime': 1 });

//   res.json(trains);
// });

app.listen(5000, () => {
  console.log('Server started on port 5000');
});