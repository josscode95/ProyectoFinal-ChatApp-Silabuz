const mongoose = require('mongoose')

const dbConnection = async() => {
  try {
    await mongoose.connect(process.env.DB_MONGO)
    console.log('DB Online');
  } catch (error) {
    throw new Error('Error en la conexion a la base de datos')
  }
}

module.exports = dbConnection;