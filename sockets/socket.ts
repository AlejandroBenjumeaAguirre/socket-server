import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';




export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket ) => {
    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );
}


export const desconectar = ( cliente: Socket) => {
    cliente.on( 'disconnect', () =>{
        console.log('Cliente desconectado');

    usuariosConectados.eliminarUsuario( cliente.id );
    
    })
}


export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on( 'mensaje', (payload: { de: String, cuerpo: String }) => {
        console.log('Mensaje recibido', payload);
        
        io.emit('mensaje-nuevo', payload );
    });

}

export const ConfigurandoUsuario = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on( 'configurar-usuario', ( payload, callback: Function ) => {

        usuariosConectados.actualizarNombre( cliente.id, payload );

        callback({
            ok: true,
            mensjae: `Usuario ${ payload } esta configurado `
        })
       /*  io.emit( 'configurando usuario', payload.nombre ); */
    });
}