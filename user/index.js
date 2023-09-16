const express = require("express");
const cookieParser = require("cookie-parser");
require("mongoose");
require("./dbConnection");
const authRoutes = require("./routes/authRoutes");
const { requireAuth } = require("./middlewares/authMiddlewares");

const app = express();

// Middlewares
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.set("view engine", "ejs");
app.use(authRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/dashboard", requireAuth, (req, res) => {
  res.render("dashboard");
});
