const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  online: { //<-- para registrar si esta conectado
    type: Boolean,
    default: false
  }
})

// extraemos lo que manda MONGODB por defecto y asignamos uid en lugar de _id
UsuarioSchema.methods.toJSON = function(){
  const {__v, password, _id, ...usuario} = this.toObject();
  usuario.uid = _id;
  return usuario;
}

module.exports = model('Usuario', UsuarioSchema);