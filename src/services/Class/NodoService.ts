import axiosInstance from "@api";
import type { Nodes, Node, NodeMembers, Member } from "@interfaces/Nodes";

export class NodosService {
    async getPublicNodes(): Promise<{ nodes: Nodes[]; status: number }> {
        try {
            const response = await axiosInstance.get("/nodes");
            const data = response.data.data;
            return data;
        } catch (e) {
            console.error("Error al obtener los nodos públicos:", e);
            return { nodes: [], status: 500 }; // manejas el error con status
        }
    }
    
    // Traer informacion del nodo como su biografia
    async getNodeBio(code: number): Promise<Node | null> {
        try {
            const response = await axiosInstance.get<Node>(`/node/${code}`);
            return response.data.data;
        } catch (err) {
            console.error(`Error al obtener el nodo con code ${code}:`, err);
            return null; // Retornar null para evitar errores en la UI
        }
    }

    // Traer miembros del nodo
    async getNodoMembers(code: string): Promise<NodeMembers[] | null> {
        try {
            const response = await axiosInstance.get<{ data: NodeMembers[] }>(`/node/members/${code}`);
            return response.data.data;
        } catch (err) {
            console.error(`Error al obtener los miembros del nodo con code ${code}:`, err);
            return null; // Retornar null para evitar errores en la UI
        }
    }

    async editNodeBio(id: number, editData: Node): Promise<Node | null> {
        try {
            const response = await axiosInstance.put(`/node/${id}`, editData);
            const {status, message, data} = response.data;
            console.log({status, message, data});
            return { status, message, data };
        }  catch (error: any) {
            console.error("Error al actualizar el perfil del miembro:", error);
            throw error;
        }
    }

    async toggleMemberStatus(memberId: number): Promise<Member | null> {
        try{
            const response = await axiosInstance.delete(`/user/${memberId}`);    
            const {status, message, data} = response.data;
            return {status, message, data};
        } catch (error: any) {
            console.error("Error al actualizar el perfil del miembro:", error);
            throw error;
        }
    }

}