var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '*{VALUE}* no es un rol permitido'
}

var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'El email es necesario'] },
    password: { type: String, required: [true, 'El password es necesario'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos },
});

// usuarioSchema.plugin(uniqueValidator, { message: 'el correo debe ser único' }); //Si solo tenemos un atributo único
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' }); //cuando tenemos más de un atributo único

module.exports = mongoose.model('Usuario', usuarioSchema);