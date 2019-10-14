//Requires
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// var SEED = require('../config/config').SEED;
var SEED = require('../config/config').SEED;

//init variables
var app = express();
var Usuarios = require('../models/usuario');

app.post('/', (req, res) => {

    var body = req.body;

    Usuarios.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales Incorrectas - email', //#TODO: quitar "- email" cuando se convierta en producción
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales Incorrectas - password', //#TODO: quitar "- password" cuando se convierta en producción
                errors: err
            });
        }
        usuarioDB.password = ':D';
        //Crear un token!!!
        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }); //expira en 4 hrs

        res.status(200).json({
            ok: true,
            // mensaje: 'Login post correcto',
            // body: body,
            usuario: usuarioDB,
            id: usuarioDB._id,
            token: token
        });
    });


})



module.exports = app;