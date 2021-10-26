import {IPlayer} from "./Player";
import Card, {ICard} from "./Card";

interface IBlackJack {
    highCard: number;
    deck: ICard[];
    players: IPlayer[];
    startGame(): any;
}

type shuffleValue = {
    suit: string;
    value: string;
}

export default class BlackJack implements IBlackJack{
    highCard = 17;
    deck: ICard[] = [];
    players: IPlayer[];

    constructor(players: IPlayer[]) {
        this.players = players;
    }

    private async retrieveDeck() {
        //https://pickatale-backend-case.herokuapp.com/shuffle
        try {
            const rawDeck: shuffleValue[] = await FakeDeck();

            this.deck = rawDeck.map((card) => {
                return new Card(card.suit, card.value);
            })
        } catch (e) {
            console.log(e)
            throw(new Error("Something had gone wrong with the endpoint"))
        }
    }

    /**
     * Draw card from the beginning of the deck
     */
    drawCard(): ICard {
        return this.deck.shift()!;
    }

    async startGame () {
        // Each player gets two cards
        try {
            await this.retrieveDeck();

            this.players.forEach((player) => {
                player.addCard(this.drawCard())
                player.addCard(this.drawCard())
            })

            //TODO: check to see if anyone has 21 then go off and pull any more cards

            // also check to see if there are more than 1 winnder then join the names with a &


        } catch (e) {
            console.log(e);
            return {
                error: 'Something has gone wrong while setting up your game, please try again.'
            }
        }

    }

    finnishGame() {

    }

    playerDrawCards() {
        this.highCard;
        // this will be a map of each player and it will call the playRound for each until there are no more.
    }

    playRound() {
        // When we start the round see if we need to exit then we return the largest value or false.

        this.highCard;
        // make player keep pulling cards untill they are more tham the current max card or bust
    }

    //TODO: i think recersion is going to be the best bet here. keep calling draw card on each player untill they reach a limit

}

const FakeDeck = async () => {
    return Promise.resolve([
        {
            suit: "DIAMONDS",
            value: "Q"
        },
        {
            suit: "SPADES",
            value: "Q"
        },
        {
            suit: "CLUBS",
            value: "J"
        },
        {
            suit: "HEARTS",
            value: "8"
        },
        {
            suit: "SPADES",
            value: "A"
        },
        {
            suit: "HEARTS",
            value: "2"
        },
        {
            suit: "HEARTS",
            value: "K"
        },
        {
            suit: "SPADES",
            value: "J"
        },
        {
            suit: "DIAMONDS",
            value: "A"
        },
        {
            suit: "DIAMONDS",
            value: "7"
        },
        {
            suit: "DIAMONDS",
            value: "8"
        },
        {
            suit: "CLUBS",
            value: "Q"
        },
        {
            suit: "DIAMONDS",
            value: "10"
        },
        {
            suit: "HEARTS",
            value: "J"
        },
        {
            suit: "HEARTS",
            value: "3"
        },
        {
            suit: "CLUBS",
            value: "2"
        },
        {
            suit: "HEARTS",
            value: "A"
        },
        {
            suit: "HEARTS",
            value: "7"
        },
        {
            suit: "DIAMONDS",
            value: "J"
        },
        {
            suit: "SPADES",
            value: "2"
        },
        {
            suit: "CLUBS",
            value: "5"
        },
        {
            suit: "HEARTS",
            value: "10"
        },
        {
            suit: "DIAMONDS",
            value: "6"
        },
        {
            suit: "CLUBS",
            value: "6"
        },
        {
            suit: "SPADES",
            value: "K"
        },
        {
            suit: "DIAMONDS",
            value: "3"
        },
        {
            suit: "SPADES",
            value: "3"
        },
        {
            suit: "DIAMONDS",
            value: "8"
        },
        {
            suit: "CLUBS",
            value: "7"
        },
        {
            suit: "SPADES",
            value: "6"
        },
        {
            suit: "SPADES",
            value: "4"
        },
        {
            suit: "CLUBS",
            value: "A"
        },
        {
            suit: "HEARTS",
            value: "4"
        },
        {
            suit: "CLUBS",
            value: "4"
        },
        {
            suit: "SPADES",
            value: "10"
        },
        {
            suit: "DIAMONDS",
            value: "K"
        },
        {
            suit: "SPADES",
            value: "8"
        },
        {
            suit: "DIAMONDS",
            value: "5"
        },
        {
            suit: "HEARTS",
            value: "8"
        },
        {
            suit: "SPADES",
            value: "5"
        },
        {
            suit: "SPADES",
            value: "8"
        },
        {
            suit: "CLUBS",
            value: "K"
        },
        {
            suit: "CLUBS",
            value: "3"
        },
        {
            suit: "DIAMONDS",
            value: "2"
        },
        {
            suit: "CLUBS",
            value: "8"
        },
        {
            suit: "SPADES",
            value: "7"
        },
        {
            suit: "HEARTS",
            value: "Q"
        },
        {
            suit: "HEARTS",
            value: "5"
        },
        {
            suit: "CLUBS",
            value: "10"
        },
        {
            suit: "HEARTS",
            value: "6"
        },
        {
            suit: "CLUBS",
            value: "8"
        },
        {
            suit: "DIAMONDS",
            value: "4"
        }
    ]);
}

///expected response

// {
//     "winner": "Annie",
//     "players": [
//     {
//         "name": "Annie",
//         "points": 19,
//         "cards": ["D2", "H2", "C6", "H9"]
//     },
//     {
//         "name": "Bob",
//         "points": 27,
//         "cards": ["S7", "S10", "CJ"]
//     }
// ]
// }
