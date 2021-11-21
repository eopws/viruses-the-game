import { VirusesModel } from "@models"

class PlayerController {
    onConnection(player, data) {
        const { gameId } = data;

        if (gameId != null) {
            const isConnected = VirusesModel.connectPlayerToRoom(player, gameId);

            if (isConnected) {
                player.send('Debil, ti podkluchilsa');
            } else {
                player.send('Ne pravilniy room id');
            }
        } else {
            VirusesModel.createRoom(player, data); // player with room config
        }
    }

    onStep(player, data) {
        const { gameId } = data;

        if (!gameId) {
            return;
        }

        const stepCorrect = VirusesModel.step(player, gameID, data);

        if (stepCorrect) {
            const step = {
                playerId: player.id,
                data,
            }

            io.sockets.in(gameId).emit('step', step);
        }
    }
}

export default new PlayerController
