const express = require('express');
var cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {
    
    constructor(){
        //propiedades de nuestra clase
        this.app = express();
        this.port = process.env.PORT || 3000;

        //Configurando socket.io
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {}


        //Middlewares
        this.middlewares();

        //llamamos al metodo rutas para inicializarlas
        this.routes();

        //Manejo de eventos por sockets
        this.sockets();
    }

    middlewares(){
        // con app.use indicamos que lo siguiente es un middleware
        
        //CORS
        this.app.use( cors() );
        
        // ademas con express.static indicamos que deseamos publicar (En este caso la carpeta public su index)
        this.app.use( express.static('public') );

    }

    routes() {
        // el primer argumento representa el path principal
        //el segundo argumento son las otras opciones que tendra el path principal

        // this.app.use(this.paths.usuario, require('../routes/usuarios.routes.js'))

    }

    sockets() {
        //Escuchando cuando un socket se conecta (un clinte)
        this.io.on('connection', socketController)

    }

    listen(){ 
        /**
         * este es el metodo que hay que llamar en el app.js
         * para que la aplicacion se empiece a ejecutar
         * en el puerto definidio
         */
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        } );
    }

}

module.exports =  Server;