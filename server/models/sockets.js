const { 
  usuarioConectado, 
  usuarioDesconectado, 
  getUsuarios, 
  grabarMensaje 
} = require("../controllers/socketsController");

const { comprobarJWT } = require("../helpers/jsonWebToken");

class Sockets {

  constructor( io ) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents(){
    // socket = cliente donde se conecto
    this.io.on('connection', async(socket) => {

      //gracias al token sabemos que usuario esta conectado
      const [ valido, uid ] = comprobarJWT( socket.handshake.query['x-token'] ); //<-- query mandado desde el front

      if( !valido ){
        console.log('socket no identificado');
        return socket.disconnect();
      }

      await usuarioConectado( uid ) // <-- mandar a la bd que esta conectado

      //emitir todos los usuarios conectados
      this.io.emit('lista-usuarios', await getUsuarios())
      
      //unir al usuario a una sala de socketio
      socket.join( uid ); // <-- unir a una sala con su ID 'sdjfhjsdfh21342345'

      //escuchar cuando el cliente manda un mensaje personal
      socket.on('mensaje-personal', async(payload) => {
        const mensaje = await grabarMensaje( payload )
        this.io.to(payload.para).emit('mensaje-personal', mensaje)
        this.io.to(payload.de).emit('mensaje-personal', mensaje)
      })

      //emitir todos los usuarios conectados
      socket.on('disconnect', async() => {
        await usuarioDesconectado( uid )
        this.io.emit('lista-usuarios', await getUsuarios()) //<-- actualizar que salio un usuario
      })
      
    });
  }

}

module.exports = Sockets;