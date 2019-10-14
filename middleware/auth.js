var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

// =====================================
// Verificar Token (Middleware)
// =====================================

exports.verifyToken = function(req, res, next) {

    var token = req.query.token;
    jwt.verify(token, SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                // mensaje: 'El usuario con ID: ' + id + ' no existe',
                mensaje: 'Token no valido',
                errors: err
            });
        }
        req.usuario = decoded.usuario;
        next(); //Le da chance de seguir con las siguientes funciones :D
        // res.status(299).json({
        //     ok: true,
        //     decoded: decoded
        // });

    });

}

// app.use('/', (req, res, next) => {});