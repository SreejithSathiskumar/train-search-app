const mongoose = require("mongoose");

const connect = () => {
  
  mongoose.connect("mongodb://127.0.0.1:27017/train_search_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", (error) => {
    console.error("Error connecting to the database:", error);
  });

  db.once("open", () => {
    console.log("Connected to the database.");
  });
};

module.exports = { connect };