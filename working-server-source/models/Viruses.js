const uuid = require("uuid")
const GameRoomModel = require('./GameRoomModel.js')

class Viruses {
    _gameRooms = {
        //id: new GameRoomModel()
    }

    _players = {
        //id: roomId
    }

    _playersCount = 0

    connectPlayerToRoom(socket, playerData, gameRoomId) {
        const connected = this._gameRooms[gameRoomId].connectPlayer(socket, {
            nickname: playerData.nickname,
            virusIcon: playerData.playersVirus,
            avatar: playerData.playersAvatar,
            money: 0,
            units: [],
        })

        if (connected) {
            socket.join(gameRoomId)
            this._players[socket.id] = gameRoomId
        }

        return connected
    }

    startGame(socket, gameRoomId) {
        const gameStarted = this._gameRooms[gameRoomId]?.startGame(socket.id)

        return gameStarted
    }

    incrementPlayersCount() {
        this._playersCount++
    }

    createGameRoom(gameRoomData) {
        // generate new room id, then players can connect to it
        const newGameRoomId = uuid.v4()

        this._gameRooms[newGameRoomId] = new GameRoomModel(newGameRoomId, gameRoomData)

        return newGameRoomId
    }

    step(data) {
    }

    getPlayersInRoom(roomId) {
        return this._gameRooms[roomId].getPlayersInRoom()
    }

    getGameRoomInfo(roomId) {
        return this._gameRooms[roomId].getGameRoomInfo()
    }

    getPlayerRoomId(playerId) {
        return this._players[playerId]
    }

    getField(roomId) {
        return this._gameRooms[roomId].getField()
    }

    getFieldSize(roomId) {
        return this._gameRooms[roomId].getFieldSize()
    }

    getRoomsIds() {
        return Object.keys(this._gameRooms)
    }
}

module.exports = Viruses
