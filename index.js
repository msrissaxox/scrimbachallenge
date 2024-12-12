/*
You are going to build an app that challenges players to identify a Christmas Movie from some emoji 🍿 🎅 🎬. The players will have 3 guesses per movie.

For example, the emoji 🌇 💣 👮 ✈️ ️🔫  represent the film “Die Hard”, which everyone knows is the best Christmas movie of all time.

In data.js you have an array of Christmas movies with emoji and text for aria labels.

Your task is to build an app that meets these criteria:

- The app should present the player with a set of emoji selected at random from the array in data.js. 

- The player will input their guess.

- If the player guesses correctly, the app should display a message saying "Correct!". Then, after a pause of 3 seconds, it should randomly select the next set of emoji clues and display them to the player.

- If the player’s guess is incorrect, the app should display a message saying “Incorrect! You have 2 more guesses remaining.”

- If the player fails to guess correctly on the next two attempts, the app should display a message saying, `The film was <Film Name Here>!`. After a pause of 3 seconds, it should randomly select a new set of emoji clues and display them to the player.

- When all films in the array have been used, the player should see a message saying "That's all folks!".

- Each film should only be used once. There should be no repetition. 

Stretch Goals

- Use AI to decide if an answer is correct or incorrect. For example if the correct answer is "The Polar Express" but the player inputs "Polar Express" a straight comparison of the two strings will find that the player's answer was incorrect. AI could assess if there is sufficient similarity between the strings to judge it as correct. 

- Improve the UX by disabling the form/button when the game is over and during the pause between questions.
*/

//I want this code to do the same thing as when it starts at 3 and counts down.
//it's almost doing it.  the loadNewGame function does everything except: allow button to be pressed???
//change first letter of each work to upper case, makae rest lower case
import { films } from "/data.js";

// Some useful elements
const inputGuess = document.getElementById("guess-input");
const messageContainer =
  document.getElementsByClassName("message-container")[0];
const emojiCluesContainer = document.getElementsByClassName(
  "emoji-clues-container"
)[0];
const form = document.getElementById("guess-input");
const filmLength = films.length;

console.log(inputGuess.innerText);
//using Fisher Yates Shuffle algorithm

function shuffle(films) {
  for (let i = films.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [films[i], films[j]] = [films[j], films[i]];
  }
  return films;
}

// Shuffle the array
const shuffledArray = shuffle(films);
//do one at a time
let guesses = 0;
function addOne(guesses) {
  return guesses + 1;
}

//create a 3 second timer and reload the page
const loadNextClue = () => {
  setTimeout(() => {
    shuffledArray[addOne(guesses)];
    emojiCluesContainer.innerHTML =
      shuffledArray[addOne(guesses)].emoji.join("");
    remainingGuesses = 3;
    messageContainer.textContent = `You have ${remainingGuesses} guesses remaining!`;

    //shuffle again after 3 seconds and display these in the console
    shuffle(films);

    console.log(shuffledArray[addOne(guesses)].emoji);
    console.log(shuffledArray[addOne(guesses)].title);
    emojiCluesContainer.innerHTML =
      shuffledArray[addOne(guesses)].emoji.join("");

    console.log("new items were loaded");
    //change emojis on screen
    console.log("3 SECOND TIMER");
  }, 3000);
};

//function to return the emojis

window.onload = function () {
  console.log(shuffledArray[addOne(guesses)].emoji);

  emojiCluesContainer.innerHTML = shuffledArray[addOne(guesses)].emoji.join("");

  console.log("page was loaded");
};

console.log(shuffledArray[addOne(guesses)]);

//this is the emoji of the film
// console.log(films[0].emoji);

let remainingGuesses = 3;

function submitBtn(event) {
  event.preventDefault();
  // Prevent the form from submitting and reloading the page
  //subtracts the remaining guesses
  remainingGuesses--;

  console.log(inputGuess.value);

  if (shuffledArray[addOne(guesses)].title === inputGuess.value) {
    messageContainer.textContent = `You have guessed correctly!!`;
    inputGuess.value = "";

    //enter 3 sec timer here?
    loadNextClue();

    return false; //prevents page refresh
  } else {
    messageContainer.textContent = `You have ${remainingGuesses} guesses remaining!`;
  }

  //handles if the guesses are less than 0
  if (remainingGuesses <= 0) {
    messageContainer.textContent =
      "The film was " + shuffledArray[addOne(guesses)].title;
    inputGuess.value = "";

    loadNextClue();
    document.getElementById("submit").disabled = false; // Disable the button
  }
}

//add event listener to the form
guess.addEventListener("submit", submitBtn);

//to get title
console.log(shuffledArray[addOne(guesses)].title);

console.log(`${inputGuess.value}`);
