//Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//init variables
var app = express();


// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


//importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');

// Conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('Base de Datos: \x1b[32m%s\x1b[0m,', 'online');
    })
    .catch((err) => {
        console.error(err);
    });

//Rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);

//escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m,', 'online');
})