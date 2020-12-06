const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// instalacion local del paquete bodyParser sirve para enviar paquetes de grantanmaño por el http
// resibe datos desde el body de la peticion 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


 // traer datos get
app.get('/reservas', function (peticion , respuesta) {
  respuesta.json({respuesta:'soy unar respusta GET'})
});
// insertar datos  post
app.post('/reservas', function (peticion , respuesta) {
    let datos = peticion.body;
    //    VALIDACION 
    if (datos.nombre == undefined) {
      respuesta.status(400).json({
        mensaje: "El parametro Nombre es necesario",
      });
    }
    
    else {
      respuesta.json({ reserva: datos });
  }

});
// actualizar datos  put
app.put('/reservas/:id', function (peticion , respuesta) {
  let: identificador=peticion.params.id;
  respuesta.json({respuesta:'Desea Editar la  Reserva : '+identificador})
});
// borrar datos  delete 
app.delete('/reservas', function (peticion , respuesta) {
  respuesta.json({respuesta:'Desea Eliminar la Reserva '+identificador})
});
// callback
app.listen(3000, ()=>{
        console.log("Servidor Encendido en el puerto 3000");
})

// req: peticion
//res: respueseta 