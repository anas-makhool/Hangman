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

fetch("json.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // get random property
    let allKeys = Object.keys(data);

    let randomPropNumber = Math.floor(Math.random() * allKeys.length);
    let randomPropName = allKeys[randomPropNumber];
    let randomPropValue = data[randomPropName];

    let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
    let randomValueValue = randomPropValue[randomValueNumber];

    // set category info
    document.querySelector(".game-info .category span").innerHTML =
      randomPropName;

    // select letters guess element
    let lettersGuessContainer = document.querySelector(".letters-guess");

    // convert chosen world to array
    let letterAndSpace = Array.from(randomValueValue);

    console.log(randomPropName);
    console.log(randomValueValue.toLowerCase());

    // create spans depend on word
    letterAndSpace.forEach((ele, ind) => {
      let emptySpan = document.createElement("span");

      ele === " " ? (emptySpan.className = "has-space") : (emptySpan.id = ind);

      // append spans to letters guess container
      lettersGuessContainer.appendChild(emptySpan);
    });

    let guessSpans = document.querySelectorAll(".letters-guess span");
    let wrongAttempts = 0;
    let theDraw = document.querySelector(".hangman-draw");

    // Handle clicking letters
    document.addEventListener("click", (e) => {
      let theStatus = false;
      if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");

        let theClickedLetter = e.target.innerHTML.toLowerCase();
        let theChosenWord = Array.from(randomValueValue.toLowerCase());

        theChosenWord.forEach((ele, ind) => {
          if (theClickedLetter === ele) {
            theStatus = true;
            guessSpans.forEach((span, spanIndex) => {
              if (ind === spanIndex) {
                span.innerHTML = ele;
              }
            });
          }
        });

        if (!theStatus) {
          new Audio("/sounds/lost round.wav").play();
          wrongAttempts++;
          theDraw.classList.add(`wrong-${wrongAttempts}`);
          if (theDraw.classList.contains("wrong-8")) {
            lettersContainer.style.pointerEvents = "none";
            new Audio("/sounds/loss all game.wav").play();
            showPopup(`Oops! You Loss :/ , The Word Is ${randomValueValue}`);
          } else {
            lettersContainer.style.pointerEvents = "auto";
          }
        } else {
          new Audio("/sounds/win round.wav").play();
        }

        if (
          [...lettersGuessContainer.children]
            .map((ele) => ele.innerHTML)
            .join("")
            .replaceAll(" ", "") ===
          randomValueValue.toLowerCase().replaceAll(" ", "")
        ) {
          new Audio("/sounds/victory.wav").play();
          if (wrongAttempts >= 5 && wrongAttempts < 8) {
            showPopup(
              `Good Game, The Word Is "${randomValueValue}", after ${wrongAttempts} Attempts`
            );
          } else if (wrongAttempts > 0 && wrongAttempts < 5) {
            showPopup(
              `Perfect, The Word Is "${randomValueValue}", after ${wrongAttempts} Attempts`
            );
          } else if (wrongAttempts === 0) {
            showPopup(`Congratulations, The Word Is "${randomValueValue}"`);
          }
        }
      }

      function showPopup(message) {
        let popup = document.getElementById("popup");
        let popupMessage = popup.querySelector(".popup-message");

        popupMessage.textContent = message;
        popup.style.display = "block";
        setTimeout(() => {
          popup.style.display = "none";
        }, 3000);
      }
    });
  })
  .catch((error) => console.error("Error fetching data:", error));
