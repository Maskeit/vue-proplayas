import axiosInstance from "@api";
import type { InviteNodeMember, RegisterNodeMember , InviteNodeLeader, RegisterNodeLeader } from "@interfaces/Invitations";

export default class InvitationService {
    
    // Miembros
    async createInvitationToNodeMember(data: InviteNodeMember): Promise<any> {
        try {
            const response = await axiosInstance.post("/members/invite", data);
            return response.data;
        } catch (error) {
            console.error("Error al enviar la invitación:", error);
            throw error;
        }
    }
    // Lider de nodo
    async createInvitationToNodeLeader(data: InviteNodeLeader): Promise<any> {
        try {
            const response = await axiosInstance.post("/nodes/invite", data);
            return response.data;
        } catch (error) {
            console.error("Error al enviar la invitación:", error);
            throw error;
        }
    }

    // Método general para registrar nuevos usuarios
    async registerNewUser(data: any): Promise<any> {
        try {
            const response = await axiosInstance.post("/invitations/accept", data);
            return response.data.status;
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            throw error;
        }
    }
}