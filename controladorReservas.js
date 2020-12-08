// paquete express
// inicialia el servidor y permite el uda de las funciones get , put , past ,delete
const express = require("express");
const app = express();
// habilita el uso o no de nuetra API
var cors = require('cors');

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
const { findById } = require("./modeloReserva");

// OPERACIONES DEL API

// acceso global a cors
app.use(cors());

// se consulta a la base de datos todos los aocumentos de reserva
pp.get("/reservas/all", function (peticion, respuesta) {

  //2. Ejecutar la operacion de mongoose pra buscar los  documento po id
  ReservaModelo.find({})
  .exec((err, resultado)=>{
        if(err){

          respuesta.status(400).json({
            mensaje: err,
            estado: false,
          });

        } else{
          respuesta.json({
            reserva: resultado
          });
        }
  });

});
// get traer (TRAER) informacion de una reserva
app.get("/reserva/:id", function (peticion, respuesta) {

  //1. recibir el id del documento a buscar en la coloeccion 
  let identificador=peticion.params.id;

  //2. Ejecutar la operacion de mongoose pra buscar un documento po id
  ReservaModelo.findById(identificador,(err, resultado)=>{
        if(err){

          respuesta.status(400).json({
            mensaje: err,
            estado: false,
          });

        } else{
          respuesta.json({
            reserva: resultado
          });
        }
  });

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
  respuesta.json({ respuesta: " Reserva  Editada Exitosamente: " + identificador });

  //3. Recibir el indicador el id  o identificador del documento(objeto a actualizar)
  

  //4. Ejecutar la operacion para actualizar datos (1. id a actualizar 2. datos a actualizar 3. callback para el manejo de error)
  ReservaModelo.findByIdAndDelete(identificador,datosActualizar,(err,resultado)=>{
      if(err){
          respuesta.status(400).json({
            mensaje: err,
            estado: false,
            mensaje: "Error al Editar la Reserva"
        });

        respuesta.json
      }else{
          respuesta.json({
            mensaje: "La reserva a se ha Actualizado Exitosamente"
          });

      }
      
    });
});
// borrar datos  delete
app.delete("/reservas/:id", function (peticion, respuesta) {

  // 1. Recibir el id del documento a eliminar
  let identificador = peticion.params.id;

  // 2. ejecutar la funcion de mongoose eliminar un documento de una coleccion 
  ReservaModelo.findByIdAndRemove(identificador,(err,resultado)=>{

      if(err){

        respuesta.status(400).json({
          mensaje: err,
          estado: false,

        });

      } else{
          respuesta.json({mensaje:"Reserva Eliminada con Exito de la BD"})

      }

  });
  
});
module.exports = app
