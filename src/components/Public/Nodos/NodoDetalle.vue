<template>
    <div class="px-5">
        <!-- header -->
        <div class="flex justify-between items-center p-4">
            <h1 class="text-3xl font-semibold text-gray-600 dark:text-gray-100">Nodo Publico: {{ code }}</h1>
            <div class="flex items-center space-x-2">
                <!-- Buscador (opcional) -->
                <input type="text" placeholder="Buscar..." class="border rounded px-2 py-1 dark:text-gray-100" v-model="searchTerm"
                @input="$emit('search', searchTerm)" />
            </div>
        </div>
        <!-- table -->
        <div class="overflow-x-auto w-full">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50 dark:bg-zinc-800">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">ID</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Node id</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Code</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Nombre</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Username</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Email</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Linea deInvestigación</th>
                        <!-- <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Area de trabajo</th> -->
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">status</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 dark:bg-zinc-800 dark:divide-zinc-700 dark:text-gray-100">
                    <tr class="hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer" v-for="item in items" :key="item.id" :item="item">
                        <td class="px-6 py-4 whitespace-nowrap">{{ item.id }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ item.node_id }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ item.member_code }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ item.name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ item.username }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ item.email }}</td>
                        <td class="px-6 py-4 whitespace-nowrap line-clamp-0.5">{{ item.research_line }}</td>
                        <!-- <td class="px-6 py-4 whitespace-nowrap">{{ item.work_area }}</td> -->
                        <td class="px-6 py-4 whitespace-nowrap">{{ item.status }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { NodeMembers } from '@/interfaces/Nodes'; // Ejemplo de interface para un NodeMembers
import { ref } from 'vue';
// list public nodo
const searchTerm = ref('');
// Obtenemos las propiedades pasadas por el componente padre
const props = defineProps<{items: NodeMembers[];code: string;}>();
</script>