const express = require('express')
const app = express()
const http = require('http').Server(app)
const bodyParser = require('body-parser')
const router = require('./controller')
require('./models')

http.listen(3330, function () {
  console.log('listening on 3330')
})
bodyParser.urlencoded({
  extended: true
})

app.use(bodyParser.json())
app.use(router)
var multer, storage, path, crypto
multer = require('multer')
path = require('path')
crypto = require('crypto')

// Include the node file module
var fs = require('fs');

var form = "<!DOCTYPE HTML><html><body>" +
  "<form method='post' action='/upload' enctype='multipart/form-data'>" +
  "<input type='file' name='upload'/>" +
  "<input type='submit' /></form>" +
  "</body></html>";

app.get('/backupload', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(form);

});

storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    return crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) {
        return cb(err);
      }
      return cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
    });
  }
});


// Post files
app.post(
  "/upload",
  multer({
    storage: storage
  }).single('upload'), function (req, res) {
    var name = req.file.filename
    console.log(req.file);
    console.log(req.body);
    console.log(name);
    return res.status(200).json({
      url: name
    }).end()
  });

app.get('/uploads/:upload', function (req, res) {
  file = req.params.upload;
  console.log(req.params.upload);
  var img = fs.readFileSync(__dirname + "/uploads/" + file);
  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.end(img, 'binary');

});

//Image Getter
app.get('/images/:url', (req, res) => {
  res.sendFile(__dirname + "/images/" + req.params.url)
})


//Chat
//Global Definition for Random Chat
var queue = [];    // list of sockets waiting for peers
var rooms = {};    // map socket.id => room
var names = {};    // map socket.id => name
var allUsers = {}; // map socket.id => socket


//End Global Definition for Random Chat
io = require('socket.io').listen(http)
app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/chat/index.html')
})
io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('join', function (roomId, userNickname) {
    socket.join(roomId)
    socket.userNickname = userNickname
    socket.roomId = roomId
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

  socket.on('disconnect', function () {
    console.log(socket.userNickname + ' is left the chat, boardcasted to ' + socket.roomId)
    socket.broadcast.to(socket.roomId).emit('userdisconnect', socket.userNickname + ' is left the chat')


  })

  //Random Chat
  socket.on('login', function (data) {
    console.log("queue length: " + queue.length)
    console.log(data + " is Coming");
    names[socket.id] = data;
    allUsers[socket.id] = socket;
    findPeerForLoneSocket(socket);
  });
  socket.on('message', function (data, senderNickname) {
    var room = rooms[socket.id];
    let pesan = { "message": data, "senderNickname": senderNickname }
    console.log(senderNickname + ": " + data + " broadcasted to " + room)
    io.to(room).emit('message', pesan);
  });
  socket.on('leave room', function () {
    console.log("leave the room, rooms= " + rooms)
    console.log("queue length: " + queue.length)
    var room = rooms[socket.id];
    socket.broadcast.to(room).emit('chat end');
    var peerID = room.split('#')
    peerID = peerID[0] === socket.id ? peerID[1] : peerID[0];
    findPeerForLoneSocket(allUsers[peerID]);
    // findPeerForLoneSocket(socket);
  });
})
var findPeerForLoneSocket = function(socket) {
  if (queue.length != 0) {
      var peer = queue.pop();
      var room = socket.id + '#' + peer.id;
      peer.join(room);
      socket.join(room);
      rooms[peer.id] = room;
      console.log("rooms[peer.id] = rooms[socket.id] = " + room)
      rooms[socket.id] = room;
      peer.emit('chat start', {'name': names[socket.id], 'room':room});
      socket.emit('chat start', {'name': names[peer.id], 'room':room});
  } else {
      queue.push(socket);
  }
  console.log("===========\nqueue length: " + queue.length)
  console.log("Rooms: " + rooms + "\n=================")
}