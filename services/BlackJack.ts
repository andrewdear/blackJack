import {IPlayer, PlayerStats} from "./Player";
import Card, {ICard} from "./Card";
import axios, {AxiosResponse} from "axios";

interface IBlackJack {
    highCard: number;
    highCardChanged: boolean;
    deck: ICard[];
    players: IPlayer[];
    playGame(): any;
}

type shuffleValue = {
    suit: string;
    value: string;
}

type results = {
    winner: string,
    players: { name: string, points: number, cards: string[] }[]
}

type error = {
    error: string,
    errorDetails?: string
}

/**
 *  BlacksJack, start by passing in at least 1 Player to the constructor then calling playGame()
 */

export default class BlackJack implements IBlackJack {
    highCard = 16;
    highCardChanged = false;
    deck: ICard[] = [];
    players: IPlayer[];

    constructor(players: IPlayer[] = []) {
        this.players = players;
    }

    private async retrieveDeck() {
        try {
            const rawDeck: AxiosResponse<shuffleValue[]> = await axios.get('https://pickatale-backend-case.herokuapp.com/shuffle');

            this.deck = rawDeck.data.map((card) => {
                return new Card(card.suit, card.value);
            })
        } catch (e) {
            throw(e);
        }
    }

    /**
     * Draw card from the beginning of the deck
     */
    private drawCard(): ICard {
        return this.deck.shift()!;
    }

    /**
     * Starts the game and returns the results
     */
    async playGame(): Promise<results | error> {
        if (!this.players.length) {
            return {
                error: 'You need at least 1 player to be able to play a game.'
            }
        }

        try {
            await this.retrieveDeck();
        } catch (e) {
            return {
                error: 'Something has gone wrong retrieving your deck, please try again.',
                errorDetails: (e as Error).message
            }
        }

        this.players.forEach((player) => {
            player.addCard(this.drawCard())
            player.addCard(this.drawCard())
        })

        const playerLength = this.players.length;

        for (let i = 0; i < playerLength; i++) {
            const nextPlayer = this.players[i];
            const currentCount = nextPlayer.countCards();

            if (i + 1 === playerLength && !this.highCardChanged) {
                // if we get to the last player and the high card has not changed then it means everyone has gone bust so this player wins by default.
                break;
            } else if ((currentCount > this.highCard) || currentCount === 21) {
                // otherwise their card is 17 or over and is the highest card.
                this.highCard = currentCount;
                this.highCardChanged = true;
            } else {
                // draw cards until over high card or bust
                this.playerDrawCard(nextPlayer);
            }

        }

        return this.getResults();


    }

    /**
     *  formats results of the game into an object with a winner and player stats
     */
    private getResults(): results {
        let highScore: number = 0;
        let playerWithHighestScore = 'Unknown';
        let playersWith21: string[] = [];
        const gameStats: PlayerStats[] = [];

        this.players.forEach((player) => {
            const playersCardCount = player.countCards();
            if (playersCardCount === 21) {
                playersWith21.push(player.name);
            } else if (!player.isBust && playersCardCount > highScore) {
                highScore = playersCardCount;
                playerWithHighestScore = player.name;
            }

            gameStats.push(player.generatePlayerStats())
        })

        const winner = playersWith21.length ? playersWith21.join(' & ') : playerWithHighestScore

        return {
            winner,
            players: gameStats
        }
    }

    /**
     *  recursively draw cards until player is bust or are winning
     * @param player
     */
    private playerDrawCard(player: IPlayer) {

        player.addCard(this.drawCard());

        const newCount = player.countCards();

        if (newCount > 21) {
            player.setPlayerAsBust();
        } else if (newCount > this.highCard || newCount === 21) {
            this.highCard = newCount;
            this.highCardChanged = true;
        } else {
            this.playerDrawCard(player);
        }
    }

}