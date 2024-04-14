const alphabet = "abcdefghijklmnopqrstuvwxyz";
const keyboard = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".hangman-box img");
let currentWord;
let wrongGuessCount = 0;
let correctLetters = [];
const maxGuesses = 6;
const gameModal = document.querySelector(".game-modal");
const playAgain = document.querySelector(".play-again");

const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");

  gameModal.classList.remove("show");
  hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
};

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  document.querySelector(".hint-text b").innerText = hint;
  currentWord = word;
  console.log(word);
  resetGame();
};

getRandomWord();

const gameOver = (state) => {
  setTimeout(() => {
    const modalText = state ? "You found The word:" : `The correct word was:`;
    gameModal.querySelector("img").src = `images/${
      state ? "victory" : "lost"
    }.gif`;
    gameModal.querySelector("h4").innerHTML = `${
      state ? "Congratulations" : "Game Over"
    }`;
    gameModal.querySelector(
      "p"
    ).innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
  }, 300);
};

const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        const liElements = wordDisplay.querySelectorAll("li");
        if (liElements.length > index) {
          // Check if enough list items exist
          liElements[index].innerText = letter;
          liElements[index].classList.add("guessed");
        }
      }
    });
  } else {
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }

  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

// creating keyboard buttons
alphabet.split("").forEach((letter) => {
  const btn = document.createElement("button");
  const btnTxt = document.createTextNode(letter);
  btn.appendChild(btnTxt);
  keyboard.appendChild(btn);

  btn.addEventListener("click", (e) => initGame(e.target, letter));
});

playAgain.addEventListener("click", () => {
  getRandomWord();
  [...keyboard.children].forEach((btn) => (btn.disabled = false));
});

// Complete the logic & handle reset game btn
