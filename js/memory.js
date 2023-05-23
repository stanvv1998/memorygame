// description: this is the javascript for the memory game
class Card {
	constructor(cardObject){
		this.card1 = cardObject.card1;
		this.card2 = cardObject.card2;
		this.set = cardObject.set;
		// this.sound = cardObject.sound;
	}
}

fetch("cards.json")
	.then(response => response.json())
	.then(data => {
		myCardArray = data.map(card => new Card(card));
		console.log(myCardArray);
		// Call the function to populate the field after retrieving the cards
		onSelectFieldSize();
	});

// description: this is the array of all the cards
let myCardArray = [];

let myCardSet = [];
let boardClass = "";

const myField = document.getElementById("field");
myField.addEventListener("click", onClickCard);

const fieldSize = document.getElementById("fieldSize");
fieldSize.addEventListener("change", onSelectFieldSize);

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

function getSubset(array, size) {
	// Shuffle the array first
	shuffleArray(array);

	// Get a subset of the array
	const subset = array.slice(0, size / 2);

	// Double the subset and shuffle again
	const doubledSubset = subset.concat(subset);
	shuffleArray(doubledSubset);

	// Convert the array to an array of Card objects
	const cardSetArray = doubledSubset.map(card => new Card(card));
	return cardSetArray;
}

// description: this function populates the field with cards
function populateField() {
	myField.innerHTML = "";
	myCardSet.forEach(card => {
		let newTile = document.createElement("div");
		let newCard = document.createElement("img");
		let cover = document.createElement("img");
		newTile.setAttribute("class", boardClass);
		let imageURL = "assets/img/" + card.card1 + ".jpg";
		newCard.setAttribute("src", imageURL);
		cover.setAttribute("src", "assets/img/cover.png");
		cover.setAttribute("class", "covered");
		newCard.setAttribute("name", card.card1);
		newTile.appendChild(newCard);
		newTile.appendChild(cover);
		myField.appendChild(newTile);
	});
}

// description: this function is called when a card is clicked
function onClickCard(e) {
	if (e.target.className === "covered"){
		e.target.className = "uncovered";
		console.log(e.target.parentNode.firstChild.getAttribute("name"));
	}
}

// description: this function is called when the field size is changed
function onSelectFieldSize(){
	switch(fieldSize.value) {
		case "4":
			boardClass = "board4";
			myCardSet = getSubset(myCardArray, 16);
			break;

		case "5":
			boardClass = "board5";
			myCardSet = getSubset(myCardArray, 25);
			break;

		case "6":
			boardClass = "board6";
			myCardSet = getSubset(myCardArray, 36);
			break;

		default:
			console.log("default");
	}

	populateField();
}

window.onload = onSelectFieldSize;