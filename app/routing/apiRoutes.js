//Load Data
var users = require("../data/users");

//Reference data points and functions
var UserProfile = users.UserProfile;
var addUser = users.addUser;
var userProfiles = users.userProfiles;

//Export Routes to express server
module.exports = function (app) {
  //GET ROUTES
  //============

  //Retrieve all profiles
  app.get("/api/profiles", function (req, res) {
    res.send(userProfiles);
  });

  //Retrieve specific profile
  app.get("/api/profile/:userID", function (req, res) {
    userExist = false;
    userProfiles.forEach((profile) => {
      if (profile.uniqueID === req.params.userID) {
        res.send(profile.getMatch());
        userExist = true;
        return;
      }
    });
    if (!userExist) {
      res.send(false);
      return;
    }
  });

  //Retrieve match for user
  app.get("/api/match/:userID", function (req, res) {
    var userExist = false;
    userProfiles.forEach((profile) => {
      if (profile.uniqueID === req.params.userID) {
        userExist = true;
        res.send(profile.getMatch());
        return;
      }
    });
    if (!userExist) {
      res.send(false);
      return;
    }
  });

  //POST ROUTES
  //===========

  app.post("/api/CreateProfile", function (req, res) {
    data = req.body;
    var valid = addUser(
      new UserProfile(data.name, data.uniqueID, data.profilePic, data.scores)
    );
    res.json(valid);
  });
};
