const alphabet = "abcdefghijklmnopqrstuvwxyz";
const keyboard = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".hangman-box img");
let correctLetters = []
let currentWord,wrongGuessCount = 0;
const maxGuesses = 6;
const gameModal = document.querySelector(".game-modal");

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  document.querySelector(".hint-text b").innerText = hint;
  currentWord = word;

  console.log(word)
  wordDisplay.innerHTML = word
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
};

getRandomWord();


const gameOver = (state)=>{
setTimeout(() => {
  gameModal.classList.add("show")
}, 300);
}

const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter){
        correctLetters.push(letter)
        wordDisplay.querySelectorAll("li")[index].innerHTML = letter
        wordDisplay.querySelectorAll("li")[index].classList.add('guessed')
      }
    });
  }else{
    wrongGuessCount++
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }

  button.disabled = true
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`

  if(wrongGuessCount === maxGuesses) return gameOver(false) 
  if(correctLetters.length === currentWord.length) return gameOver(true) 
};

// creating keyboard buttons
alphabet.split("").forEach((letter) => {
  const btn = document.createElement("button");
  const btnTxt = document.createTextNode(letter);
  btn.appendChild(btnTxt);
  keyboard.appendChild(btn);

  btn.addEventListener("click", (e) => initGame(e.target, letter));
});
