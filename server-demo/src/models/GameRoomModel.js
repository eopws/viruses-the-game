

class GameRoomModel {
    roomId  = 851513;

    players = {
        id: {
            nickname: 'xareyli',
            avatar: 'afgdsgt0ww304-235.png',
            money: 200, // грывень гыгы
            unit: {
                unitId: count,
                // tesla: 12 for example
            }
        }, 
        id: {

        }, 
        id: {

        }};

    fieldSize = '600:900'; // w:h

    turn = playerId

    fieldViruses = {
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

    step(player, data) {
        // complicated stuff is here

        if (this.hasAdjacents(player, data.x, data.y)) {
            return thePlayerDidItRight;
        }

        return thePlayerDidItWrong;
    }

    _hasAdjacents(player, row, col) {
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
    }
}
