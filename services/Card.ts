export interface ICard {
    cardName: string,
    cardValue: number,
}


/**
 * Card: has helpers to set the card name and card value for use.
 */
export default class Card implements ICard {
    cardName: string;
    cardValue: number;

    constructor(suit: string, value: string) {
        this.cardName = Card.generateCardName(suit, value);
        this.cardValue = Card.generateCardValue(value);
    }


    private static generateCardName(suit: string, value: string): string {
        return `${suit.charAt(0)}${value}`;
    }

    private static generateCardValue(value: string): number {
        // I could have converted the value to a number when any NaNs make them a 10 unless it was the letter A but that seemed messy
        // I thought a map would be cleaner and easier to read.
        const cardMap: {[key: string] : number} = {
            '2': 2,
            '3': 3,
            '4': 4,
            '5': 5,
            '6': 6,
            '7': 7,
            '8': 8,
            '9': 9,
            '10' : 10,
            'J': 10,
            'Q': 10,
            'K': 10,
            'A': 11
        }
        return cardMap[value];
    }

}