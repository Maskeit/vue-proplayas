import axiosInstance from "@api";
import type { Nodes, Node } from "@interfaces/Nodes";

export class NodosService {
    async getPrivateNodeById(id: number): Promise<Node | null> {
        try {
            const response = await axiosInstance.get<Node>(`/nodes/${id}`);
            return response.data; // Retornar directamente los datos
        } catch (err) {
            console.error(`Error al obtener el nodo con id ${id}:`, err);
            return null; // Retornar null para evitar errores en la UI
        }
    }


    async editNodeBio(id: number, data: Node): Promise<Node | null> {
        try {
            // Verifica que social_media sea un string JSON si es un objeto
            const formattedData = {
                ...data,
                social_media: typeof data.social_media === "string" ? data.social_media : JSON.stringify(data.social_media),
            };
    
            console.log("Datos enviados al servidor:", id, formattedData);
    
            const response = await axiosInstance.put(`/nodes/${id}`, formattedData);
            return response.data; // Retornar directamente los datos
        } catch (err) {
            console.error(`Error al editar los datos del nodo`, err);
            return null; // Retornar null para evitar errores en la UI
        }
    }    
}