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
    "Martin Luther King Jr.",
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

// create spans depend on word
letterAndSpace.forEach((ele, ind) => {
  let emptySpan = document.createElement("span");

  ele === " " ? (emptySpan.className = "has-space") : "";

  // append spans to letters guess container
  lettersGuessContainer.appendChild(emptySpan);
});
let lettersContainerArray = Array.from(lettersContainer.children);
let lettersGuessContainerArray = Array.from(lettersGuessContainer.children);
let index = 0;

for (let i = 0; i < lettersContainerArray.length; i++) {
  let ele = lettersContainerArray[i];
  
  const logic = () =>{
        console.log(ele.innerHTML);
        console.log(lettersGuessContainerArray[index]);
        if (
          !lettersGuessContainerArray[index].classList.contains("has-space")
        ) {
          lettersGuessContainerArray[index].innerText = ele.innerHTML;
        }

        index++;

        if (index === randomValueValue.length) {
          lettersContainer.style.pointerEvents = "none";
          let compare = lettersGuessContainerArray
            .map((ele) => ele.innerHTML)
            .join("");
          let wow = randomValueValue.toLowerCase();
          wow === compare
            ? (document.querySelector(".wow").innerHTML = "You Win")
            : (document.querySelector(".wow").innerHTML = "You Lose");
        }
  }
  
  ele.addEventListener("click",logic)
}
