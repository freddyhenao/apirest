// paquete express
// inicialia el servidor y permite el uda de las funciones get , put , past ,delete
const express = require('express');
const app = express();

//paquete body-parser
// instalacion local del paquete bodyParser sirve para enviar paquetes de grantanmaño por el http
// resibe datos por el  body de la peticion 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Using Node.js `require()`
// conexion con la base de datos Mongo
const mongoose = require('mongoose');

// conexion con HEROKU

const puerto = process.env.PORT || 3000;

// Importemos y usemos app de express () paquetes propios
 app.use(require('./controladorReservas'));


// https://mongoosejs.com/docs/connections.html 
// documentacion oficial de mongoose
mongoose.connect('mongodb://localhost:27017/dbreservas', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Establecemos la conexion con la base de datos 
mongoose.connection
  .once('open', ()=>console.log("Estas Conectado a la DB."))
  .on('error',(error) =>{console.log("Error",error)});
// callback
// Establesemos la conexion con el servidor que tiene los servicios 
app.listen(3000, ()=>{
        console.log("Servidor Encendido en el puerto 3000");
})

// req: peticion
//res: respueseta 