<template>
    <div class="px-6">
        <!-- header -->
        <div class="flex justify-between items-center p-4 border-b">
            <h1 class="text-3xl font-semibold text-gray-700 dark:text-gray-100">Nodo Publico: {{ code }}</h1>
            <div class="flex items-center space-x-2">
                <!-- Buscador (opcional) -->
                <input type="text" placeholder="Buscar..." class="border rounded px-2 py-1" v-model="searchTerm"
                    @input="$emit('search', searchTerm)" />
            </div>
        </div>
        <!-- table -->
        <div class="overflow-x-auto w-full">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">ID</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Node id</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Nombre</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Email</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Linea de
                            Investigación
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Area de trabajo</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 dark:text-gray-100">
                    <tr class="hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" v-for="item in items" :key="item.id" :item="item">
                        <td class="px-6 py-4 whitespace-nowrap">{{ item.id }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ item.node_id }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ item.name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ item.email }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ item.research_line }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ item.work_area }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Members } from '@/interfaces/Members'; // Ejemplo de interface para un Members
import { ref } from 'vue';
// list public nodo
const searchTerm = ref('');
// Obtenemos las propiedades pasadas por el componente padre
const props = defineProps<{
    items: Members[];
    code: string; // Ej A5
}>();
</script>