import axiosInstance from "@api";
import type { Nodes, Node, NodeMembers } from "@interfaces/Nodes";

export class NodosService {
    async getPublicNodes(): Promise<{ nodes: Nodes[]; status: number }> {
        try {
            const response = await axiosInstance.get("/nodes");
            const data = response.data.data;
            const status = response.data.status;
            return { nodes: data, status };
        } catch (e) {
            console.error("Error al obtener los nodos públicos:", e);
            return { nodes: [], status: 500 }; // manejas el error con status
        }
    }
    
    // Traer informacion del nodo como su biografia
    async getNodeBio(id: number): Promise<Node | null> {
        try {
            const response = await axiosInstance.get<Node>(`/nodes/${id}`);
            // console.log(response.data.data , "Biografia");
            return response.data.data;
        } catch (err) {
            console.error(`Error al obtener el nodo con id ${id}:`, err);
            return null; // Retornar null para evitar errores en la UI
        }
    }

    // Traer miembros del nodo
    async getNodoMembers(id: number): Promise<NodeMembers[] | null> {
        try {
            const response = await axiosInstance.get<{ data: NodeMembers[] }>(`/users/node/${id}`);
            // console.log(response.data.data, "Miembros lista"); // Retornar directamente los datos
            return response.data.data;
        } catch (err) {
            console.error(`Error al obtener los miembros del nodo con id ${id}:`, err);
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