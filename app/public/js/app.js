var server = http.createServer(function (request, response) {
    router.css(request, response);
    router.home(request, response);
    router.user(request, response);
  });
  server.listen(3000);

$("#submitButton").on("click", function (event) {
    console.log("click");
    event.preventDefault();
    answers = []

    for (var i = 1; i < 11; i++) {
        var id = "optionSelect" + i
        var score = $(id).val()

        //Push to an array
        answers.push(parseInt(score));
    }

    console.log(answers);

    // Sends info to the server

    $.ajax({
        method: "POST",
        url: "/api/friends",
        data: { name: $("#name").val().trim(), photo: $("#photo").val().trim(), scores: scores }
    }).then(function (response) {
        displayFriend(response)
    })
});