import Player from "./services/Player";
import BlackJack from "./services/BlackJack";

const player1 = new Player("Andy");
const player2 = new Player("Bob");
// const player3 = new Player("Sophie");
// const player4 = new Player("Ruth");

const game = new BlackJack([player1, player2]);

// Example usage, this could be used with express or imported directly into a front end for use.
game.playGame().then((results) => {
    console.log(JSON.stringify(results));
});