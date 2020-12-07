// Using Node.js `require()`
// conexion con la base de datos Mongo
const mongoose = require('mongoose');

// definir el esquema (estructura que tendra nuetra coleccion)
let esquemaReserva = new mongoose.Schema({
    nombre: {
        type: String,
        required:[true,'El nombre es necesario para la API']
    },
    apellido:{
        type: String,
        requered:[true, 'El apellido es necesario para la API']
    },
    telefono:{
        type: Number,
        requered:[true, 'El telefono es necesario para la API']
    },
    fechaInicioReserva:{
        type: String,
        requered: [true, 'La fecha de inicio de la reserva es necesario para la API']
    },
    fechaFinReserva:{
        type: String,
        requered: [true, 'La fecha de fin de la reserva es necesario para la API']
    },
    numeroDePersonas:{
        type: Number,
        requered:[true, 'El numero de personas para la reserva es necesario para la API']
    },
    tipoDePaquete:{
        type: String,
        requered:[true, 'El tipo de paqueta  tipoDePaquete es necesario para la API']
    }

});

module.exports = mongoose.model('modeloReserva', esquemaReserva );