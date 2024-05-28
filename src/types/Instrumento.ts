import Categoria from "./Categoria";


export default interface Instrumento{
    id:number;
    instrumento:string;
    marca?:string;
    modelo?:string;
    imagen:string;
    precio:number;
    costoEnvio?:string;
    cantidadVendida?:number;
    descripcion?:string;
    cantidad:number;
    categoria?: Categoria
}
