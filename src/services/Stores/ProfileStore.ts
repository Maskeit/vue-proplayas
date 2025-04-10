// ProfileStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@interfaces/Profile'
import { ProfileService } from '@/services/Class/user/ProfileController'

export const useUserProfileStore = defineStore('userProfile', () => {
  const profile = ref<User | null>(null)

  const setProfile = (user: User) => {
    profile.value = user
  }

  const clearProfile = () => {
    profile.value = null
  }
  const profileService = new ProfileService()
  // private user data
  const fetchAndSetProfile = async () => {
    try {
      const profileData = await profileService.fetchProfile()
      setProfile(profileData)
    } catch (error) {
      console.error('Error al obtener y establecer el perfil:', error)
      throw error
    }
  }

  const updateProfile = async (form: Partial<User>) => {
    try { 
      const { status, message, data } = await profileService.updateProfile(form)      
      setProfile(data)
      return status
    } catch (error) {
      console.error('Error actualizando el perfil:', error)
      throw error
    }
  }

  const getProfile = async (username: string) => {
    try {      
      const profileData = await profileService.getPublicProfile(username)
      setProfile(profileData);
    } catch (error) {
      console.error('Error al obtener y establecer el perfil:', error)
      throw error
    }
  }

  return {
    // State (ref)
    profile,
    // Actions
    setProfile,
    clearProfile,
    fetchAndSetProfile,
    updateProfile,
    getProfile,
  }
})