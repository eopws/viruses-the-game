import GameRoomService from "@services/GameRoomService"

class GameRoomModel {
    _players = {
        /*id: {
            nickname: 'xareyli',
            avatar: 'afgdsgt0ww304-235.png',
        }, 
        id: {

        }, 
        id: {

        }*/
    };

    _playersPrivateData = {};

    _gameStarted = false;

    /*_fieldViruses = {
        '0': {
            '0': {
                belongsTo: 4325354,
                destroyed: false,
                virus: 'tesla:wing',
            },
            '1': {
                belongsTo: -1,
                destroyed: false,
                virus: 'none',
            },
            '2': {
                belongsTo: 4325354,
                destroyed: false,
                virus: 'tesla:wing',
            }
        },

        '1': {
            '0': {
                belongsTo: -1,
                destroyed: false,
                virus: 'none',
            },
            '1': {
                belongsTo: 4325354,
                destroyed: false,
                virus: 'tesla:heart',
            },
            '2': {
                belongsTo: -1,
                destroyed: false,
                virus: 'none',
            }
        },

        '2': {
            '0': {
                belongsTo: 4325354,
                destroyed: false,
                virus: 'tesla:wing',
            },
            '1': {
                belongsTo: -1,
                destroyed: false,
                virus: 'none',
            },
            '2': {
                belongsTo: 4325354,
                destroyed: false,
                virus: 'tesla:wing',
            }
        }
    };
*/

    constructor(gameRoomId, gameRoomData) {
        this._roomId     = gameRoomId
        this._fieldSizeW = gameRoomData.fieldW
        this._fieldSizeH = gameRoomData.fieldH
        this._maxPlayers = gameRoomData.playersCount
        this._roomName   = gameRoomData.name

        this._service = new GameRoomService(this)
    }

    connectPlayer(socket, playerData) {
        const isRoomFull = Object.keys(this._players).length === this._maxPlayers

        if (!isRoomFull) {
            // if the player is the first player than he is a master
            let isPlayerMaster = Object.keys(this._players).length === 0

            this._players[socket.id] = {
                nickname: playerData.nickname,
                playersVirus: playerData.virusIcon,
                avatar: playerData.avatar,
                master: isPlayerMaster,
            }

            this._playersPrivateData[socket.id] = {
                nickname: playerData.nickname,
                avatar: playerData.avatar,
            }
        }

        return !isRoomFull
    }

    startGame(initiatorId) {
        const masterId = Object.keys(this._players).find((playerId) => this._players[playerId].master)

        // only game's master can start game
        /* if (masterId !== initiatorId) {
            return false
        }*/

        if (Object.keys(this._players).length === this._maxPlayers) {
            this._gameStarted = true
            this.initField()
        }

        return this._gameStarted
    }

    initField() {
        this._fieldViruses = {}

        const maxRow = Math.floor(this._fieldSizeH / 20)
        const maxCol = Math.floor(this._fieldSizeW / 20)

        for (let row = 0; row < maxRow; row++) {
            this._fieldViruses[row] = {}

            for (let col = 0; col < maxCol; col++) {
                this._fieldViruses[row][col] = {
                    belongsTo: -1,
                    destroyed: false,
                    virus: 'empty',
                }
            }
        }

        const playersIds = Object.keys(this._players)

        const rows = [0, maxRow - 1]
        const cols = [maxCol - 1, 0]

        let player = 0

        setPlayersToCorners:
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                if (!playersIds[player]) {
                    break setPlayersToCorners
                }

                this._fieldViruses[rows[j]][cols[i]] = {
                    belongsTo: playersIds[player],
                    destroyed: false,
                    virus: 'std',
                }

                player++
            }
        }
    }

    getField() {
        return this._fieldViruses
    }

    getFieldSize() {
        return {
            width: this._fieldSizeW,
            height: this._fieldSizeH,
        }
    }

    step(playerId, stepData) {
        const stepHappened = this._service.step(playerId, stepData)

        return stepHappened
    }

    /*_hasAdjacents(player, row, col) {
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (row + i < 0) continue;
                if (col + j < 0) continue;

                if (!this.fieldViruses[row + i]) continue;
                if (!this.fieldViruses[row + i][col + j]) continue;

                // here we can recursively go through all walls to active virus
                if (this.fieldViruses[row + i][col + j].belongsTo === player.id) {
                    return true;
                }
            }
        }
    }

    playerBuysUnit(player, data) {
        if (player.money >= units[data.unitId].cost) {
            player.money -= units[data.unitId].cost;
            player.units[data.unitId]++;
        }
    }*/

    getPlayersInRoom() {
        return this._players
    }

    getGameRoomInfo() {
        const masterId = Object.keys(this._players).find((playerId) => this._players[playerId].master)

        return {
            name: this._roomName,
            fieldW: this._fieldSizeW,
            fieldH: this._fieldSizeH,
            roomId: this._roomId,
            maxPlayers: this._maxPlayers,
            connectedPlayers: this._players,
            master: this._players[masterId]
        }
    }
}

module.exports = GameRoomModel
