const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const dbConnection = require("./server/db"); // loads our connection to the mongo database
const passport = require("./server/passport");

const app = express();

app
  .use(express.static(__dirname + "/public"));

// Serve the static files from the React app

app.use(express.static(path.join(__dirname, "client2/build")))
   .use(cors())
   .use(cookieParser())
   .use(morgan('dev'))
   .use(bodyParser.json());

   app.use(
     bodyParser.urlencoded({
       extended: false
     })
   );

   app.use(
     session({
       secret: process.env.APP_SECRET || "this is the default passphrase",
       store: new MongoStore({ mongooseConnection: dbConnection }),
       resave: false,
       saveUninitialized: false
     })
   );

   app.use(passport.initialize());
   app.use(passport.session());

   if (process.env.NODE_ENV === "production") {
     const path = require("path");
     console.log("YOU ARE IN THE PRODUCTION ENV");
     app.use(
       "/static",
       express.static(path.join(__dirname, "../build/static"))
     );
     app.get("/", (req, res) => {
       res.sendFile(path.join(__dirname, "../build/"));
     });
   }

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname+'/client2/build/index.html'))
});

// require("./client2/src/App/utils/API")(app);

app.use("./server/authentication", require("./server/authentication"));

// ====== Error handler ====
app.use(function(err, req, res, next) {
  console.log("====== ERROR =======");
  console.error(err.stack);
  res.status(500);
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
