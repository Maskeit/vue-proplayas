import type { profile } from "@interfaces/profile";
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
}