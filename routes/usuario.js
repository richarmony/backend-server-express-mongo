//Requires
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAuth = require('../middleware/auth');
// var SEED = require('../config/config').SEED;

//init variables
var app = express();

var Usuarios = require('../models/usuario');

// =====================================
// Obtener todos los usuarios
// =====================================
app.get('/', mdAuth.verifyToken, (req, res, next) => {
    Usuarios.find({}, 'nombre email img role')
        .exec(
            (err, usuarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuarios',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                        // body: body
                });

            });

});

// =====================================
// Actualizar usuario
// =====================================

app.put('/:id', mdAuth.verifyToken, (req, res) => {

    var id = req.params.id;
    var body = req.body; //recuperar la info del usuario

    // // de lo contrario usuarioGuardado, 201 es creado 
    // res.status(200).json({
    //     ok: true,
    //     id: id
    // });

    Usuarios.findById(id, (err, usuario) => {
        // si hay un error 
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con ID: ' + id + ' no existe',
                // errors: err
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }
        //Si no hubo problema en los IF anteriores, entonces guardar el usuario:
        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;
        // Pass y img se actualizan de otro modo:

        usuario.save((err, usuarioGuardado) => {
            // si hay un error 
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }
            usuarioGuardado.password = ':)';
            // Si no hay error, entonces actualizar usuario 200
            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado

            });
        });


    });

    //// Debug///
    // // de lo contrario usuarioGuardado, 201 es creado 
    // res.status(200).json({
    //     ok: true,
    //     id: id
    // });
    //// Debug///

});

// =====================================
// Crear un nuevo usuario
// =====================================
app.post('/', mdAuth.verifyToken, (req, res) => {

    var body = req.body;

    var usuario = new Usuarios({
        // nom
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {
        // si hay un error 
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el usuario',
                errors: err
            });
        }
        // de lo contrario usuarioGuardado, 201 es creado 
        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuarioToken: req.usuario
        });

    });


    // res.status(200).json({
    //     ok: true,
    //     body: body
    // });
});

// =====================================
// Borrar usuario por id
// =====================================

app.delete('/:id', mdAuth.verifyToken, (req, res) => {

    var id = req.params.id;
    Usuarios.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuario',
                errors: err
            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                // mensaje: 'El usuario con ID: ' + id + ' no existe',
                mensaje: 'No existe un usuario con ese Id',
                // errors: err
                errors: { message: 'No existe un usuario con ese Id' }
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});


module.exports = app;