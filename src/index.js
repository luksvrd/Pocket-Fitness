// declarations;
let time;
let NumberExercises;
let type;
let difficulty;
let resultsArray = [];
let date = Date.now() % 1000;
let timePerExercise;
let exerciseCounter = 0;
let resetTime = localStorage.getItem("resetTime");
let repCounter;
$("#startbutton").hide();
$("main").hide();
// $("header div").hide();
$("article").hide();
$("aside").hide();
// code block for entry page
// $("#userYes").on("click", function (event) {
//   $("header div").show();
// });
// $("#userNo").on("click", function (event) {
//   $("header div").show();
// });
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
// code block that runs the workout
$("#startbutton").on("click", function (event) {
  console.log(resultsArray);
  console.log(timePerExercise);
  $("ul").hide();
  $("#startbutton").hide();
  $("article").show();
  countdown(timePerExercise);
  displayFunction();
});
// code block to "Extend Workout"
$("#extendExercise").on("click", function (event) {
  $("#extendExercise").hide();
});
// code block to skip exercise
$("#exerciseSkip").on("click", function (event) {
  exerciseCounter++;
  countdown(timePerExercise);
});
// code block to tally reps
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
  timePerExercise = Math.floor(time / NumberExercises) * 60;
  localStorage.setItem("resetTime", timePerExercise);
  console.log(timePerExercise);
}
// function to run the timer and cycle the display function
function countdown(timeVariable) {
  const timerDown = setInterval(function () {
    timeVariable--;
    $("#timer").text(timeVariable);
    console.log(timeVariable);
    if (timeVariable <= 0) {
      exerciseCounter++;
      clearInterval(timerDown);
      countdown(resetTime);
    } else if (exerciseCounter == resultsArray.length) {
      clearInterval(timerDown);
    }
    displayFunction(exerciseCounter);
  }, 200);
}
// function to display the exercise
function displayFunction() {
  if (exerciseCounter == resultsArray.length) {
    $("article").hide();
    $("aside").show();
  }
  $("#Exercise").text(resultsArray[exerciseCounter].name);
  $("#exerciseInstructions").on("click", function (event) {
    $("#exerciseInstructions").text(resultsArray[exerciseCounter].instructions);
  });
}
// trial stuff with jquery UI
$(function () {
  $("#dialog").dialog({
    autoOpen: false,
    show: {
      effect: "blind",
      duration: 1000,
    },
    hide: {
      effect: "explode",
      duration: 1000,
    },
  });
  $("#opener").on("click", function () {
    $("#dialog").dialog("open");
  });
});
