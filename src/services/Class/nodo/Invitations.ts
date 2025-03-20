import axiosInstance from "@api";
import type { InviteNodeMember, RegisterNodeMember } from "@interfaces/Invitations";


export default class InvitationService {
    
    async createInvitation(data: InviteNodeMember): Promise<any> {
        try {
            const response = await axiosInstance.post("/members/invite", data);
            return response.data;
        } catch (error) {
            console.error("Error al enviar la invitación:", error);
            throw error;
        }
    }

    async registerNewNode(data: RegisterNodeMember ): Promise<any> {
        try {
            const response = await axiosInstance.post("/invitations/accept", data);
            return response.data.status; // 201
        } catch (error) {
            console.error("Error al registrar el nodo:", error);
            throw error;
        }
    }
}