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
const standButton = document.getElementById('stand');
const hitButton = document.getElementById('hit');
const resetButton = document.getElementById('game-button');
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
};

function createShuffledDeck() {
  const tempDeck = [...masterDeck];
  shuffledDeck = [];
  while (tempDeck.length) {
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  };
  return shuffledDeck;
};

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
};

function dealDealerCards() {
  dealerHand = shuffledDeck.splice(-2, 2);
  renderHandInContainer(dealerHand, dealerHandContainer);
  return dealerHand;
};

function handTotal(hand) {
  let total = 0;
  hand.forEach(function (card) {
    total += card.value
  });
  return total;
};

function checkInitialWinner() {
  if (handTotal(playerHand) === 21 && handTotal(playerHand) === handTotal(dealerHand)) {
    console.log('tie game');
  } else if (handTotal(playerHand) === 21) {
    console.log('Player wins with blackjack')
  } else if (handTotal(dealerHand) === 21) {
    console.log('dealer wins with blackjack')
  }
};

function gameStart() {
  createShuffledDeck();
  dealPlayerCards();
  dealDealerCards();
  checkInitialWinner();
};

function checkIfBust() {
  if (handTotal(playerHand) > 21) {
    hitButton.disabled = true;
    standButton.disabled = true;
    messageBox.innerHTML = `Player busts with ${handTotal(playerHand)}! Play again?`
  } else if (handTotal(dealerHand) > 21) {
    hitButton.disabled = true;
    standButton.disabled = true;
    messageBox.innerHTML = `Dealer busts with ${handTotal(dealerHand)}! Play again?`
  }
};

function playerHit() {
  let newPlayerHand = playerHand.concat(shuffledDeck.splice(-1, 1));
  playerHand = newPlayerHand;
  renderHandInContainer(playerHand, playerHandContainer);
  console.log('hit');
  checkIfBust();
  // return playerHand;
};

function dealerHit() {
  // let newDealerHand = dealerHand.concat(shuffledDeck.splice(-1, 1));
  // dealerHand = newDealerHand;
  // renderHandInContainer(dealerHand, dealerHandContainer);
  // checkIfBust();
  while (handTotal(dealerHand) <= 17) {
    let newDealerHand = dealerHand.concat(shuffledDeck.splice(-1, 1));
    dealerHand = newDealerHand;
    renderHandInContainer(dealerHand, dealerHandContainer);
  }
  checkIfBust();
  getWinner();
  // return dealerHand;
};

function getWinner() {
  if (handTotal(playerHand) === handTotal(dealerHand)) {
    console.log('tie');
  } else if (handTotal(playerHand) > handTotal(dealerHand)) {
    console.log('player wins');
  } else if (handTotal(dealerHand) > handTotal(playerHand)) {
    console.log('dealer wins');
  };
}

/*----- Test Functions -----*/
gameStart();

// function dealPlayerCards() {
//   playerHand = [
//     { face: "hA", value: 11 },
//     { face: "cJ", value: 10 }
//   ]
//   renderHandInContainer(playerHand, playerHandContainer);
//   // getWinner();
//   return playerHand;
// };

// function dealDealerCards() {
//   dealerHand = [
//     { face: "hA", value: 11 },
//     { face: "cJ", value: 10 }
//   ]
//   renderHandInContainer(dealerHand, dealerHandContainer);
//   // getWinner();
//   return dealerHand;
// };