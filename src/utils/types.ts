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
    players: UserType[]
}

export interface UserType {
    name: string
}
