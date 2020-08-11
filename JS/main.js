/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const masterDeck = buildMasterDeck();

/*----- app's state (variables) -----*/
let shuffledDeck;
let playerHand;
let dealerHand;

/*----- cached element references -----*/

/*----- event listeners -----*/

/*----- functions -----*/
function buildMasterDeck() {
  const deck = [];
  suits.forEach(function (suit) {
    ranks.forEach(function (rank) {
      deck.push({
        face: `${suit}${rank}`,
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}

function renderShuffledDeck() {
  const tempDeck = [...masterDeck];
  shuffledDeck = [];
  while (tempDeck.length) {
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return shuffledDeck;
}

// renderShuffledDeck();

function dealPlayerCards() {
  playerHand = shuffledDeck.splice(-2, 2);
  return playerHand;
}

function dealDealerCards() {
  dealerHand = shuffledDeck.splice(-2, 2);
  return dealerHand;
}

function gameStart() {
  renderShuffledDeck();
  dealPlayerCards();
  dealDealerCards();
  return;
}

function playerHit() {
  let newPlayerHand = playerHand.concat(shuffledDeck.splice(-1, 1));
  playerHand = newPlayerHand;
  return playerHand;
}

function dealerHit() {
  let newDealerHand = dealerHand.concat(shuffledDeck.splice(-1, 1));
  dealerHand = newDealerHand;
  return dealerHand;
}

//stand ends player turn, starts dealer turn