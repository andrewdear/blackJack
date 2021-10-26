import Player from "./services/Player";
import BlackJack from "./services/BlackJack";

const player1 = new Player("Andy");
const player2 = new Player("Bob");

const game = new BlackJack([player1, player2]);

game.startGame();