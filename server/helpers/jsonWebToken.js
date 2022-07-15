const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {

  //lo hacemos con una promesa para que aL ser llamado o hagamos async
  return new Promise((resolve, reject) => {
    const payload = { uid }
    jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '24h', //expira en
    }, (err, token) => {
      if(err){
        reject('No se pudo generar el JWT')
      }else{
        resolve(token)
      }
    })
  })

}

const comprobarJWT = ( token = '' ) => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY) // <-- regresa lo que pusimos en el token 
    return [ true, uid ] // <-- como array para que lo regrese ordenado si mandamos como objeto se desordenara el indexado
  } catch (error) {
    return [ false, null ]
  }
}

module.exports = {
  generarJWT,
  comprobarJWT
}