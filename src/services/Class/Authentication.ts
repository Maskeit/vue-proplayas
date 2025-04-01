import axiosInstance from "@api";
import { system } from '@service/system';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@interfaces/Auth';
import Cookies from "js-cookie";
export class Authentication {
    constructor() { };

    private getRedirectRoute(role: string, nodeId?: string): string | null {
        switch (role) {
            case "admin":
                return "/root/nodos";
            case "member":
                return "/User/Profile";
            case "node_leader":
                return nodeId ? `/lider/${nodeId}` : null;
            default:
                return null; // Si el rol no es reconocido
        }
    }

    async login(credentials: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await axiosInstance.post<LoginResponse>('/login', {
                email: credentials.email,
                password: btoa(credentials.password),
            });
            if (response.data) {
                const { token, role, node_id } = response.data.data;
                const authToken = token
                const user_role = role;
                system.authToken = token;
                system.role = role // el rol puede ser admin, member o node_leader
                localStorage.setItem("Authorization", authToken);
                localStorage.setItem("node_id", node_id);
                Cookies.set("Authorization", authToken, { expires: 7, path: "/" });
                // Obtener ruta de redirección basada en el rol
                const route = this.getRedirectRoute(user_role, node_id);
                return { token: authToken, route: route };
            }
            return { token: null, route: null };
        } catch (error: any) {
            return {
                status: error.response?.status || 500,
                token: null
            };
        }
    }

    async logout(): Promise<boolean> {
        try {
            const response = await axiosInstance.post('/logout');
            if (response.status === 200) {
                Cookies.remove("Authorization", { path: "/" });
                localStorage.removeItem("Authorization");
                localStorage.removeItem("node_id");
                system.authToken = null;
                system.role = null;
                return true;
            }
            console.error("Error al cerrar sesión: Código de estado inesperado", response.status);
            return false;
        } catch (error: any) {
            console.error("Error al cerrar sesión:", error);
            return false;
        }
    }
    async register(credentials: RegisterRequest): Promise<RegisterResponse> {
        try {
            const response = await axiosInstance.post<RegisterResponse>('/register', {
                email: credentials.email,
                password: btoa(credentials.password),
                name: credentials.name,
                role: "admin",
            });
            if (response.data.status === 201) {
                return {
                    status: response.data.status,
                    message: response.data.message
                };
            }
            return {
                status: response.data.status,
                message: response.data.message || "Registro no exitoso",
            };
        } catch (error: any) {
            return {
                status: error.response?.status || 500,
                message: error.response?.data?.message || "Hubo un error en el registro"
            };
        }
    }
}