import axiosInstance from "@api";
import type { Nodes, Node } from "@interfaces/Nodes";

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
    
    async getNodeById(id: number): Promise<Node | null> {
        console.log("llego el id ", id)
        try {
            const response = await axiosInstance.get<Node>(`/nodes/${id}`);
            return response.data; // Retornar directamente los datos
        } catch (err) {
            console.error(`Error al obtener el nodo con id ${id}:`, err);
            return null; // Retornar null para evitar errores en la UI
        }
    }
}