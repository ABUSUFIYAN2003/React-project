const mongoose = require("mongoose");
const dbURI = "mongodb+srv://sufiyannissam:123@cluster0.fkm8ls4.mongodb.net/?retryWrites=true&w=majority/";

async function connect() {
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
}
connect();

module.exports = connect;
