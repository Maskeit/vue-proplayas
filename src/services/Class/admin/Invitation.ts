import axiosInstance from "@api";
import type { InviteNodeLeader, RegisterNodeLeader } from "@interfaces/Invitations";


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
        data.password = btoa(data.password);
        data.confirm_password = btoa(data.confirm_password);
        try {
            const response = await axiosInstance.post("/invitations/accept", data);
            return response.data.status; // 201
        } catch (error) {
            console.error("Error al registrar el nodo:", error);
            throw error;
        }
    }
}