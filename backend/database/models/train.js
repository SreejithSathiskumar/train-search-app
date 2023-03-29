const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema({
station: String,
distanceFromPrev: Number,
departureTime: String,
});

const trainSchema = new mongoose.Schema({
trainName: String,
stops: [stopSchema],
});

const Train = mongoose.model("trains", trainSchema);

module.exports = Train;