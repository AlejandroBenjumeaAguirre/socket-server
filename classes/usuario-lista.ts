import { Usuario } from './usuario';


export class UsuariosLista {

    public lista:Usuario[] = [];

    constructor() {    }

    // Agregar usuario a la lista de usuarios

    public agregar( usuario: Usuario ){

        this.lista.push( usuario );
        console.log(usuario);
        return usuario
    }

    // Actualizar el nombre del usuario

    public actualizarNombre( id: string, nombre: string ) {

        for( let usuario of this.lista ) {

            if( usuario.id === id ) {

                usuario.nombre = nombre;
                break;

            }
        }

        console.log('=== Actualizando usuario');
        console.log(this.lista);

    }

    // Obtener la lista de susuarios agregados a la lista

    public getLista(){
        this.lista;
    }
  
    //Obtener usuario
    public getUsuario( id: string ){
        this.lista.find( usuario => usuario.id === id  );
    }

    //Obtener usuarios de una sala
    public usuarisSala( sala: string ){
        this.lista.filter( usuario => usuario.sala === sala );
    }

    public eliminarUsuario( id: string ){

        const tempUsuario = this.getUsuario( id );

        this.lista = this.lista.filter( usuario => usuario.id === id );

        return tempUsuario;
    }


}