import {FETCH_GAME, GameActionTypes, GameState, GameType, UPDATE_GAME} from "./types";

const initialState: GameState = {
    games: []
};

const tempGames: GameType[] = [
    {id: 'POJHX', maxScore: 10, password: undefined, players: [{name: 'Neofox', inGame: true}], decks: []},
    {id: 'AZER', maxScore: 20, password: 'toto', players: [{name: 'Narga', inGame: true}], decks: []},
    {id: 'MLJH', maxScore: 8, password: undefined, players: [{name: 'Nath', inGame: true}, {name: 'Ryo', inGame: true}], decks: []}
];

export function gameReducer(state = initialState, action: GameActionTypes): GameState {
    switch (action.type) {
        case UPDATE_GAME: {
            return {
                ...state,
                ...action.payload
            };
        }
        case FETCH_GAME: {
            return {
                ...state,
                games: [...state.games, ...tempGames]
            };
        }
        default:
            return state;
    }
}
