Constants: Deck of cards as an object. 
  const DECK {
    twoHearts: 2,
    twoDiamonds: 2,
    .
    .
    .
    kingSpades: 10,
    kingClubs: 10,
  };
  PLAYERHAND = [];
  DEALERHAND = [];
  
- Object will be array that has values of each card removed, and added to player/dealer hands [arrays]
  - This is to ensure that there are no duplicates from the deck
- Hands will be sum of array of card values
  - Sum of array cannot exceed 21 "Bust"
  - Dealer will stand at minimum of 17
  - Closest to or equal to 21 will win
  - Face card (plus maybe 10 card) plus Ace will automatically win ("Blackjack"), or tie at worse
  - Ace value can be either 1 or 11, depending on best value for hand (make automatic?)
- Game starts with no cards on table, and all 52 cards available to be dealt
  - Button in the middle will start game, after clicking, button will be hidden
  - Player is dealt one card first, then dealer, then player, then dealer. 
  - Player cards are face up, only one card for the dealer is face up
  - Player turn lasts until they they stand, hit 21, or bust
  - If player has not lost, dealer will continue to draw cards until they hit minimum value of 17, max of 21, or bust
  - Message appears in middle when player wins or loses, along with a replay option
- Buttons
  - 'Start' game
  - 'Replay' after Win/Loss
  - 'Stand' to stop drawing cards. Automatically ends player turn, disabled when bust or player has 21 "Blackjack"
  - 'Hit' draws more cards from the deck. Disabled if Player hits 'Stand', value is 21, or player busts