import { defineStore } from 'pinia'
import type { User } from '@interfaces/profile'
import { ProfileService } from "@/services/Class/user/ProfileController";
export const useUserProfileStore = defineStore('userProfile', {
  state: () => ({
    profile: null as User | null
  }),

  actions: {
    setProfile(profile: User) {
      this.profile = profile
    },
    clearProfile() {
      this.profile = null
    },
    async fetchAndSetProfile() {
      try {
        const profileService = new ProfileService();
        const profileData = await profileService.fetchProfile();
        this.setProfile(profileData);
      } catch (error) {
        console.error("Error al obtener y establecer el perfil:", error);
        throw error;
      }
    }
  }
})