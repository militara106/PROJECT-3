const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require("express");
const path = require("path");

const app = express();

app
  .use(express.static(__dirname + "/public"));

// Serve the static files from the React app

app.use(express.static(path.join(__dirname, "client2/build")))
   .use(cors())
   .use(cookieParser());

require("./client2/src/App/utils/Api.js")(app);

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
