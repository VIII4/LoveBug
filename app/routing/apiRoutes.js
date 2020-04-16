//Load Data
var users = require("../data/users");

//Reference data points and functions
var UserProfile = users.UserProfile;
var addUser = users.addUser;
var userProfiles = users.userProfiles;

//Export Routes to express server
module.exports = function (app) {
  ////GET ROUTES
  //============

  //Retrieve all profiles
  app.get("/api/profiles", function (req, res) {
    res.send(userProfiles);
  });

  //Retrieve specific profile
  app.get("/api/profile/:userID", function (req, res) {
    var _profile;
    userProfiles.forEach((profile) => {
      if (profile.uniqueID === req.param.userID) {
        _profile = profile;
        return;
      }
    });
    res.send(_profile);
  });

  //Retrieve match for user
  app.get("/api/friends/:user", function (req, res) {
    res.send(userProfiles);
  });

  ////POST ROUTES
  app.post("/api/CreateProfile", function (req, res) {
    data = req.body;
    var valid = addUser(
      new UserProfile(data.name, data.uniqueID, data.profilePic, data.scores)
    );
    res.json(valid);
  });
};

//Add user function
// users.addUser(
//   new UserProfile("name", "uniqueID", "wwww.profilepic.com", [1, 1, 1, 1, 1])
// );
