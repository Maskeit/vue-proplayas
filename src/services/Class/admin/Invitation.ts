import axiosInstance from "@api";
import type { InviteNodeLeader, RegisterNodeLeader } from "@interfaces/Invitations.ts";


export default class InvitationService {
    
    async createInvitation(data: InviteNodeLeader): Promise<any> {
        try {
            const response = await axiosInstance.post("/nodes/invite", data);
            return response.data;
        } catch (error) {
            console.error("Error al enviar la invitación:", error);
            throw error;
        }
    }

    async registerNewNode(data: RegisterNodeLeader ): Promise<any> {
        try {
            const response = await axiosInstance.post("/invitations/accept", data);
            return response.data;
        } catch (error) {
            console.error("Error al registrar el nodo:", error);
            throw error;
        }
    }
}