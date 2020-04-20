// Server Dependencies
var express = require("express");

// Sets up the Express App and Port
var app = express();
var PORT = /* For heroko ... process.env.PORT || */ 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Import API ROUTES
require("./app/routing/apiRoutes")(app);

//Import PAGES ROUTES
require("./app/routing/htmlRoutes")(app);

// Starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
