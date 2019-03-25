const express = require('express')
http = require('http')
app = express()
server = http.Server(app)
io = require('socket.io').listen(server)
app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('join', function (roomId, userNickname) {
        socket.join(roomId)
        socket.userNickname = userNickname
        socket.roomId = roomId
        socket.count++
        console.log(userNickname + " has joined the chat in room " + roomId)
        socket.broadcast.to(roomId).emit('userjoinedthechat', userNickname + " has joined the chat")
    })


    socket.on('messagedetection', (roomId, senderNickname, message) => {
        //log message
        console.log(senderNickname + " : " + roomId + " : " + message)

        let pesan = { "message": message, "senderNickname": senderNickname }

        io.to(roomId).emit('message', pesan) //emit JSON message
        io.to(roomId).emit('messagedetection', senderNickname, message);
    })

    socket.on('disconnect', function (roomId, userNickname) {
        console.log(socket.userNickname + ' is left the chat, boardcasted to ' + socket.roomId)
        socket.broadcast.to(socket.roomId).emit('userdisconnect', socket.userNickname + ' is left the chat')
    })
})