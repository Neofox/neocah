import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {CardType, DeckType, PlayerType} from "../../src/utils/types";

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
//TODO: move all those function in different files

//// GAME MANAGEMENT ///
export const gameManagement = functions.firestore
    .document('games/{gameId}')
    .onUpdate(doc => {
        const gameId = doc.after.id;
        const game = doc.after.data();
        const previousGame = doc.before.data();

        if (game && previousGame && (game.status === 'in_progress' && previousGame.status === 'in_lobby')) {
            return loadGame(game);
        }

        if (game && previousGame && game.players !== previousGame.players) {
            const isAllPlayerReady = game && game.players.reduce((acc: boolean, curr: PlayerType) => {
                return !curr.ready ? false : acc
            }, true);

            if (isAllPlayerReady && game && game.status === 'in_lobby') {
                return db.collection('games').doc(gameId).update({
                    status: 'in_progress'
                })
            }
        }

        return null;
    });

const loadGame = (game: any) => {

    //distributes cards to all players
    const allWhiteCards = game.decks.reduce((acc: CardType[], curr: DeckType) => {
        return acc.concat(curr.whiteCards)
    }, []);

    game.players.forEach((player: PlayerType) => {
        giveCardsToPlayer(player, allWhiteCards)
    });

    //select a tzar player
    game.players[Math.floor(Math.random()*game.players.length)].isTzar = true;

    //select a black card
    const allBlackCards = game.decks.reduce((acc: CardType[], curr: DeckType) => {
        return acc.concat(curr.blackCards)
    }, []);
    const initialBlackCard = allBlackCards.splice(Math.floor(Math.random()*allBlackCards.length),1)[0];

    //update game state
    return db.collection('games').doc(game.id).update({
        blackCard: initialBlackCard,
        players: game.players
    })
};

const giveCardsToPlayer = (player: PlayerType, cards: CardType[], nbrOfCards = 10): PlayerType => {
    for (let i = 0; i < nbrOfCards; i++) {
        player.cards.concat(cards.splice(Math.floor(Math.random()*cards.length),1))
    }
    return player;
};
/// END GAME MANAGEMENT ///

/// ADD / REMOVE / TOGGLE READY ///
export const updateUserGame = functions.firestore
    .document('users/{userId}')
    .onUpdate(doc => {
        const userId = doc.after.id;
        const user = doc.after.data();
        const previousUser = doc.before.data();

        if (user && previousUser && user.ready !== previousUser.ready && user.currentGame !== null) {
            return toggleReady(userId, user);
        }

        if (user === undefined || (previousUser && user.currentGame === previousUser.currentGame)) return null;

        if (user && user.currentGame !== null) {
            return addPlayerToGame(userId, user);
        } else if (user && user.currentGame === null) {
            return removePlayerFromGame(userId, previousUser);
        }
        return null;
    });

const removePlayerFromGame = (userId: string, user: any) => {
    return db.collection('games').doc(user.currentGame).get().then(gameSnapshot => {
        const oldPlayerList: PlayerType[] = gameSnapshot.get('players');
        const newPlayerList = oldPlayerList.filter(player => player.id !== userId);

        if (newPlayerList.length === 0) {
            return destroyGame(gameSnapshot)
        } else {
            return db.collection('games')
                .doc(user.currentGame)
                .update({
                    players: newPlayerList
                })
        }
    });
};

const addPlayerToGame = (userId: string, user: any) => {
    const newPlayer: PlayerType = {id: userId, name: user.name, ready: false, score: 0, isTzar: false, cards: []};
    return db.collection('games').doc(user.currentGame).get().then(gameSnapshot => {
        return db.collection('games')
            .doc(user.currentGame)
            .update({
                players: [...gameSnapshot.get('players'), newPlayer]
            })
    });
};

const destroyGame = (game: any) => {
    return db.collection('games')
        .doc(game.id)
        .delete()
};

const toggleReady = (userId: string, user: any) => {
    return db.collection('games').doc(user.currentGame).get().then(gameSnapshot => {
        const oldPlayerList: PlayerType[] = gameSnapshot.get('players');
        const newPlayerList = oldPlayerList.map(player => player.id === userId ? {...player, ready: user.ready} : player);

        return db.collection('games')
            .doc(user.currentGame)
            .update({
                players: newPlayerList
            })
    });
};
/// END ADD / REMOVE / TOGGLE READY ///
