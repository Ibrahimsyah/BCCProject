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