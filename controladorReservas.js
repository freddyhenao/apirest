// paquete express
// inicialia el servidor y permite el uda de las funciones get , put , past ,delete
const express = require("express");
const app = express();

//paquete body-parser
// instalacion local del paquete bodyParser sirve para enviar paquetes de grantanmaño por el http
// resibe datos por el  body de la peticion
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Paquete modelo (importa el esquema desde el modelo )
const ReservaModelo = require("./modeloReserva");

// Paquete de underscore
let under= require('underscore');

// OPERACIONES DEL API
// get traer
app.get("/reservas", function (peticion, respuesta) {
  respuesta.json({ respuesta: "soy unar respusta GET" });
});
// insertar datos  post (AÑADIR O CREAR)
app.post("/reservas", function (peticion, respuesta) {
      //    VALIDACION
      // 1. se traen los datos del cliente API
      let datos = peticion.body;
      console.log(datos)
      //2. Armo el objeto de acuardo al esquema
      let reservaAGuardar = new ReservaModelo({

        nombre: datos.nombre,
        apellido: datos.apellido,
        telefono: datos.telefono,
        fechaInicioReserva: datos.fechaInicioReserva,
        fechaFinReserva: datos.fechaFinReserva,
        numeroDePersonas: datos.numeroDePersonas,
        tipoDePaquete: datos.tipoDePaquete

      });
      // 3. guardar datos con la funcion save
      reservaAGuardar.save((err,resultado)=>{

        if(err){

          respuesta.status(400).json({
              mensaje: err,
              estado: false,
              mensaje: "Debe de llenarse todos los campos"
          })

        }else{
            respuesta.json({
              mensaje: "Reserva agregado con exito"
              
            })
        }
          
      });

 // respuesta.json({ respuesta: "soy unar respusta POST" });

});
// actualizar datos  put (ACTUALIZAR)
app.put("/reservas/:id", function (peticion, respuesta) {

  //1. Recibir los datos que voy ha actualizar
  let datos = peticion.body;

  //2. Filtra los datos con underScore()
  let datosActualizar = under.pick(datos,["nombre","apellido","telefono","fechaInicioReserva","fechaFinReserva","numeroDePersonas","tipoDePaquete"]);
  let identificador = peticion.params.id;
  respuesta.json({ respuesta: "Desea Editar la  Reserva : " + identificador });

  //3. Recibir el indicador el id  o identificador del documento(objeto a actualizar)
  let identificador = peticion.params.id;

  //4. Ejecutar la operacion para actualizar 
  ReservaModelo.findByIdAndDelete(identificador,datosActualizar,(err,resultado)=>{});
});
// borrar datos  delete
app.delete("/reservas/:id", function (peticion, respuesta) {
  let identificador = peticion.params.id;
  respuesta.json({ respuesta: "Desea Eliminar la Reserva " + identificador });
});
module.exports = app;
