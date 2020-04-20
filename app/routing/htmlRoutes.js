//Dependencies
//============

//Loaded so that we can set dirPath to html files
var path = require("path");

//All HTML ROUTES
module.exports = function (app) {
  //Load Home page
  app.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  //Load Survey page
  app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  //Load Profile Page
  app.get("/profiles", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  });
};
