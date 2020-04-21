//// Global Vars
var userProfiles = [];

//// Constructor Objects

var UserProfile = function (uniqueID, imageUrl) {
  //Profile initial Properties
  this.firstName = "";
  this.lastName = "";
  this.gender = "";
  this.desiredGender = "";
  this.email = "";
  this.password = "";
  this.uniqueID = uniqueID.trim().toLowerCase().replace(/\s+/g, "");
  this.profilePic = imageUrl;
  this.scores = [];

  //optioinal Properties
  this.amtMatched = 0;
  this.amtFollowers = 0;

  this.friendMatch;

  //Methods
  this.getMatch = function () {
    var _suggestedMatch;
    var _lowScore = 10000000;

    userProfiles.forEach((profile) => {
      if (profile.uniqueID === this.uniqueID) {
        return;
      }
      //
      else if (profile.gender === this.desiredGender) {
        var resultsComparison = profile.scores;
        var userResults = this.scores;
        var matchScore = 0;

        for (var i = 0; i < userResults.length; i++) {
          matchScore =
            matchScore + Math.abs(userResults[i] - resultsComparison[i]);
        }
        if (matchScore < _lowScore) {
          _suggestedMatch = profile;
          _lowScore = matchScore;
        }
      }
    });

    friendMatch = _suggestedMatch;
    _suggestedMatch.amtMatched++;
    return _suggestedMatch;
  };

  this.addNames = function (_first, _last) {
    this.firstName = _first.trim().toLowerCase().replace(/\s+/g, "");
    this.lastName = _last.trim().toLowerCase().replace(/\s+/g, "");
  };

  this.addScores = function (_scores) {
    var temp = [];
    _scores.forEach((value) => {
      temp.push(parseInt(value));
    });
    this.scores = temp;
  };
};

//// Functions

function addUser(_profile) {
  //check if profile exist return false if user cant be added, return true if can
  var allowed = true;
  userProfiles.forEach((element) => {
    if (element.uniqueID === _profile.uniqueID) {
      //User ID exist
      allowed = false;
    }
  });
  if (allowed) {
    userProfiles.push(_profile);
    //Print User Profiles
    console.log("Profile Added");
    console.log(userProfiles);
    return true;
  } else {
    console.log("User Exist");
    console.log(userProfiles);
    return false;
  }
}

//create an array of 10 random numbers between 1-5
function getRandomScores() {
  var _scores = [];
  for (var i = 0; i < 10; i++) {
    _scores.push(Math.floor(Math.random() * (6 - 1) + 1));
  }
  return _scores;
}

//Starter Profiles
userProfiles.push(
  new UserProfile(
    "DaDude",
    "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
  ),
  new UserProfile(
    "LadyWorcisterSauce",
    "https://images.pexels.com/photos/1068207/pexels-photo-1068207.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
  ),
  new UserProfile(
    "LikeaDove",
    "https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
  ),
  new UserProfile(
    "cuts",
    "https://images.pexels.com/photos/2769172/pexels-photo-2769172.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
  )
);

userProfiles.forEach((profile) => {
  profile.scores = getRandomScores();
});
userProfiles[0].gender = "male";
userProfiles[1].gender = "female";
userProfiles[2].gender = "female";
userProfiles[3].gender = "male";

// Exports
module.exports = {
  userProfiles: userProfiles,
  UserProfile: UserProfile,
  addUser: addUser,
};

//Debug
//console.log(userProfiles);
//console.log(userProfiles[1].getMatch());
getRandomScores();
