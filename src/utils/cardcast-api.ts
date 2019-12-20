import {BlackCardType, DeckType, WhiteCardType} from "./types";

const BASE_URL = 'https://api.cardcastgame.com/v1';

export const getDeckCards = async (deckId: string): Promise<{white: WhiteCardType[], black: BlackCardType[]}> => {
    let res = await fetch(`${BASE_URL}/decks/${deckId}/cards`);
    let data = await res.json();

    const whiteCards: WhiteCardType[] = data.responses.map((card: any) => ({
        id: card.id,
        color: 'white',
        text: card.text[0].charAt(0).toUpperCase() + card.text[0].slice(1)
    }));

    const blackCards: BlackCardType[] = data.calls.map((card: any) => ({
        id: card.id,
        color: 'black',
        text: card.text.join('_'),
        numResponses: card.text.length - 1
    }));

    return {white: whiteCards, black: blackCards}
};

export const getDeck = async (deckId: string): Promise<DeckType> => {
    // Get deck data
    let res = await fetch(`${BASE_URL}/decks/${deckId}`);
    let data = await res.json();
    // Get deck cards
    const cards = await getDeckCards(deckId);

    return {
        id: data.code,
        name: data.name,
        description: data.description,
        whiteCards: cards.white,
        blackCards: cards.black
    };
};
