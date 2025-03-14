import router from "@/router";
import Cookies from "js-cookie";

export const V_Global_API = import.meta.env.VITE_APP_API_URL;
export const V_Global_IMG = import.meta.env.VITE_APP_IMG_URL;
export const V_Global_Domain = import.meta.env.VITE_APP_DOMAIN;
export const V_Domain = "";
// Interfaz para la configuración del sistema
interface SystemConfig {
    authToken: string | null;
    role: string | null;
    initializeAuth: () => string | null;
    http: HttpConfig;
    handlerError: HandlerErrorConfig;
}

// Interfaz para la configuración HTTP
interface HttpConfig {
    send: {
        authorization: () => string | null;
    };
    check: {
        live: () => boolean;
        auth: () => boolean;
    };
}

// Interfaz para manejo de errores
interface HandlerErrorConfig {
    handleError: (errorCode?: number, errorMessage?: string) => void;
}

// Implementación de `system`
export const system: SystemConfig = {
    authToken: null,
    role: null,
    // Método para inicializar `authToken` una vez
    initializeAuth(): string | null {
        if (!this.authToken) {
            this.authToken = this.http.send.authorization();
        }
        return this.authToken;
    },

    http: {
        send: {
            authorization(): string | null {
                try {
                    return Cookies.get("Authorization") || localStorage.getItem("Authorization") || null;
                } catch (error) {
                    console.error("Error obteniendo el token:", error);
                    return null;
                }
            },
        },

        check: {
            live(): boolean {
                const token = Cookies.get("Authorization");
                if (!token) {
                    system.handlerError.handleError(401, "Página no disponible.");
                    return false;
                }
                return true;
            },
            auth(): boolean {
                return !!Cookies.get("Authorization");
            },
        },
    },

    handlerError: {
        handleError(errorCode: number = 500, errorMessage: string = "Ha ocurrido un error inesperado."): void {
            router.push({
                name: "Error",
                query: { code: errorCode.toString(), message: errorMessage },
            });
        },
    },
};

export const decodeJWT = (token: string) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
    }
};

// Ejecutar `initializeAuth()` antes de cargar rutas
system.initializeAuth();