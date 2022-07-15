const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

  try {
    //verificamos si el header trae el token
    const token = req.header('x-token');
    if(!token){
      return res.status(401).json({
        ok: false,
        msg: 'No hay token en la peticion'
      })
    }

    const payload = jwt.verify(token, process.env.JWT_KEY)
    req.uid = payload.uid;
    next();


  } catch (error) {
    
    res.status(401).json({
      ok: false,
      msg: 'Token no es valido o ha expirado'
    }) 

  }

}

module.exports = {
  validarJWT
}