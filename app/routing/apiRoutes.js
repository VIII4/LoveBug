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
        res.send(profile);
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
  });

  //POST ROUTES
  //===========

  //Req Data unique ID, profile Pic
  app.post("/api/CreateProfile", function (req, res) {
    data = req.body;
    var valid = addUser(new UserProfile(data.uniqueID, data.profilePic));
    res.json(valid);
  });

  //Req data { firstName, lastName, gender, scores, desiredGender}
  app.post("/api/UpdateProfile/:userID", function (req, res) {
    userExist = false;
    data = req.body;
    userProfiles.forEach((profile) => {
      if (profile.uniqueID === req.params.userID) {
        //Update profiles
        profile.addNames(data.firstName, data.lastName);
        profile.gender = data.gender;
        profile.desiredGender = data.desiredGender;
        profile.addScores(data.scores);

        //Send Match
        res.send(profile.getMatch());
        userExist = true;
        return;
      }
    });
    if (!userExist) {
      res.send(false);
      return;
    }

    res.json();
  });
};
