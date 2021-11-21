const httpServer = require("http").createServer()

const io = require("socket.io")(httpServer, {
    cors: {
        origin: '*',
    }
})

io.on("connection", (socket) => {
    socket.on('getRooms', (callback) => {
        callback({
            '3ngfpo21a42sdg365': {
                name: 'Test Room',
                creator: 'sneaky',
                currentPlayers: 2,
                allPlayers: 3,
                fieldW: 500,
                fieldH: 100,
            },
            'fwq[t8l2tjp': {
                name: 'Cool Room',
                creator: 'xareyli',
                currentPlayers: 1,
                allPlayers: 4,
                fieldW: 600,
                fieldH: 800,
            },
            'weryopw33': {
                name: 'Bitches',
                creator: 'daddy',
                currentPlayers: 3,
                allPlayers: 4,
                fieldW: 1000,
                fieldH: 5000,
            }
        })
    })
})

httpServer.listen(5001)
