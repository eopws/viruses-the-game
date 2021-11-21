// https://habr.com/ru/post/132544/

import { GameRoomModel } from "@models"

class VirusesModel {
    gameRooms = {
        id: new GameRoomModel()
    };
    playersCount = 0;

    connectPlayerToRoom(player, gameId) {
        this.gameRooms[gameId].addPlayer(player);
        this.playersCount++;
    }

    createRoom(player, roomData) {
        // generate new room id, then players can connect to it
        const newRoomId = uuid.v4();

        this.gameRooms[newRoomId] = new GameRoomModel(roomData);
        this.connectPlayerToRoom(player, newRoomId);
    }

    getRooms() {
        const rooms = {};

        for (const room in this.gameRooms) {
            rooms[room] = this.gameRooms[room].getRoomInfo();
        }

        return rooms;
    }

    step(player, gameId, data) {
        // here we do some reaaaaaaaly complicated stuff
        const stepCorrect = this.gameRooms[gameId]?.step(player, gameId, data);

        return stepCorrect;
    }
}
