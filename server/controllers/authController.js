const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jsonWebToken');

const crearUsuario = async(req, res) => {
  try {

    const { email, password } = req.body;

    //verificzar que el email no exista
    const existeEmail = await Usuario.findOne({email})
    if(existeEmail){
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya existe'
      })
    }

    const usuario = new Usuario( req.body ); //<-- { email, password }

    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //guardar user en bd
    await usuario.save();

    //generar al JWT
    //se puede usar el _id de mongo o 'id' no hay problema
    const token = await generarJWT( usuario.id )

    res.json({
      ok: true,
      usuario,
      token
    })

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

const login = async(req, res) => {

  const { email, password } = req.body;
  
  try {
    
    const usuarioDB = await Usuario.findOne({email});

    //verificar si existe el correo
    if(!usuarioDB){
      return res.status(404).json({
        ok: false,
        msg: 'Email no encontrado'
      })
    }

    //validar el password
    const validPassword = bcrypt.compareSync(password, usuarioDB.password) // -> boolean
    if(!validPassword){
      return res.status(400).json({
        ok: false,
        msg: 'Password no es correcto'
      })
    }

    //generar el jwt
    const token = await generarJWT(usuarioDB.id)

    res.json({
      ok: true,
      usuario: usuarioDB,
      token
    })

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

const renewToken = async(req, res) => {

  //en req esta el uid del user loggeado
  const uid = req.uid;

  //generar un nuevo jwt
  const token = await generarJWT( uid )

  //obtener el usuario por ID
  const usuario = await Usuario.findById(uid);

  res.json({
    ok: true,
    token,
    usuario
  })

}

module.exports = {
  crearUsuario,
  login,
  renewToken
}