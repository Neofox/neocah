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

export interface UserType {
    name: string
}
