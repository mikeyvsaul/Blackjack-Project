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
  }
  return shuffledDeck;
}

function renderHandInContainer(hand, container) {
  container.innerHTML = '';
  let cardsHtml = ``;
  if (container === dealerHandContainer && hand.length === 2) {
    hand.forEach(function (card, idx) {
      if (idx === 1) {
        cardsHtml += `<div class="card back-red"></div>`;
      } else {
        cardsHtml += `<div class="card ${card.face}"></div>`;
      }
    })
  } else {
    cardsHtml = hand.reduce(function (html, card) {
      return html + `<div class="card ${card.face}"></div>`;
    }, '');
  }

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
    if (card.value === 11 && total > 10 && total !== 21 && hand.length > 2) {
      card.value = 1;
    }
    total += card.value
  });
  return total;
}

function renderHandValues() {
  let dealerHandTotal = dealerHand.length === 2 ? dealerHand[0].value : handTotal(dealerHand);
  playerValue.innerHTML = `Player hand is ${handTotal(playerHand)}`;
  dealerValue.innerHTML = `Dealer hand is ${dealerHandTotal}`;
}

function checkInitialWinner() {
  if (handTotal(playerHand) === 21 && handTotal(playerHand) === handTotal(dealerHand)) {
    disablePlayer(`Tie Game! Two Blackjacks? Who'da thunk?`);
    showDealerCards();
  } else if (handTotal(playerHand) === 21) {
    disablePlayer(`Player wins with Blackjack!`);
    showDealerCards();
  } else if (handTotal(dealerHand) === 21) {
    disablePlayer(`Dealer wins with Blackjack!`);
    showDealerCards();
  }
}

function gameStart() {
  playerHand = [];
  dealerHand = [];
  messageBox.innerHTML = '';
  enablePlayer();
  createShuffledDeck();
  dealPlayerCards();
  dealDealerCards();
  renderHandValues();
  checkInitialWinner();
}

function disablePlayer(message) {
  hitButton.disabled = true;
  standButton.disabled = true;
  messageBox.innerHTML = message;
}

function enablePlayer() {
  hitButton.disabled = false;
  standButton.disabled = false;
}

function showDealerCards() {
  let html = ``;
  dealerHand.forEach(function (card) {
    html += `<div class="card ${card.face}"></div>`;
  });
  dealerHandContainer.innerHTML = html;
  dealerValue.innerHTML = `Dealer hand is ${handTotal(dealerHand)}`;
}

function checkIfBust() {
  if (handTotal(playerHand) > 21) {
    disablePlayer(`Player busts with ${handTotal(playerHand)}! Play again?`);
    showDealerCards();
  } else if (handTotal(dealerHand) > 21) {
    disablePlayer(`Dealer busts with ${handTotal(dealerHand)}! Play again?`);
    showDealerCards();
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
    disablePlayer(`Tie game at ${handTotal(playerHand)} each.`);
  } else if (handTotal(playerHand) > handTotal(dealerHand) && handTotal(playerHand) <= 21) {
    disablePlayer(`Player wins with hand of ${handTotal(playerHand)}!`);
  } else if (handTotal(dealerHand) > handTotal(playerHand) && handTotal(dealerHand) <= 21) {
    disablePlayer(`Dealer wins with hand of ${handTotal(dealerHand)}!`);
  }
  showDealerCards();
}



/* Ace is equal to 11 unless the total hand is going to bust
which means, we need the total hand

loop through each hand, if one of the card.value = 11
check if totalHand is > 21
keep subtracting 10 as there are aces until handtotal is not bust
 */

/*----- Test Functions -----*/
// gameStart();

// function dealPlayerCards() {
//   playerHand = [
//     { face: "hA", value: 11 },
//     // { face: "cJ", value: 10 },
//     { face: "dA", value: 11 }
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
