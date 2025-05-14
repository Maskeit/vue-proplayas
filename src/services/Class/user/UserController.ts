import axiosInstance from "@api";

export class UserService {
    // Trae la lista de usuarios
    async fetchUsers(): Promise<any> {
        try {
            const response = await axiosInstance.get<any>(`/users`);
            return response.data.data;
        } catch (error: any) {
            console.error("Error al obtener el usuario:", error);
            throw error;
        }
    }


    // Elimina el usuario definitivamente (SOLO ADMIN)
    async deleteUser(id: string): Promise<any> {
        try {
            const response = await axiosInstance.delete<any>(`/user/${id}`);
            
            return response.data.data;
        } catch (error: any) {
            console.error("Error al eliminar el usuario:", error);
            throw error;
        }
    }
}