const express = require('express')
const app = express()
const posts = require('./posts')

app.use(posts)

module.exports = app