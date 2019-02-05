// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends

var friends = require("../data/friends");

// Routing

module.exports = function (app) {

    // API GET request
    // Below code handles when users "visit" a page.
    // In the below case when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the friends data)

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a survey... this data is then sent to the server...
    // Then the server saves the data to the friends array)

    app.post("/api/friends", function (req, res) {
        var bestMatch = {
            name: "",
            photo: "",
            difference: 100
        }
        var userResults = req.body
        var userScore = 0;
        for (let i = 0; i < userResults.scores.length; i++) {
            userScore += parseInt(userResults.scores[i]);
        }
        var bestMatchScore = 0;
        console.log("user results", userResults);
        
        // for loop that loops through the friends array
        // create a variable called currentFriend = friends[i]
        for (var i = 0; i < friends.length; i++) {
            var currentFriend = friends[i]
            console.log("current friend", currentFriend)
            // loop through currentFriend.scores.length
            // create another var called currentFriendScore
            var currentFriendScore = 0;
            for (var j = 0; j < currentFriend.scores.length; j++) {
                currentFriendScore += currentFriend.scores[j];
            }
            var diff = Math.abs(currentFriendScore - userScore);
            console.log("Userscore",userScore,"CurrentFriendScore",currentFriendScore);
            if (diff < bestMatch.difference) {
                bestMatch.name = currentFriend.name
                bestMatch.photo = currentFriend.photo
                bestMatch.difference = diff
            }
        }

        // push user results into friend array
        friends.push(userResults);
        console.log(friends);

        res.json(bestMatch);

    }); 
}   