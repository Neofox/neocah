import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {PlayerType} from "../../src/utils/types";

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

export const updateUserGame = functions.firestore
    .document('users/{userId}')
    .onUpdate((doc) => {
        const userId = doc.after.id;
        const user = doc.after.data();
        const previousUser = doc.before.data();

        if (user && previousUser && user.ready !== previousUser.ready) {
            return toggleReady(userId, user);
        }

        if (user === undefined || (previousUser && user.currentGame === previousUser.currentGame)) {
            return null;
        }

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
    const newPlayer: PlayerType = {id: userId, name: user.name, ready: false, score: 0};
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
