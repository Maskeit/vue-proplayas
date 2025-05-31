import axiosInstance from "@api";
import { ApiResponse, Users } from '@/interfaces/Profile';
export class UserService {
    // Trae la lista de usuarios
    async fetchUsers(): Promise<any> {
        try {
            const response = await axiosInstance.get<ApiResponse<Users[]>>(`/users`);
            return response.data;
        } catch (error: any) {
            console.error("Error al obtener el usuario:", error);
            throw error;
        }
    }

    // Elimina el usuario definitivamente (SOLO ADMIN)
    async deleteUser(id: string): Promise<any> {
        try {
            const response = await axiosInstance.delete<ApiResponse<Users>>(`/user/${id}`);
            return response.data;
        } catch (error: any) {
            console.error("Error al eliminar el usuario:", error);
            throw error;
        }
    }
}