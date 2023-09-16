const mongoose = require("mongoose");
const dbURI = "mongodb+srv://Edi:programimi2023@jwtauth.ru237kk.mongodb.net/";

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
