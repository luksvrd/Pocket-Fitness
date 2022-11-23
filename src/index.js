$("#userYes").on("click", function (event) {
  $("header div").show();
});
$("#userNo").on("click", function (event) {
  $("header div").show();
});
$("#userNameEnter").on("click", function (event) {
  userName = $("#userName").val();
  localStorage.setItem("userName", userName);
  console.log(userName);
  console.log(localStorage.getItem("userName"));
  $("main").show();
  $("header").hide();
});

// code block for api parameters entry screen/creates workout
$("#searchme").on("click", function (event) {
  time = $("#time").val();
  NumberExercises = $("#NumberExercises").val();
  console.log(time);
  console.log(NumberExercises);
  $("#startbutton").show();
  $("main").hide();
  timeForEach(time, NumberExercises);
  callmusclefunction(type, difficulty);
});
$("#cardioBtn").on("click", function (event) {
  type = "cardio";
  console.log(type);
});
$("#plyoBtn").on("click", function (event) {
  type = "plyometrics";
  console.log(type);
});
$("#strengthBtn").on("click", function (event) {
  type = "strength";
  console.log(type);
});
$("#strongmanBtn").on("click", function (event) {
  type = "strongman";
  console.log(type);
});
$("#beginnerBtn").on("click", function (event) {
  difficulty = "beginner";
  console.log(difficulty);
});
$("#intermediateBtn").on("click", function (event) {
  difficulty = "intermediate";
  console.log(difficulty);
});
$("#expertBtn").on("click", function (event) {
  difficulty = "expert";
  console.log(difficulty);
});

// function to call API
function callmusclefunction(type, difficulty) {
  console.log("hello");
  $.ajax({
    method: "GET",
    url:
      "https://api.api-ninjas.com/v1/exercises?&type=" +
      type +
      "&difficulty=" +
      difficulty,
    headers: { "X-Api-Key": "hGDZGE3QielW48T7N24bRA==MA0EIQae1HS6OK7L" },
    contentType: "application/json",
    success: function (result) {
      if (result.length > NumberExercises) {
        for (i = 0; i < NumberExercises; i++) {
          let x =
            Math.floor(date * Math.random() * (i + date * 1000000)) %
            result.length;
          let resultsObject = {
            name: result[x].name,
            instructions: result[x].instructions,
          };
          resultsArray.push(resultsObject);
        }
        resultsArray.forEach(function (element) {
          let elInstructions =
            "<p id='hiddenIns'>" + element.instructions + "</p>";
          $("ul").append("<li>" + element.name + "<li>" + elInstructions);
          $("li p").hide();
          $("li").on("click", function (event) {
            $("li p").toggle();
          });
        });
      }
    },
    error: function ajaxError(jqXHR) {
      console.error("Error: ", jqXHR.responseText);
    },
  });
}
// Function to divide time
function timeForEach(time, NumberExercises) {
  timePerExercise = (time / NumberExercises) * 60;
  console.log(timePerExercise);
}
