const express = require('express')
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const dbConnection = require('../database');
const Sockets = require('./sockets');

class Server {

  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    dbConnection();
    this.server = http.createServer(this.app);
    this.io = socketio(this.server);
  }

  middlewares(){
    this.app.use(cors());
    this.app.use(express.json())
    this.app.use('/api/login', require('../router/auth'))
    this.app.use('/api/mensajes', require('../router/mensajes'))
  }

  configurarSockets(){
    new Sockets( this.io )
  }

  main(){
    this.middlewares();
    this.configurarSockets();
    this.server.listen(this.port, () => {
      console.log('Server corriendo en el puerto: ', this.port);
    });
  }

}

module.exports = Server;