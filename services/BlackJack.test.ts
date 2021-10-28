import Player from "./Player";
import BlackJack from "./BlackJack";
import axios from "axios";

jest.mock("axios");

const fakeDeck = [
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
];

describe("BlackJack service" , () => {

    it('should return an error if you try and play the game with no players' , (done) => {
        // @ts-ignore
        const game = new BlackJack();

        expect(game.playGame().then(data => {
            expect(data).toEqual({
                error: 'You need players to be able to play a game.'
            })
            done()
        }))

    })

    it('should return an error if an error is returned from the shuffle endpoint', () => {
        // @ts-ignore
        axios.get.mockImplementation(() =>  {throw new Error("Uh Oh")});

        const player1 = new Player("Andy");
        const player2 = new Player("Bob");


        const game = new BlackJack([player1, player2]);

        game.playGame().then((results) => {
            expect(results).toEqual({"error": "Something has gone wrong retrieving your deck, please try again.", "errorDetails": "Uh Oh"})
        })
    })

    it("should play as expected when calling playGame", (done) => {

        // @ts-ignore
        axios.get.mockImplementation(() => Promise.resolve({ data: fakeDeck }));

        const player1 = new Player("Andy");
        const player2 = new Player("Bob");


        const game = new BlackJack([player1, player2]);

        game.playGame().then((results) => {
            expect(results).toEqual({
                "winner": "Andy",
                "players":[
                    {"name": "Andy", "points": 20, "cards": ["DQ", "SQ"]},
                    {"name": "Bob", "points": 29, "cards": ["CJ", "H8", "SA"]},
                ]})

            done()
        });

    })

    it('should play as expected when calling playGame in the case the last player wins by default', (done) => {
        // @ts-ignore
        axios.get.mockImplementation(() => Promise.resolve({ data: [
                {
                    suit: "DIAMONDS",
                    value: "Q"
                }, {
                    suit: "SPADES",
                    value: "6"
                }, {
                    suit: "CLUBS",
                    value: "Q"
                }, {
                    suit: "HEARTS",
                    value: "4"
                },{
                    suit: "CLUBS",
                    value: "K"
                }
            ] }));

        const player1 = new Player("Andy");
        const player2 = new Player("Bob");

        const game = new BlackJack([player1, player2]);

        game.playGame().then((results) => {
            expect(results).toEqual({
                "winner": "Bob",
                "players":[
                    {"name": "Andy", "points": 26, "cards": ["DQ", "S6", "CK"]},
                    {"name": "Bob", "points": 14, "cards": ["CQ", "H4"]}
                ]})

            done()
        });
    })

    it("should play as expected when calling playGame with more than two players", (done) => {

        // @ts-ignore
        axios.get.mockImplementation(() => Promise.resolve({ data: fakeDeck }));

        const player1 = new Player("Andy");
        const player2 = new Player("Bob");
        const player3 = new Player("Sophie");

        const game = new BlackJack([player1, player2, player3]);

        game.playGame().then((results) => {
            expect(results).toEqual({
                "winner": "Andy",
                "players":[
                    {"name": "Andy", "points": 20, "cards": ["DQ", "SQ"]},
                    {"name": "Bob", "points": 28, "cards": ["CJ", "H8", "HK"]},
                    {"name":"Sophie", "points":23,"cards":["SA","H2","SJ"]}
                ]})

            done()
        });

    })

    it("should play as expected when a high card is set within playerDrawCard", (done) => {

        // @ts-ignore
        axios.get.mockImplementation(() => Promise.resolve({ data: [
                { suit: 'DIAMONDS', value: '10' },
                { suit: 'SPADES', value: '2' },
                { suit: 'DIAMONDS', value: 'J' },
                { suit: 'DIAMONDS', value: '6' },
                { suit: 'DIAMONDS', value: '2' },
                { suit: 'HEARTS', value: '5' },
                { suit: 'CLUBS', value: '2' },
                { suit: 'HEARTS', value: '10' },
                { suit: 'CLUBS', value: 'J' },
                { suit: 'DIAMONDS', value: '4' },
                { suit: 'SPADES', value: '4' },
                { suit: 'CLUBS', value: '3' },
                { suit: 'CLUBS', value: '10' },
                { suit: 'HEARTS', value: 'J' }] }));

        const player1 = new Player("Andy");
        const player2 = new Player("Bob");
        const player3 = new Player("Sophie");
        const player4 = new Player("Ruth");

        const game = new BlackJack([player1, player2, player3, player4]);

        game.playGame().then((results) => {
            expect(results).toEqual({
                "winner":"Bob",
                "players":[
                    {"name":"Andy","points":22,"cards":["D10","S2","CJ"]},
                    {"name":"Bob","points":20,"cards":["DJ","D6","D4"]},
                    {"name":"Sophie","points":24,"cards":["D2","H5","S4","C3","C10"]},
                    {"name":"Ruth","points":22,"cards":["C2","H10","HJ"]}
                ]
            })

            done()
        });

    })

    it("should play as expected when calling playGame with multiple player drawing 21 immediately", (done) => {

        // @ts-ignore
        axios.get.mockImplementation(() => Promise.resolve({ data: [
            {
                suit: "DIAMONDS",
                value: "Q"
            }, {
                suit: "SPADES",
                value: "A"
            }, {
                suit: "CLUBS",
                value: "J"
            }, {
                suit: "HEARTS",
                value: "A"
            },{
                suit: "CLUBS",
                value: "K"
            }, {
                suit: "CLUBS",
                value: "A"
            }
        ] }));

        const player1 = new Player("Andy");
        const player2 = new Player("Bob");
        const player3 = new Player("Sophie");

        const game = new BlackJack([player1, player2, player3]);

        game.playGame().then((results) => {
            expect(results).toEqual({
                "winner": "Andy & Bob & Sophie",
                "players":[
                    {"name": "Andy", "points": 21, "cards": ["DQ", "SA"]},
                    {"name": "Bob", "points": 21, "cards": ["CJ", "HA"]},
                    {"name":"Sophie", "points":21,"cards":["CK","CA"]}
                ]})

            done()
        });

    })
})