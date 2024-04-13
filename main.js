const keyboard = document.querySelector(".keyboard");
const alphabet = "abcdefghijklmnopqrstuvwxyz";

// creating buttons
alphabet.split("").forEach((letter) => {
  const btn = document.createElement("button");
  const btnTxt = document.createTextNode(letter);
  btn.appendChild(btnTxt);
  keyboard.appendChild(btn);
});
