// ProfileStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@interfaces/profile'
import { ProfileService } from '@/services/Class/user/ProfileController'

export const useUserProfileStore = defineStore('userProfile', () => {
  const profile = ref<User | null>(null)

  const setProfile = (user: User) => {
    profile.value = user
  }

  const clearProfile = () => {
    profile.value = null
  }

  const fetchAndSetProfile = async () => {
    try {
      const profileService = new ProfileService()
      const profileData = await profileService.fetchProfile()
      setProfile(profileData)
    } catch (error) {
      console.error('Error al obtener y establecer el perfil:', error)
      throw error
    }
  }

  const updateProfile = async (form: Partial<User>) => {
    try {
      const profileService = new ProfileService()
      const { status, message, data } = await profileService.updateProfile(form)
      setProfile(data)
      return status
    } catch (error) {
      console.error('Error actualizando el perfil:', error)
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
  }
})