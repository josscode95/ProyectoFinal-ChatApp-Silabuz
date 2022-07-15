const Mensaje = require('../models/mensaje')

const obtenerChat = async(req, res) => {

  const miId = req.uid; // <--loggeado
  const mensajesDe = req.params.de; // <-- del que queremos los mensajes

  //obtenemos todos los mensajes que se han enviado en ambas vias 
  //$or es una expression para comparar resultados
  const last20 = await Mensaje.find({
      $or: [
        { de: miId, para: mensajesDe },
        { de: mensajesDe, para: miId }
      ]
    })
    .sort({createdAt: 'asc'}) // <--- lo ordenamos
    .limit(20) // <-- se limita el num de respuestas

  res.json({
    ok: true,
    mensajes: last20
  })

}

module.exports = {
  obtenerChat
}