const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/train_search_app';
const db = require("./database");
const stations = ['Chennai', 'Vellore', 'Bangalore', 'Mysuru', 'Mangalore', 'Shimoga'];
const Train = require("./database/models/train");

db.connect();
// Generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random stop object with station, distanceFromPrev, and departureTime properties
function generateStop(prevStation, prevDistance) {
  const remainingStations = stations.slice(stations.indexOf(prevStation) + 1);
  const station = remainingStations[getRandomInt(0, remainingStations.length - 1)];
  const distanceFromPrev = getRandomInt(50, 200);
  const departureTime = `${getRandomInt(0, 23)}:${getRandomInt(0, 59).toString().padStart(2, '0')}`;
  return { station, distanceFromPrev, departureTime, prevDistance: prevDistance + distanceFromPrev };
}

// Generate a random train object with trainName and stops properties
function generateTrain() {
  const trainName = `Train ${getRandomInt(1, 1000)}`;
  const numStops = getRandomInt(2, 6);
  let stops = [];
  let prevStation = null;
  let prevDistance = 0;
  for (let i = 0; i < numStops; i++) {
    const stop = generateStop(prevStation, prevDistance);
    stops.push(stop);
    prevStation = stop.station;
    prevDistance = stop.prevDistance;
  }
  return { trainName, stops };
}

// Generate and insert 1000 random train objects into the database
(async () => {
 
  const trains = [];
  for (let i = 0; i < 1000; i++) {
    trains.push(generateTrain());
  }
  await Train.insertMany(trains);
  console.log('Inserted 1000 train records into "trains" collection.');
})();