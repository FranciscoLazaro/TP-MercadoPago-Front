import Usuario from "../types/Usuario";
import BackendClient from "./BackendClient";

export default class UsuarioService extends BackendClient<Usuario> {

    async isAuthenticated(username: string, password: string, url: string): Promise<{ isAuthenticated: boolean, role?: string }> {
        try {
            // Realizar la solicitud GET al endpoint de existencia de usuario por nombre y clave
            const response = await fetch(`${url}/Usuario/existByNameClave?nombre=${username}&clave=${password}`);

            // Verificar si la solicitud fue exitosa
            if (!response.ok) {
                console.error("Error al autenticar usuario:", response.statusText);
                return { isAuthenticated: false };
            }

            // Parsear la respuesta como JSON
            const data = await response.json();

            // Verificar si los datos de usuario existen y devolver el rol si es así
            if (data && data.rol) {
                return { isAuthenticated: true, role: data.rol };
            } else {
                return { isAuthenticated: false };
            }
        } catch (error) {
            console.error("Error al autenticar usuario:", error);
            return { isAuthenticated: false };
        }
    }
}
