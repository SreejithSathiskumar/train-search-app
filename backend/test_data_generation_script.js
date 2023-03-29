// const MongoClient = require("mongodb").MongoClient;
// const faker = require("faker");

// const uri = "mongodb://localhost/train-search-app";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// const STATIONS = [
//   "Chennai", "Vellore", "Bangalore", "Mysuru", "Mangalore", "Shimoga", "Mumbai", "Pune", "Hyderabad", "Kolkata", "New Delhi", "Jaipur", "Lucknow", "Goa", "Bhopal", "Nagpur", "Indore", "Patna", "Ranchi", "Guwahati"
// ];

// const getRandomInt = (min, max) => {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };

// const generateTrain = () => {
//   const trainName = `Train ${faker.random.alphaNumeric(4)}`;
//   const stopsCount = getRandomInt(3, 7);
//   const stops = [];
//   let prevStation = null;

//   for (let i = 0; i < stopsCount; i++) {
//     let station = STATIONS[getRandomInt(0, STATIONS.length - 1)];

//     while (prevStation === station) {
//       station = STATIONS[getRandomInt(0, STATIONS.length - 1)];
//     }

//     stops.push({
//       station,
//       distanceFromPrev: i === 0 ? 0 : getRandomInt(100, 400),
//       departureTime: `${getRandomInt(0, 23)}:${getRandomInt(0, 59).toString().padStart(2, "0")}`,
//     });

//     prevStation = station;
//   }

//   return { trainName, stops };
// };

// const generateTestData = async () => {
//   try {
//     await client.connect();
//     const db = client.db("train-search-app");
//     const trainsCollection = db.collection("trains");

//     // Delete existing data
//     await trainsCollection.deleteMany({});

//     // Generate and insert 1000 train objects
//     const trains = Array.from({ length: 1000 }, generateTrain);
//     await trainsCollection.insertMany(trains);

//     console.log("Test data generation complete!");
//   } catch (err) {
//     console.error("Error generating test data:", err);
//   } finally {
//     client.close();
//   }
// };

// generateTestData();

const mongoose = require('mongoose');
const faker = require('faker');

const Train = require('../database/models/train');

mongoose.connect("mongodb://localhost:27017/train_search_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error connecting to MongoDB:', error.message);
});

const stations = [
  'Chennai',
  'Vellore',
  'Bangalore',
  'Mysuru',
  'Mangalore',
  'Shimoga'
];

const generateTrains = async () => {
  const trains = [];

  for (let i = 0; i < 1000; i++) {
    const train = new Train({
      trainName: faker.company.companyName() + ' Express',
      stops: []
    });
    
    let distance = 0;
    
    for (let j = 0; j < 5; j++) {
      const station = stations[j];
      const nextStation = stations[j + 1];
      const time = faker.date.between('2023-04-01T00:00:00.000Z', '2023-04-02T00:00:00.000Z').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
      const stop = {
        station,
        distanceFromPrev,
        departureTime: time
      };
    
      train.stops.push(stop);
    
      if (nextStation) {
        const distanceToNext = faker.datatype.number({ min: 100, max: 300 });
        distance += distanceToNext;
      }
    }
    
    trains.push(train);
    }
    
    await Train.insertMany(trains);
    
    console.log('Data generated');
    mongoose.connection.close();
    };
    
    generateTrains();