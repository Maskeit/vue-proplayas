import axiosInstance from "@api";
import type { Nodes } from "@interfaces/Nodes";

export class NodosService {

    async getNodes(): Promise<any> {
        try {
            const response = await axiosInstance.get<Nodes[]>("/admin-dashboard");
            return response.data;
        } catch (error) {
            console.error("Error al obtener los nodos:", error);
            return [];
        }
    }
}