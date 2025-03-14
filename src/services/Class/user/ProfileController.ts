import type { profile } from "@interfaces/profile";
import axiosInstance from "@api";

export class ProfileService {
    constructor(){
        
    }

    async fetchProfile(): Promise<profile>{
        try {
            const response = await axiosInstance.get<profile>('/profile');
            return response.data;
        } catch (error: any) {
            return {

            }
        }
    }
}