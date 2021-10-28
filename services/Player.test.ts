import Player from "./Player";
import Card from "./Card";

const card1 = new Card("DIAMONDS", "Q")
const card2 = new Card("HEARTS", "A");
const card3 = new Card("CLUBS", "3");

describe("Player service" , () => {
    it("should set the correct player name", () => {
        const player = new Player("Andy");
        expect(player.name).toEqual("Andy");
    })

    it("should add the passed in card to the players cards on addCard", () => {
        const player = new Player("Andy");
        expect(player.cards).toEqual([]);
        player.addCard(card1);
        expect(player.cards).toEqual([card1]);
        player.addCard(card2);
        expect(player.cards).toEqual([card1, card2]);
        player.addCard(card3);
        expect(player.cards).toEqual([card1, card2, card3]);
    })

    it('should return the correct summed card values on countCards' , () => {
        const player = new Player("Andy");
        expect(player.countCards()).toEqual(0);
        player.addCard(card1);
        expect(player.countCards()).toEqual(10);
        player.addCard(card2);
        expect(player.countCards()).toEqual(21);
        player.addCard(card3);
        expect(player.countCards()).toEqual(24);
    })

    it('should set a payer on bust when calling setPlayerAsBust', () => {
        const player = new Player("Andy");

        player.setPlayerAsBust();

        expect(player.isBust).toEqual(true);
    })

    it('should return the correct player stats when calling generatePlayerStats' , () => {
        const player = new Player("Andy");
        player.addCard(card1);
        player.addCard(card2);
        player.addCard(card3);

        expect(player.generatePlayerStats()).toEqual({
            "name": "Andy",
            "points": 24,
            "cards": ["DQ", "HA", "C3"]
        })
    })

})