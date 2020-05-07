import Server from './classes/server';
import  router  from './routes/router';
import bodyParse from 'body-parser';
import cors from 'cors';



const server = Server.instance;

//bodyParse

server.app.use( bodyParse.urlencoded({ extended: true}));
server.app.use( bodyParse.json());

// CORS

server.app.use( cors({ origin: true, credentials: true }));


// Rutas del servisio
server.app.use('/', router);


server.start( () => {
    console.log(`Servidor conectado en el puerto: ${ server.port }`);
})