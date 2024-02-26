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
let theChosenWord = Array.from(randomValueValue.toLowerCase());

// create spans depend on word
theChosenWord.forEach((ele, ind) => {
  let emptySpan = document.createElement("span");

  ele === " " ? (emptySpan.className = "has-space") : (emptySpan.id = ind);

  // append spans to letters guess container
  lettersGuessContainer.appendChild(emptySpan);
});

// Handle clicking letters
document.addEventListener("click", (e) => {
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    let theClickedLetter = e.target.innerHTML.toLowerCase();

    letterAndSpace.forEach((ele, ind) => {
      if (theClickedLetter === ele) {
        console.log(`found at index number ${ind}`);
        [...lettersGuessContainer.children][ind].innerHTML = ele
      }
    });
  }
});
