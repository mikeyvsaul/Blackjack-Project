/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const masterDeck = buildMasterDeck();

/*----- app's state (variables) -----*/
let shuffledDeck;
let playerHand;
let dealerHand;

/*----- cached element references -----*/
const playerHandContainer = document.getElementById('player-card-container');
const dealerHandContainer = document.getElementById('dealer-card-container');
const playerValue = document.getElementById('player-value');
const dealerValue = document.getElementById('dealer-value');
const resetButton = document.getElementById('game-button');
const standButton = document.getElementById('stand');
const hitButton = document.getElementById('hit');
const messageBox = document.querySelector('.message');

/*----- event listeners -----*/
hitButton.addEventListener('click', playerHit);
standButton.addEventListener('click', dealerHit);
resetButton.addEventListener('click', gameStart);

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

function createShuffledDeck() {
  const tempDeck = [...masterDeck];
  shuffledDeck = [];
  while (tempDeck.length) {
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  };
  return shuffledDeck;
}

function renderHandInContainer(hand, container) {
  container.innerHTML = '';
  const cardsHtml = hand.reduce(function (html, card) {
    return html + `<div class="card ${card.face}"></div>`;
  }, '');
  container.innerHTML = cardsHtml;
}

function dealPlayerCards() {
  playerHand = shuffledDeck.splice(-2, 2);
  renderHandInContainer(playerHand, playerHandContainer);
  return playerHand;
}

function dealDealerCards() {
  dealerHand = shuffledDeck.splice(-2, 2);
  renderHandInContainer(dealerHand, dealerHandContainer);
  return dealerHand;
}

function handTotal(hand) {
  let total = 0;
  hand.forEach(function (card) {
    if (card.value === 11 && total > 10 && total !== 21) {
      card.value = 1;
    }
    total += card.value
  });
  return total;
}

function renderHandValues() {
  playerValue.innerHTML = `Player hand is ${handTotal(playerHand)}`;
  dealerValue.innerHTML = `Dealer hand is ${handTotal(dealerHand)}`;
}

function checkInitialWinner() {
  if (handTotal(playerHand) === 21 && handTotal(playerHand) === handTotal(dealerHand)) {
    hitButton.disabled = true;
    standButton.disabled = true;
    messageBox.innerHTML = `Tie Game! Two Blackjacks? Who'da thunk?`;
  } else if (handTotal(playerHand) === 21) {
    hitButton.disabled = true;
    standButton.disabled = true;
    messageBox.innerHTML = `Player wins with Blackjack!`;
  } else if (handTotal(dealerHand) === 21) {
    hitButton.disabled = true;
    standButton.disabled = true;
    messageBox.innerHTML = `Dealer wins with Blackjack!`;
  }
}

function gameStart() {
  playerHand = [];
  dealerHand = [];
  createShuffledDeck();
  dealPlayerCards();
  dealDealerCards();
  renderHandValues();
  checkInitialWinner();
}

function checkIfBust() {
  if (handTotal(playerHand) > 21) {
    hitButton.disabled = true;
    standButton.disabled = true;
    messageBox.innerHTML = `Player busts with ${handTotal(playerHand)}! Play again?`;
  } else if (handTotal(dealerHand) > 21) {
    hitButton.disabled = true;
    standButton.disabled = true;
    messageBox.innerHTML = `Dealer busts with ${handTotal(dealerHand)}! Play again?`;
  }
}

function playerHit() {
  let newPlayerHand = playerHand.concat(shuffledDeck.splice(-1, 1));
  playerHand = newPlayerHand;
  renderHandInContainer(playerHand, playerHandContainer);
  checkIfBust();
  renderHandValues();
}

function dealerHit() {
  while (handTotal(dealerHand) < 17 && handTotal(dealerHand) < handTotal(playerHand)) {
    let newDealerHand = dealerHand.concat(shuffledDeck.splice(-1, 1));
    dealerHand = newDealerHand;
    renderHandInContainer(dealerHand, dealerHandContainer);
  }
  checkIfBust();
  renderHandValues();
  getWinner();
}

function getWinner() {
  if (handTotal(playerHand) === handTotal(dealerHand)) {
    hitButton.disabled = true;
    standButton.disabled = true;
    messageBox.innerHTML = `Tie game at ${handTotal(playerHand)} each.`;
  } else if (handTotal(playerHand) > handTotal(dealerHand)) {
    hitButton.disabled = true;
    standButton.disabled = true;
    messageBox.innerHTML = `Player wins with hand of ${handTotal(playerHand)}!`;
  } else if (handTotal(dealerHand) > handTotal(playerHand)) {
    hitButton.disabled = true;
    standButton.disabled = true;
    messageBox.innerHTML = `Dealer wins with hand of ${handTotal(dealerHand)}!`;
  };
}

/* Ace is equal to 11 unless the total hand is going to bust
which means, we need the total hand

loop through each hand, if one of the card.value = 11
check if totalHand is > 21 
keep subtracting 10 as there are aces until handtotal is not bust
 */

/*----- Test Functions -----*/
// gameStart();

function dealPlayerCards() {
  playerHand = [
    { face: "hA", value: 11 },
    // { face: "cJ", value: 10 },
    { face: "dA", value: 11 }
  ]
  renderHandInContainer(playerHand, playerHandContainer);
  // getWinner();
  return playerHand;
};

// function dealDealerCards() {
//   dealerHand = [
//     { face: "hA", value: 11 },
//     { face: "cJ", value: 10 }
//   ]
//   renderHandInContainer(dealerHand, dealerHandContainer);
//   // getWinner();
//   return dealerHand;
// };