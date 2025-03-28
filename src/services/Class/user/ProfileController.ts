import type { profile } from "@interfaces/profile";
import axiosInstance from "@api";

export class ProfileService {
    async fetchProfile(id: number): Promise<profile>{
        try {
            const response = await axiosInstance.get<profile>(`/users/${id}`);
            return response.data.data;
        } catch (error: any) {
            console.error("Error al obtener el perfil del miembro:", error);
            throw error;
        }
    }
}