const express = require('express')
const app = express()
const http = require('http').Server(app)
const bodyParser = require('body-parser')
const router = require('./controller')
require('./models')

http.listen(3330, function(){
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

app.get('/backupload', function (req, res){
    res.writeHead(200, {'Content-Type': 'text/html' });
    res.end(form);
  
  });
  
  storage = multer.diskStorage({
      destination: './uploads/',
      filename: function(req, file, cb) {
        return crypto.pseudoRandomBytes(16, function(err, raw) {
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
    }).single('upload'), function(req, res) {
        var name = req.file.filename
      console.log(req.file);
      console.log(req.body);
      console.log(name);
      return res.status(200).json({
        url: name
      }).end()
    });
  
  app.get('/uploads/:upload', function (req, res){
    file = req.params.upload;
    console.log(req.params.upload);
    var img = fs.readFileSync(__dirname + "/uploads/" + file);
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');
  
  });