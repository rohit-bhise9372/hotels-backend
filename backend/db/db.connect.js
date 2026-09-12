// const dns = require("dns");
// dns.setServers(["8.8.8.8", "8.8.4.4"]);

// const mongoose = require("mongoose");
// require("dotenv").config();

// const mongoUri = process.env.MONGODB;

// const initializeDatabase = async () => {
//   await mongoose
//     .connect(mongoUri)
//     .then(() => {
//       console.log("Connected to Database");
//     })
//     .catch((error) => console.log("Error connecting to Database", error));
// };

// module.exports = { initializeDatabase };


const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initializeDatabase = async () => {
  try {
    if (!mongoUri) {
      throw new Error("MONGODB environment variable is missing.");
    }

    await mongoose.connect(mongoUri);

    console.log("Connected to Database");
  } catch (error) {
    console.error("Error connecting to Database:", error.message);
    throw error;
  }
};

module.exports = { initializeDatabase };