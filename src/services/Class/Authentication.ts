import axiosInstance from "@api";
import { system } from '@service/system';
import { ApiResponse, LoginRequest, LoginResponse } from '@interfaces/Auth';
import Cookies from "js-cookie";
export class Authentication {
    constructor() { };

    private getRedirectRoute(role: string, node_code?: string): string | null {
        switch (role) {
            case "admin":
                return "/root/nodos";
            case "member":
                return "/User/Profile";
            case "node_leader":
                return node_code ? `/lider/${node_code}` : null;
            default:
                return null; // Si el rol no es reconocido
        }
    }

    async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
        try {
            const response = await axiosInstance.post('/login', {
                email: credentials.email,
                password: btoa(credentials.password),
            });
            if (response.data.status === 200) {
                const { token, role, node_id } = response.data.data;
                system.authToken = token;
                system.role = role; // el rol puede ser admin, member o node_leader
                localStorage.setItem("Authorization", token);
                localStorage.setItem("node_id", node_id);
                localStorage.setItem("role", role);
                Cookies.set("Authorization", token, { expires: 7, path: "/" });

                const route = this.getRedirectRoute(role, node_id);

                return {
                    status: 200,
                    message: "Inicio de sesión exitoso",
                    data: {
                        token,
                        role,
                        node_id,
                        route
                    }
                };
            }

            return {
                status: response.data.status,
                message: response.data.message || "Inicio de sesión fallido",
                data: null
            };
        } catch (error: any) {
            return {
                status: error.response?.status || 500,
                message: "Hubo un error en el servidor",
                data: null
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
                localStorage.removeItem("role");
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

    // envia correo de confirmación para autenticar usuario
    async recoverPassword(email: string): Promise<any> {
        try {
            const response = await axiosInstance.post('/recover-password', {
                email: email,
            });
            if (response.data.status === 200) {
                return {
                    status: response.data.status,
                    message: response.data.message
                };
            }
            return {
                status: response.data.status,
                message: response.data.message || "Recuperación no exitosa",
            };
        } catch (error: any) {
            return {
                status: error.response?.status || 500,
                message: error.response?.data?.message || "Hubo un error en la recuperación"
            };
        }
    }

    // set new password
    async setNewPassword(token: string, password: string): Promise<any> {
        try {
            const response = await axiosInstance.post('/set-new-password', {
                token: token,
                password: btoa(password),
            });
            if (response.data.status === 200) {
                return {
                    status: response.data.status,
                    message: response.data.message
                };
            }
            return {
                status: response.data.status,
                message: response.data.message || "Recuperación no exitosa",
            };
        } catch (error: any) {
            return {
                status: error.response?.status || 500,
                message: error.response?.data?.message || "Hubo un error en la recuperación"
            };
        }
    }
}