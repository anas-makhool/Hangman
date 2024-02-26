//Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// get array form letters
let lettersArray = letters.split("");

//select letters container
let lettersContainer = document.querySelector(".letters");

//generate Letters
lettersArray.forEach((letter) => {
  // create span
  let span = document.createElement("span");

  //create letter text node
  let theLetter = document.createTextNode(letter);

  // append the letter to span
  span.appendChild(theLetter);

  // add class to span
  span.className = "letter-box";

  // append span to the letter container
  lettersContainer.appendChild(span);
});

// object of words + categories

const words = {
  programming: [
    "JavaScript",
    "Python",
    "Java",
    "SQL",
    "Ruby",
    "Swift",
    "Go",
    "Rust",
  ],
  movies: [
    "prestige",
    "inception",
    "parasite",
    "interstellar",
    "whiplash",
    "memento",
    "coco",
    "up",
  ],
  people: [
    "Nelson Mandela",
    "Mother Teresa",
    "Mahatma Gandhi",
    "Martin Luther King Jr",
    "Albert Einstein",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// get random property
let allKeys = Object.keys(words);

let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

// set category info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// select letters guess element
let lettersGuessContainer = document.querySelector(".letters-guess");

// convert chosen world to array
let letterAndSpace = Array.from(randomValueValue);

console.log(randomValueValue.toLowerCase());
console.log(randomPropName);

// create spans depend on word
letterAndSpace.forEach((ele, ind) => {
  let emptySpan = document.createElement("span");

  ele === " " ? (emptySpan.className = "has-space") : (emptySpan.id = ind);

  // append spans to letters guess container
  lettersGuessContainer.appendChild(emptySpan);
});

let lettersContainerArray = Array.from(lettersContainer.children);
let lettersGuessContainerArray = Array.from(lettersGuessContainer.children);
let index = 0;

const logic = (letter) => {
  if (
    lettersGuessContainerArray[index].classList.contains("has-space") &&
    index < lettersGuessContainerArray.length - 1
  ) {
    index++;
  }

  lettersGuessContainerArray[index].innerText = letter;

  index++;

  if (index === randomValueValue.length) {
    lettersContainer.style.pointerEvents = "none";
    let compare = lettersGuessContainerArray
      .map((ele) => ele.innerText)
      .join("")
      .toLowerCase();

    let wow = randomValueValue.toLowerCase().replaceAll(" ", "");

    // comparison
    console.log(wow);
    console.log(compare);
    document.querySelector(".wow").innerHTML =
      wow === compare ? "You Win" : "You Lose";
  }
};

// Add event listeners for mouse clicks
for (let i = 0; i < lettersContainerArray.length; i++) {
  let ele = lettersContainerArray[i];
  ele.addEventListener("click", () => logic(ele.innerHTML));
}

// Add event listener for keyboard input
document.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.ctrlKey) {
    if (event.key === "r" || event.key === "R") {
      return;
    }
    event.preventDefault();
    return;
  }

  if (/[\u0600-\u06FF]/.test(event.key)) {
    alert("wow");
  } else if (
    /^[a-zA-Z]$/.test(event.key) &&
    index !== randomValueValue.length
  ) {
    let letter = event.key.toLowerCase();
    logic(letter);
  } else if (
    event.key === "Backspace" &&
    index >= 1 &&
    index !== randomValueValue.length
  ) {
    index--;
    lettersGuessContainerArray[index].innerText = "";
  } else {
    event.preventDefault();
  }
});
