export class Usuario {
    nombre: string;
    apellidoUno: string;
    apellidoDos: string;
    role: string;
    email: string;
    pass: string;

    key$?: string;
}

export class CredencialesUsuaio {
    email: string;
    password: string;
    returnSecureToken: boolean;
}


export class Ruta {
    origen: string;
    latO: number;
    altO: number;
    destino: string;
    latD: number;
    altD: number;
    duracion: string;
    distancia: string;
    activa: boolean;
}
