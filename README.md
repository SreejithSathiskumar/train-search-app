# Train Search Web Application

This application allows users to search for trains between source and destination stations, view available trains, and sort the results based on price and timings.

## Features

- Select source and destination stations from a dropdown menu
- Display a list of available trains, including train name, departure and arrival times, distance, and ticket prices
- Sort the list of trains based on price
- Scalable and able to handle a large number of stations and train routes
- User-friendly and easy to navigate

## Prerequisites

- Node.js
- MongoDB
- React.js

## Installation

1. Clone the repository:

git clone https://github.com/SreejithSathiskumar/train-search-app.git
cd train-search-app

2. Install frontend dependencies:

cd frontend
npm install

3. Install backend dependencies:

cd backend
npm install

1. Start the MongoDB server:

create a database named train_search_app
and collection named trainss

run the command - mongod

2. Start the backend server:

cd backend
npm start

3. In a new terminal, start the frontend server:

cd frontend
npm start

4. Open your browser and visit `http://localhost:3000`.

## Generating test data

To generate test data for 1000 trains and their routes, run the following command in the `backend` folder:

npm run generate-test-data
