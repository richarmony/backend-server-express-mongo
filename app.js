//Requires
var express = require('express');
var mongoose = require('mongoose');

//init variables
var app = express();

// Conexion a la base de datos
// mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
//     if (err) throw err;

//     console.log('Base de Datos: \x1b[32m%s\x1b[0,', 'online');

// });
// mongoose.connect('mongodb://localhost:27017/hospitalDB', { useNewUrlParser: true })
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', { useUnifiedTopology: true, useNewUrlParser: true })
    // mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', { useUnifiedTopology: true })
    .then(() => {
        console.log('Base de Datos: \x1b[32m%s\x1b[0m,', 'online');
    })
    .catch((err) => {
        console.error(err);
    });

//Rutas
app.get('/', (req, res, next) => {
    res.status(403).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    })
});

//escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m,', 'online');
})