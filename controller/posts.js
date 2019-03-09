const express = require('express')
const app = express()
const conn = require('../models')

app.get('/temankerja', async (req, res) => {
    try {
        let posts = await conn.models.TemanKerja.findAll()
        res.status(200).json({
            is_ok: true,
            posts
        })
    } catch (err) {
        err.status(500).json({
            is_ok: false,
            error: err
        })
    }
})

//Fungsi untuk POST
app.post('/temankerja', async (req, res) => {  //jika user access localhost:3000/posts 
    console.log('items: ', req.body)
    try {
        await conn.models.TemanKerja.create(req.body)  //write data sesuai request
        res.status(201).json({
            is_ok: true,
        })
    } catch (err) {
        err.status(500).json({
            is_ok: false,
            error: err
        })
    }
})


//Fungsi untuk PATCH /update
app.patch('/temankerja/update/:id', async (req, res) => {  //jika user access localhost:3000/update/:id
    try {
        await conn.models.TemanKerja.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }
        )
        res.status(201).json({
            is_ok: true,
        })
    } catch (err) {
        err.status(500).json({
            is_ok: false,
            error: err
        })
    }
})
app.delete('/temankerja/delete/:id', async (req, res) => {  //jika user access localhost:3000/delete/:id 
    try {
        await conn.models.TemanKerja.destroy( //perintah untuk destory row
            {
                where: {
                    id: req.params.id  //dimana id row sesuai url
                }
            }
        )
        res.status(204).json({
            is_ok: true,
        })
    } catch (err) {
        err.status(500).json({
            is_ok: false,
            error: err
        })
    }
})


//AKUN
app.get('/acc', async (req, res) => {
    try {
        let posts = await conn.models.Account.findAll()
        res.status(200).json({
            is_ok: true,
            posts
        })
    } catch (err) {
        err.status(500).json({
            is_ok: false,
            error: err
        })
    }
})

//Fungsi untuk POST
app.post('/acc', async function (req, res) {  //jika user access localhost:3000/posts 
    console.log('items: ', req.body)
    try {
        await conn.models.Account.create(req.body)  //write data sesuai request
        res.status(201).json({
            is_ok: true,
        })
    } catch (err) {
        err.status(500).json({
            is_ok: false,
            error: err
        })
    }
})

//Authentication
app.get('/acc/auth/:uname', async (req, res) => {  //jika user access localhost:3000/update/:id
    try {
        let result = await conn.models.Account.findAll(
            {
                where: {
                    username: req.params.uname
                }
            }
        )
        res.status(201).json({
            result
        })
    } catch (err) {
        err.status(500).json({
            is_ok: false,
            error: err
        })
    }
})

//Fungsi untuk PATCH /update
app.patch('/acc/update/:id', async (req, res) => {  //jika user access localhost:3000/update/:id
    try {
        await conn.models.Account.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }
        )
        res.status(201).json({
            is_ok: true,
        })
    } catch (err) {
        err.status(500).json({
            is_ok: false,
            error: err
        })
    }
})
app.delete('/acc/delete/:id', async (req, res) => {  //jika user access localhost:3000/delete/:id 
    try {
        await conn.models.Account.destroy( //perintah untuk destory row
            {
                where: {
                    id: req.params.id  //dimana id row sesuai url
                }
            }
        )
        res.status(204).json({
            is_ok: true,
        })
    } catch (err) {
        err.status(500).json({
            is_ok: false,
            error: err
        })
    }
})
module.exports = app