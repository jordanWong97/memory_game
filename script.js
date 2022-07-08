"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple", "yellow",
  "red", "blue", "green", "orange", "purple", "yellow"
];

const colors = shuffle(COLORS);

let attempts = document.getElementById('attempts');
let remains = document.getElementById('remains');

let attempt = 0;
let remain = COLORS.length/2;
let chosen = [];

const colorPics = {
  red: 'https://images.unsplash.com/photo-1439127989242-c3749a012eac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fHJlZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  blue: 'https://images.unsplash.com/photo-1575244120259-ba9a7faadefe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGJsdWViZXJyaWVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  green: 'https://images.unsplash.com/photo-1578855691621-8a08ea00d1fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGltZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  orange: 'https://images.unsplash.com/photo-1591206369811-4eeb2f03bc95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fG9yYW5nZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  purple: 'https://images.unsplash.com/photo-1631299106224-aae61c217164?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHB1cnBsZSUyMGZydWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  yellow: 'https://images.unsplash.com/photo-1590502593747-42a996133562?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGVtb258ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60'
};

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    let card = document.createElement('img');
    card.setAttribute('src', 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWVtZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60');  //image source
    card.setAttribute('id', color);
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
    remains.innerHTML = remain;
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
  if(this.getAttribute('src') === 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWVtZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60'){
    chosen.push(card);
    this.setAttribute('src', colorPics[card.srcElement.id]);
    if(chosen.length === 2){
      document.body.classList.add('limit');
      setTimeout(handleCardClick,700);
    }
  }
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
  //reset to card back
  card[0].srcElement.setAttribute('src', 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWVtZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60');
  card[1].srcElement.setAttribute('src', 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWVtZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60');
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // ... you need to write this ...
  // if flip 2 cards, increment attempts and either decrement remaining or unflip cards
  attempt++;
  attempts.innerHTML = attempt;
  let cards = document.querySelectorAll('img')
  if(chosen.length === 2){
    let first = chosen[0].srcElement.src;
    let second = chosen[1].srcElement.src;
    if(first === second){
      chosen = [];
      remain = remain -= 1;
      remains.innerHTML = remain;
      document.body.classList.remove('limit');
    } else{
      unFlipCard(chosen);
      chosen = [];
      document.body.classList.remove('limit')
    }
  }
  //reset
}