document.addEventListener("DOMContentLoaded", () => {
const gridContainer = document.querySelector('.grid-container');
const restartButton = document.getElementById('restart');
const scoreDisplay = document.querySelector('.score');

let cards = [];
let flippedCards = [];
let matchedCards = [];
let score = 0;
let gameInProgress = true;

const cardValues = ['JS','CSS','HTML','Jquery', 'CS1080'];
const cardsArray = [...cardValues, ...cardValues];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
function updateScore(){
    scoreDisplay.textContent = score;
}
function createBoard(){
    shuffle(cardsArray);
    gridContainer.textContent = '';
    cards = [];
}
cardsArray.forEach((value, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', index);
    card.dataset.value = value;
    card.addEventListener('click', flipCard);

    gridContainer.appendChild(card);
    cards.push(card);
});
    }
function flipCard(){
    if(gameInProgress && flippedCards.length < 2){
        const clickedCard = this;
        if (flippedCards.includes(clickedCard)||clickedCard.classList.contains('flipped')
            return;
    }
    clickedCard.textContent = clickedCard.dataset.value;
    clickedCard.classList.add('flipped');
    flippedCards.push(clickedCard);

        if (flippedCards.length === 2){
            checkForMatch();
        }
    }
}
function checkForMatch(){
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);    
        flippedCards = [];

    if(matchedCards.length ===cardsArray.length){
        gameInProgress = false;
        alert("Congratulations, you won!");
    }
 }  else {
    setTimeout(() => {
        card1.textContent = ''; // Clear the text content
        card2.textContent = '';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flippedCards = [];
      }, 1000);
    }
 }
 restartButton.addEventListener('click', () => {
    gameInProgress = true;
    score = 0;
    matchedCards = [];
    flippedCards = [];
    updateScore(); 
    createBoard();
  });

  createBoard();
});