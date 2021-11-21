require('module-alias/register')

const express = require('express');
const app = express();
var server = require('http').createServer(app);  
var io = require('socket.io')(server, {
    cors: {
      origin: '*'
    }
})

const Viruses = require("@models/Viruses.js")
const PlayerController = require("@controllers/PlayerController.js")
const GameController = require("@controllers/GameController.js")
const ChatController = require("@controllers/ChatController.js")

const virusesGame = new Viruses()

const playerController = new PlayerController(virusesGame)
const gameController   = new GameController(virusesGame, io)
//const chatController   = new ChatController(virusesGame)

io.on('connection', (socket) => {
    playerController.onConnection()

    socket.on('game:getRooms', (callback) => {
        playerController.onGetRooms(callback)
    })

    socket.on('game:createGame', (data, callback) => {
        playerController.onCreateGame(socket, data, callback)
    })

    socket.on('game:connectToRoom', (data, callback) => {
        playerController.onConnectToRoom(socket, data, callback)
    })

    socket.on('game:start', (callback) => {
        gameController.onStart(socket, callback)
    })

    socket.on('game:getState', (callback) => {
        gameController.getState(socket, callback)
    })

    socket.on('game:step', (data) => {
        gameController.onStep(socket, data)
    })

    /*socket.on('game:getShopData', (data, callback) => {
        gameController.onGetShopData(data, callback)
    })

    socket.on('game:shopTransaction', (data, callback) => {
        gameController.onShopTransaction(data, callback)
    })

    socket.on('chat:message', (data) => {
        //chatController.onChatMessage(socket, data)
    })*/
})

server.listen(5001)
