import {ICard} from "./Card";

export type PlayerStats = {
    name: string,
    points: number,
    cards: string[]
}

export interface IPlayer {
    name: string;
    cards: ICard[];
    countCards(): number;
    addCard(card: ICard): void;
    isBust: boolean
    setPlayerAsBust(): void;
    generatePlayerStats(): PlayerStats
}

/**
 * Player: Helpers around players for counting cards, getting their stats and viewing their state.
 */
export default class Player implements IPlayer{

    name: string;
    cards:ICard[] = [];
    isBust: boolean = false;

    constructor(name: string) {
        this.name = name;
    }

    addCard(card: ICard) {
        this.cards.push(card);
    }

    countCards() {
        return this.cards.reduce((total: number, current: ICard) => {
            return total + current.cardValue;
        }, 0);
    }

    setPlayerAsBust() {
        this.isBust = true;
    }

    generatePlayerStats(): PlayerStats {
        return {
            name: this.name,
            points: this.countCards(),
            cards: this.cards.map((card) => card.cardName)
        }
    }

}