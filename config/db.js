const mongoose = require("mongoose");
const colors = require("colors");

const DataBaseConnection = async () => {
  try {
    //console.log("MONGO URI", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`DataBase Connected`.bgBlue);
  } catch (error) {
    console.log(`Server Faild ${error}`.bgRed);
  }
};
module.exports = DataBaseConnection;
