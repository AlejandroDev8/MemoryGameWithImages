//Variable Initialization
let uncoveredCards = 0;
let cardOne = null;
let cardTwo = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let success = 0;
let timer = false;
let time = 60;
let initialTime = 60;
let countdownTime = null;
//Pointing To HTML Document
let showMovements = document.getElementById("movements");
let showSuccess = document.getElementById("success");
let showTime = document.getElementById("time");
//Random Number Generation
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
numbers = numbers.sort(() => {
  return Math.random() - 0.5;
});
//Functions
function countTime() {
  countdownTime = setInterval(() => {
    time--;
    showTime.innerHTML = `Time: ${time} seconds`;
    if (time == 0) {
      clearInterval(countdownTime);
      blockCards();
      loseAudio.play();
    }
  }, 1000);
}
function blockCards() {
  for (let i = 0; i <= 19; i++) {
    let lockedCard = document.getElementById(i);
    lockedCard.innerHTML = `<img src="./images/${numbers[i]}.png" alt="pokemon">`;
    lockedCard.disabled = true;
  }
}
//Main Function
function uncover(id) {
  if (timer == false) {
    countTime();
    timer = true;
  }

  uncoveredCards++;
  if (uncoveredCards == 1) {
    //Show First Number
    cardOne = document.getElementById(id);
    firstResult = numbers[id];
    cardOne.innerHTML = `<img src="./images/${firstResult}.png" alt="pokemon">`;
    //Disable First Number
    cardOne.disabled = true;
  } else if (uncoveredCards == 2) {
    //Show Second Number
    cardTwo = document.getElementById(id);
    secondResult = numbers[id];
    cardTwo.innerHTML = `<img src="./images/${secondResult}.png" alt="pokemon">`;
    //Disable Second Number
    cardTwo.disabled = true;
    //Increased Movements
    movements++;
    showMovements.innerHTML = `Movements: ${movements}`; //Backtick "``" ASCII => ALT + 96
    if (firstResult == secondResult) {
      uncoveredCards = 0;
      //Increase Successes
      success++;
      showSuccess.innerHTML = `Success: ${success}`;
      if (success == 10) {
        clearInterval(countdownTime);
        showSuccess.innerHTML = `Success: ${success} 👍`;
        showTime.innerHTML = `Congratulations, your time was: ${
          initialTime - time
        } seconds 🤘`;
        showMovements.innerHTML = `Movements: ${movements} 😎`;
      }
    } else {
      //Temporarily Show Values and Recover
      setTimeout(() => {
        cardOne.innerHTML = " ";
        cardTwo.innerHTML = " ";
        cardOne.disabled = false;
        cardTwo.disabled = false;
        uncoveredCards = 0;
      }, 720);
    }
  }
}
