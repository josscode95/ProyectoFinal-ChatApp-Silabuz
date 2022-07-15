const { Schema, model } = require('mongoose')

const MensajeSchema = Schema({
  de: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  para: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  mensaje: {
    type: String,
    required: true
  }
}, {
  timestamps: true //fecha de creacion y ultima modificacion
})

MensajeSchema.methods.toJSON = function(){
  const { __v, ...object } = this.toObject();
  return object;
}

module.exports = model('Mensaje', MensajeSchema);