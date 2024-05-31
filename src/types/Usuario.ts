import { Rol } from "./enum/Rol";

export default interface Usuario {
    id: number;
    nombreUsuario: string;
    clave: string;
    rol: Rol;
  }