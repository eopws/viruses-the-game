class GameController {
    constructor(gameInstance, io) {
        this._game = gameInstance
        this._io = io
    }

    // player's socket who requests game start
    onStart(socket, callback) {
        const playersRoomId = this._game.getPlayerRoomId(socket.id)

        if (!playersRoomId) {
            callback(false)
            return
        }

        const gameStarted = this._game.startGame(socket, playersRoomId)

        if (gameStarted) {
            this._io.to(playersRoomId).emit('game:starts')
        } else {
            callback(false)
        }
    }

    onStep(socket, data) {
        const playersRoomId = this._game.getPlayerRoomId(socket.id)
    }

    getState(socket, callback) {
        const playerRoomId = this._game.getPlayerRoomId(socket.id)

        if (!playerRoomId) {
            callback(false)
            return
        }

        callback({
            field: this._game.getField(playerRoomId),
            fieldW: this._game.getFieldSize(playerRoomId).width,
            fieldH: this._game.getFieldSize(playerRoomId).height,
            players: this._game.getPlayersInRoom(playerRoomId)
        })
    }
}

module.exports = GameController
