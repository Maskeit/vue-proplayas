<template>
    <div class="overflow-x-auto w-full px-6">
        <div class="flex justify-between items-center mb-4 p-5">
            <h1 class="text-3xl font-semibold text-gray-700 dark:text-gray-100">Usuarios de Proplayas</h1>
            <input 
                type="text"
                @input="$emit('search', searchTerm)"
                v-model="searchTerm" 
                placeholder="Buscar..." 
                class="border border-gray-300 rounded px-4 py-2"
            />
        </div>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50 dark:bg-zinc-800">
          <tr>
            
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Code</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Nombre</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Actividad</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Rol</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-zinc-200 dark:bg-zinc-800 dark:divide-zinc-700 dark:text-gray-100">
          <tr v-for="item in items" :key="item.node_id" class="hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer">
            <td class="px-6 py-4">{{ item.node_code }}</td>
            <td class="px-6 py-4">{{ item.name }}</td>
            <td class="px-6 py-4">{{ item.email }}</td>
            <td class="px-6 py-4">{{ item.status }}</td>
            <td class="px-6 py-4">{{ item.role }}</td>
            <td class="px-6 py-4 flex gap-2">
              <!-- Botón Eliminar -->
              <button class="text-red-600 hover:text-red-800" @click.stop="emits('deleteUser',item.node_code)">
                Eliminar
              </button>
              <button class="text-blue-600 hover:text-blue-800" @click.stop="emits('toggle',item.node_code)">
                {{ item.status === 'activo' ? 'Desactivar' : 'Activar' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Users } from '@interfaces/Profile';

const props = defineProps<{items: Users[]}>();
const searchTerm = ref('');
const emits = defineEmits(['toggle', 'deleteUser', 'search']);
</script>