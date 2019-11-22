const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const forceSecure = require("force-secure-express");

const app = express();

app.use(forceSecure([
  "bcs-project-3.herokuapp.com"
]));

app.use(express.static(__dirname + "/public"));

app
  .use(express.static(path.join(__dirname, "client2/build")))
  .use(cors())
  .use(cookieParser());

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client2/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);

