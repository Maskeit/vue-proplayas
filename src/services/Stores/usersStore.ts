import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@interfaces/Profile'
import { UserService } from '@/services/Class/user/UserController';

export const useUserStore = defineStore('user', () => {
    const users = ref<User[]>([])

    const setUsers = (user: User[]) => {
        users.value = user
    }
    const userService = new UserService();

    const fetchUsers = async () => {
        try {        
            const userData = await userService.fetchUsers()
            setUsers(userData)
        } catch (error) {
            console.error('Error al obtener y establecer los usuarios:', error)
            throw error
        }
    }

    return {
        // State (ref)
        users,
        // Actions
        setUsers,
        fetchUsers,
    }
})