require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const hbs = require("hbs");

const app = express();
const routes = require("./routes/index");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set Handlebars as the view engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Use routes
app.use("/", routes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
