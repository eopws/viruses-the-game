import httpServer from "@server/http"
import sockets from "socket.io"
import { VirusesModel } from "@models"
import { playerController } from "@controllers"

httpServer.listen(5000);

sockets.listen(5001);

const viruses = new VirusesModel();

sockets.on('connection', (socket) => {
    socket.on('game:getRooms', viruses.getRooms());
    socket.on('game:createGame', (data) => playerController.onConnection(socket, data));
    socket.on('game:connectToRoom', (data) => playerController.onConnection(socket, data));
    socket.on('game:step', (data) => playerController.onStep(socket, data));
    socket.on('game:getShopData', (data) => playerController.onGetShopData(socket, data));
    socket.on('game:shopTransaction', (data) => playerController.onShopTransaction(socket, data));
    socket.on('chat:message', (data) => playerController.onChatMessage(socket, data))
})
