export interface WhiteCardType extends CardType {
    color: 'white',
}

export interface BlackCardType extends CardType {
    color: 'black'
    numResponses: number
}

export interface CardType {
    id: string,
    color: 'white' | 'black',
    text: string
}

export interface DeckType {
    id: string,
    name: string,
    description: string,
    blackCards: BlackCardType[],
    whiteCards: WhiteCardType[],
}

export interface GameType {
    id: string,
    maxScore: number,
    decks: DeckType[],
    password: string,
    players: PlayerType[],
    status: 'in_progress' | 'in_lobby'
}

export interface PlayerType {
    id: string,
    name: string,
    ready: boolean,
    score: number,
    cards: CardType[],
    isTzar: boolean
}

export interface UserType {
    name: string,
    ready: boolean,
    currentGame: null | string,
    favoriteDecks: DeckType[]
}
