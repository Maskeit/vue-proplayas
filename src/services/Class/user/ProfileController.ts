import type { profile } from "@interfaces/Profile";
import axiosInstance from "@api";

export class ProfileService {
    async fetchProfile(): Promise<profile> {
        try {
            const response = await axiosInstance.get<profile>(`/user/profile`);
            return response.data.data;
        } catch (error: any) {
            console.error("Error al obtener el perfil del miembro:", error);
            throw error;
        }
    }

    async updateProfile(form: profile): Promise<{ status: number; message: string; data: profile }> {
        try {
            const response = await axiosInstance.put<profile>(`/user/profile`, form);
            const { status, message, data } = response.data;
            return { status, message, data };
        } catch (error: any) {
            console.error("Error al actualizar el perfil del miembro:", error);
            throw error;
        }
    }
    // aqui lo envia a la api
    async uploadProfilePicture(file: FormData): Promise<{ status: number; message: string; data: profile }> {
        try {
            const response = await axiosInstance.post(`/user/upload-profile-picture`, file);
            const { status, message, data } = response.data;
            return { status, message, data };
        } catch (error: any) {
            console.error("Error al subir la foto de perfil del nodo:", error);
            throw error;
        }
    }
    
    // peticion con axios para obtener el perfil publico
    async getPublicProfile(username: string): Promise<{ status: number; data: profile }> {
        try {
            const response = await axiosInstance.get<profile>(`/user/${username}`);
            return response.data.data;
        } catch (error: any) {
            console.error("Error al obtener el perfil público:", error);
            throw error;
        }
    }
}