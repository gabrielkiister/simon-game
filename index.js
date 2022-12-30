//pre game variables
let simonSequence = [];
let playerSequence = [];
const h1 = $("h1");
let level = 0;
let gameIsOn = false;
$(document).keydown(startGame) //start game on keypress


//plays animations and sounds
function playButtonEffects(button) {
  // animation
  const clickedButton = $("." + button);
  clickedButton.addClass("pressed");
  setTimeout(() => {
    clickedButton.removeClass("pressed");
  }, 100);

  //sound
  const sound = new Audio("sounds/" + button + ".mp3");
  sound.play();
}

//starts next level and randomly selects the new button
function addSimon(array) {
  level++;
  h1.text('Level '+ level);
  playerSequence = [];

  const rng = Math.floor(Math.random() * 3) + 1;
  playerSequence = [];
  switch (rng) {
    case 0:
      array.push("green");
      break;

    case 1:
      array.push("red");
      break;

    case 2:
      array.push("yellow");
      break;

    case 3:
      array.push("blue");
      break;
  }
}

//plays the last button in the sequence the player has to mimic
function playCorrectSequence(sequence) {
    setTimeout(function () {
      playButtonEffects(sequence[sequence.length - 1]);
    }, 1000);
}

//checks the player input with the games correct input
function checkAnswer(currentLevel) {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== simonSequence[i]) {
          // break out of the check when player input is wrong
          gameOver();
          return;
        }
      }
    
      //checks if the last button of the sequence was the right one
    if (simonSequence[currentLevel] === playerSequence[currentLevel]) {

        //when all input is correct starts next level
      if (playerSequence.length === simonSequence.length){
          addSimon(simonSequence);
          playCorrectSequence(simonSequence);
      }
    } else {gameOver();}
}

//main game function
function startGame() {
  if (!gameIsOn) {
    gameIsOn = true;
    h1.text('Level '+ level);
    addSimon(simonSequence);
    playCorrectSequence(simonSequence);

    //allows player to click the buttons
    $(".btn").click(function (event) {
        const button = event.target.classList[1]; //"green" "red" "yellow"  "blue"
        playerSequence.push(button);
        playButtonEffects(button);
        checkAnswer(level);
            
      });
    } else {return;}
 }

//handles all the variables and animations when game is over
function gameOver() {
  $(".btn").off()   //turn off event listeners
  //reset game variables
  h1.text('Press Any Key to Start');
  gameIsOn = false;
  level = 0;
  playerSequence = [];
  simonSequence = [];

  //plays audio and animation
  $("body").addClass("game-over")
  setTimeout(function () {
    $("body").removeClass("game-over")
  }, 250)
  const gameOverAudio = new Audio("sounds/wrong.mp3");
  gameOverAudio.volume = 0.2;
  gameOverAudio.play();
}