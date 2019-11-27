const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const forceSecure = require("force-secure-express");
const { join } = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();

app.use(forceSecure([
  "bcs-project-3.herokuapp.com"
]));
app.use(morgan("dev"));
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

app
  .use(express.static(join(__dirname, "client2/build")))
  .use(cors())
  .use(cookieParser());


// Routes
// app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/vendorlist");

app.get("*", (req, res) => {
  res.sendFile(join(__dirname + "/client2/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);



