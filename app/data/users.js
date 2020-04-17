//// Global Vars
var userProfiles = [];

//// Constructor Objects

var UserProfile = function (name, uniqueID, imageUrl, surveyResults) {
  //Properties
  this.name = name.trim().toLowerCase().replace(/\s+/g, "");
  this.uniqueID = uniqueID.trim().toLowerCase().replace(/\s+/g, "");
  this.profilePic = imageUrl;
  this.surveyResults = surveyResults;
  this.friendMatch;
  this.getMatch = function () {
    var _suggestedMatch;
    var _lowScore;

    userProfiles.forEach((profile) => {
      var resultsComparison = profile.surveyResults;
      var userResults = this.surveyResults;
      var matchScore = 0;

      for (var i = 0; i < userResults.length; i++) {
        matchScore =
          matchScore + Math.abs(userResults[i] - resultsComparison[i]);
      }

      //ensure user is not the same as result
      if (profile.uniqueID != this.uniqueID) {
        if (matchScore < _lowScore) {
          _suggestedMatch = profile;
          _lowScore = matchScore;

          friendMatch = _suggestedMatch;
          return _suggestedMatch;
        }
      }
    });
  };
  //this.suggestedFriends = [];

  //Methods
  // this.getSuggestedFriends = function () {
  //   // store suggested results to return
  //   var _suggestedFriends = [];

  //   //Array with profile and score object
  //   var searchResults = [];

  //   //Compare function to sort array by score
  //   function compare(a, b) {
  //     var scoreA = a.score;
  //     var scoreB = b.score;

  //     let comparison = 0;
  //     if (scoreA > scoreB) {
  //       comparison = 1;
  //     } else if (scoreA < scoreB) {
  //       comparison = -1;
  //     }
  //     return comparison;
  //   }

  //   //Go through each object in profiles, pull survey results, subtract scores to get match score total,
  //   //store score and profile in results array. {profile: element, score: score}
  //   userProfiles.forEach((profile) => {
  //     var resultsComparison = profile.surveyResults;
  //     var userResults = this.surveyResults;
  //     var matchScore = 0;

  //     for (var i = 0; i < userResults.length; i++) {
  //       matchScore =
  //         matchScore + Math.abs(userResults[i] - resultsComparison[i]);
  //     }

  //     //check if unique id matchs, do not push
  //     if (profile.uniqueID != this.uniqueID) {
  //       searchResults.push({ profile: profile, score: matchScore });
  //     }
  //   });

  //   //sort search results in ascending order
  //   searchResults.sort(compare);

  //   //Push top three into suggested friends
  //   for (i = 0; i < 3; i++) {
  //     _suggestedFriends.push(searchResults[i].profile);
  //   }

  //   //Store results to profile
  //   this.suggestedFriends = _suggestedFriends;

  //   //Return suggested friends
  //   return _suggestedFriends;
  // };
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

//Starter Profiles
userProfiles.push(
  new UserProfile("iyan", "dwbucks", "www.mypic.com/pic", [1, 2, 4, 5, 1]),
  new UserProfile("johnny", "yup", "www.mypic.com/pic", [4, 3, 1, 4, 3]),
  new UserProfile("mike", "shemmy", "www.mypic.com/pic", [3, 3, 5, 2, 4]),
  new UserProfile("dre", "cuts", "www.mypic.com/pic", [5, 6, 2, 5, 1])
);

// Exports
module.exports = {
  userProfiles: userProfiles,
  UserProfile: UserProfile,
  addUser: addUser,
};

//Debug
//console.log(userProfiles);
//console.log(userProfiles[1].getSuggestedFriends());
