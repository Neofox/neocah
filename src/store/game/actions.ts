import {UPDATE_GAME, GameType, FETCH_GAME} from "./types";


export function updateGame(newGame: GameType) {
    return {
        type: UPDATE_GAME,
        payload: newGame
    };
}

export function fetchGames() {
    return {
        type: FETCH_GAME
    };
}
