import {ICard} from "./Card";

export interface IPlayer {
    name: string;
    cards: ICard[];
    countCards(): number;
    addCard(card: ICard): void;
}

export default class Player implements IPlayer{

    name: string;
    cards:ICard[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addCard(card: ICard) {
        this.cards.push(card);
    }

    countCards() {
        return 0;
    }

}