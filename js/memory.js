"use strict";

class Card {
	constructor(card1, card2=card1, set=card1, sound=card1){
		this.card1 = card1;
		this.card2 = card2;
		this.set = set;
		this.sound = sound;
	}
}

const myField = document.getElementById("field");
myField.addEventListener("click", onClickCard);
const myCardArray = ["duck", "kitten", "piglet", "puppy", "calf", "veal", "lamb", "rooster", "horse", "mouse", "dog", "cat", "goose", "goat", "sheep", "pig", "cow", "chick", "hen"];
const myDblCardArray = myCardArray.concat(myCardArray);
const myCardSet = myDblCardArray.map((card) => new Card(card));
shuffleArray(myCardSet);

document.onload = populateField();

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function populateField() {
	myField.innerHTML = "";
	myCardSet.forEach(card => {
		let newTile = document.createElement("div");
		let newCard = document.createElement("img");
		newTile.setAttribute("class", "board6");
		let imageURL = "img/" + card.card1 + ".jpg";
		newCard.setAttribute("src", imageURL);
		newCard.setAttribute("name", card.card1);
		newTile.appendChild(newCard);
		myField.appendChild(newTile);
	});
}

function onClickCard(e) {
	console.log(e.target.getAttribute("name"));
}
