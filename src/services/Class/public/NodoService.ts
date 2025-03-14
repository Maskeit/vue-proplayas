import axiosInstance from "@api";
import type { Nodes } from "@interfaces/Nodes";

export class NodosService {
    async getPublicNodes(): Promise<Nodes[]> {
        try {
            const response = await axiosInstance.get<Nodes[]>("/nodes");
            return response.data.data; // Retornar directamente los datos
        } catch (e) {
            console.error("Error al obtener los nodos públicos:", e);
            return []; // Retornar array vacío para evitar errores en la UI
        }
    }
}