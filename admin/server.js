const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection URI
const dbURI = "mongodb+srv://Edi:programimi2023@jwtauth.ru237kk.mongodb.net/";

// Connect to the MongoDB database
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// Load User model
const User = require("./models/User");

// Routes

// Login page route
// ...

// Login page route
app.get("/login", (req, res) => {
    res.render("login");
  });
  
  // Handle login POST request at the /login path
  app.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    // Check if the username and password are correct
    if (username === "admin" && password === "admin") {
      // Successful login
      res.redirect("/"); // Redirect to the "/index" page or any other destination
    } else {
      // Failed login
      res.send("Admin login failed. Please check your credentials.");
    }
  });
  
  // ...
  
  app.get("/", async (req, res) => {
    try {
      const users = await User.find();
      res.render("index", { users });
    } catch (err) {
      console.error("Error in /index route:", err);
      res.status(500).send("Internal Server Error");
    }
  });
  
  // ...
  

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    await newUser.save();
    res.redirect("/");
  } catch (err) {
    console.error("Error in /add route:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/edit/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("edit", { user });
  } catch (err) {
    console.error("Error in /edit/:id route:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/edit/:id", async (req, res) => {
  try {
    const { email, password } = req.body;
    await User.findByIdAndUpdate(req.params.id, { email, password });
    res.redirect("/");
  } catch (err) {
    console.error("Error in /edit/:id route:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error("Error in /delete/:id route:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
