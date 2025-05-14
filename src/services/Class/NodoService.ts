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
            const { status, message, data } = response.data;
            return { status, message, data };
        } catch (error: any) {
            console.error("Error al actualizar el perfil del miembro:", error);
            throw error;
        }
    }

    // aqui lo envia a la api
    async uploadNodeProfilePicture(file: FormData): Promise<Node | null> {
        try {
            const response = await axiosInstance.post(`/node/upload-profile-picture`, file);
            const { status, message, data } = response.data;
            return { status, message, data };
        } catch (error: any) {
            console.error("Error al subir la foto de perfil del nodo:", error);
            throw error;
        }
    }

    async toggleMemberStatus(memberId: number): Promise<Member | null> {
        try {
            const response = await axiosInstance.put(`/member/${memberId}`);
            const { status, message, data } = response.data;
            return { status, message, data };
        } catch (error: any) {
            console.error("Error al actualizar el perfil del miembro:", error);
            throw error;
        }
    }

    // elimina la relacion entre el nodo y el miembro
    // no elimina el miembro de la base de datos
    async deleteMember(memberId: number): Promise<Member | null> {
        try {
            const response = await axiosInstance.delete(`/member/${memberId}`);
            const { status, message, data } = response.data;
            return { status, message, data };
        } catch (error: any) {
            console.error("Error al eliminar el miembro:", error);
            throw error;
        }
    }

}