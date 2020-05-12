import express from 'express';
import { SERVER_PORT } from '../globals/enviroment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';


export default class Server {

    private static _instace: Server;
    
    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpserver:  http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        this.httpserver = new http.Server( this.app );
        this.io         = socketIO( this.httpserver );

        this.escucharSocket();

    }

    public static get instance() {

       return this._instace || ( this._instace = new this() );

    }


    private escucharSocket () {

        console.log('Escuchando conecciones');

        this.io.on( 'connection', cliente =>{

            /* console.log('cliente conectado'); */

            //conectar cliente
            socket.conectarCliente( cliente, this.io );

             //Configurar usuario
            socket.ConfigurandoUsuario(cliente, this.io);

            // Obtener usuario activos
            socket.obtenerUsuarios( cliente, this.io );

            //desconección
            socket.desconectar( cliente, this.io );

            //Mensaje
            socket.mensaje(cliente, this.io );

           

        });

    }

    start( callback: Function ) {
        
        this.httpserver.listen( this.port, callback );
    }
}