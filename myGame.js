var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
  if(!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatedPress(userChosenColor);
  checkAnswer(userPattern.length - 1);
});

function checkAnswer(indexOfColor) {
  if(userPattern[indexOfColor] === gamePattern[indexOfColor]) {
    if(userPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("#level-title").text("Game Over, Press Any Key to Restart");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  gamePattern = [];
  started = false;
  level = 0;
}

function nextSequence() {
  userPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);

  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

function playSound(soundName) {
  var audio = new Audio("sounds/" + soundName + ".mp3");
  audio.play();
}

function animatedPress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}
