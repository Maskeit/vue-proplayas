import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Users } from '@interfaces/Profile'
import { UserService } from '@/services/Class/user/UserController';

export const useUserStore = defineStore('user', () => {
    const users = ref<Users[]>([])

    const setUsers = (user: Users[]) => {
        users.value = user
    }
    const userService = new UserService();

    const fetchUsers = async () => {
        try {        
            const { status, message, data} = await userService.fetchUsers()
            setUsers(data)
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