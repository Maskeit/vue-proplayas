import axiosInstance from "@api";
import { system } from '@service/system';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@interfaces/Auth';

export class Authentication {
    constructor() { };

    async login(credentials: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await axiosInstance.post<LoginResponse>('/login', {
                email: credentials.email,
                password: credentials.password,
            });
            if (response.data) {
                const authToken = response.data.token;
                const role = response.data.role;
                system.authToken = authToken;
                system.role = role
                return { token: authToken, role: role };
            }
            return { token: null, role: null  };
        } catch (error: any) {
            return {
                status: error.response?.status || 500,
                token: null
            };
        }
    }

    async register(credentials: RegisterRequest): Promise<RegisterResponse> {
        try{
            const response = await axiosInstance.post<RegisterResponse>('/register', {
                email: credentials.email,
                password: credentials.password,
                name: credentials.name,
                role: "member",
            });
            if (response.data.status === 200) {
                return {
                    status: response.data.status,
                    message: response.data.message
                };
            }
            // return por defecto si la respuesta no es 200
            return {
                status: response.data.status,
                message: response.data.message || "Registro no exitoso",
            };
        } catch(error: any){
            return {
                status: error.response?.status || 500,
                message: error.response?.data?.message || "Hubo un error en el registro"
            };
        }
    }
}