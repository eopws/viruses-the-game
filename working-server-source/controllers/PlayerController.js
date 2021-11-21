class PlayerController {
    constructor(gameInstance) {
        this._game = gameInstance
    }

    onConnection(socket, data, callback) {
        this._game.incrementPlayersCount()

        /*const { roomId, playerData } = data

        if (!roomId) {
            const { gameRoomData } = data

            const newRoomId = this._game.createGameRoom(gameRoomData)

            this._game.connectPlayerToRoom(socket, playerData, newRoomId)

            callback(this._game.getGameRoomInfo(newRoomId))
        } else {
            const connected = this._game.connectPlayerToRoom(socket, playerData, roomId)

            if (connected) {
                callback(this._game.getGameRoomInfo(roomId))
            } else {
                callback(connected)
            }
        }*/
    }

    onCreateGame(socket, data, callback) {
        const { playerData, gameRoomData } = data

        const newRoomId = this._game.createGameRoom(gameRoomData)

        // if room has been created successfully
        if (newRoomId) {
            this._game.connectPlayerToRoom(socket, playerData, newRoomId)

            callback(this._game.getGameRoomInfo(newRoomId))
        } else {
            callback(false)
        }
    }

    onConnectToRoom(socket, data, callback) {
        const { playerData, roomId } = data

        const connected = this._game.connectPlayerToRoom(socket, playerData, roomId)

        if (connected) {
            callback(this._game.getGameRoomInfo(roomId))
        } else {
            callback(false)
        }
    }

    onGetRooms(callback) {
        const gameRooms = {}

        for (const gameRoomId of this._game.getRoomsIds()) {
            //console.log(this._game.getGameRoomInfo(gameRoomId))
            gameRooms[gameRoomId] = this._game.getGameRoomInfo(gameRoomId)
        }

        callback(gameRooms)
    }

    onDisconnection(socket) {}
}

module.exports = PlayerController
