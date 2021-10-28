import Card from "./Card";

describe("Card service" , () => {
    it("should generate the correct cardName depending on suit and value added", () => {
        const card1 = new Card("DIAMONDS", "Q");
        expect(card1.cardName).toEqual('DQ');

        const card2 = new Card("SPADES", "K");
        expect(card2.cardName).toEqual('SK');

        const card3 = new Card("CLUBS", "J");
        expect(card3.cardName).toEqual('CJ');

        const card4 = new Card("HEARTS", "A");
        expect(card4.cardName).toEqual('HA');

        for(let i = 1; i <= 10; i++) {
            const stringNumber = i.toString();
            expect(new Card("HEARTS", stringNumber).cardName).toEqual(`H${stringNumber}`)
        }
    })

    it("should generate the correct card value depending on value passed in", () => {
        const card1 = new Card("DIAMONDS", "Q");
        expect(card1.cardValue).toEqual(10);

        const card2 = new Card("SPADES", "K");
        expect(card2.cardValue).toEqual(10);

        const card3 = new Card("CLUBS", "J");
        expect(card3.cardValue).toEqual(10);

        const card4 = new Card("HEARTS", "A");
        expect(card4.cardValue).toEqual(11);

        for(let i = 2; i <= 10; i++) {
            const stringNumber = i.toString();
            expect(new Card("HEARTS", stringNumber).cardValue).toEqual(i);
        }
    })

})