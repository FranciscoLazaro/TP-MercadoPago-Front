import Usuario from "../types/Usuario";
import BackendClient from "./BackendClient";

export default class UsuarioService extends BackendClient<Usuario> {

    async isAuthenticated(username: string, password: string, url: string): Promise<boolean> {
        try {
            // Realizar la solicitud GET al endpoint de existencia de usuario por nombre y clave
            const response = await fetch(`${url}/Usuario/existByNameClave?nombre=${username}&clave=${password}`);

            // Verificar si la solicitud fue exitosa
            if (!response.ok) {
                console.error("Error al autenticar usuario:", response.statusText);
                return false;
            }

            // Si la respuesta tiene un cuerpo (datos de usuario), entonces las credenciales son válidas
            const data = await response.text();
            return data !== ''; // Si el cuerpo no está vacío, significa que las credenciales son válidas
        } catch (error) {
            console.error("Error al autenticar usuario:", error);
            return false;
        }
    }
}
