import type { profile } from "@interfaces/Profile";
import axiosInstance from "@api";

export class ProfileService {
    async fetchProfile(): Promise<profile>{
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
            const {status, message, data} = response.data;
            console.log({status, message, data});
            return { status, message, data };
        } catch (error: any) {
            console.error("Error al actualizar el perfil del miembro:", error);
            throw error;
        }
    }
}