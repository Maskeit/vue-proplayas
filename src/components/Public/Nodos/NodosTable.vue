<template>
    <div class="px-6">
        <!-- header -->
        <div class="flex justify-between items-center p-4 border-b">
            <h1 class="text-3xl font-semibold text-gray-600 dark:text-gray-100">Nodos</h1>
            <div class="flex items-center space-x-2">
                <input type="text" placeholder="Buscar..." class="border rounded px-2 py-1 dark:text-gray-100" v-model="searchTerm"
                    @input="$emit('search', searchTerm)" />
            </div>
        </div>
        <!-- table -->
        <div class="overflow-x-auto w-full">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">ID</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Code</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Nombre</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Tipo</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">País</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Ciudad</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Miembros</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Se Unió en</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 dark:text-gray-100">
                    <tr v-for="item in items" :key="item.id" 
                        @click="irADetalle(item.code)"
                        class="hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                        <td class="px-6 py-4">{{ item.id }}</td>
                        <td class="px-6 py-4">{{ item.code }}</td>
                        <td class="px-6 py-4">{{ item.name }}</td>
                        <td class="px-6 py-4">{{ item.type }}</td>
                        <td class="px-6 py-4">{{ item.country }}</td>
                        <td class="px-6 py-4">{{ item.city }}</td>
                        <td class="px-6 py-4">{{ item.members_count == null ? 0 : item.members_count }}</td>
                        <td class="px-6 py-4">{{ item.joined_in }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Nodes } from '@/interfaces/Nodes';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// list public nodos
const router = useRouter();
const searchTerm = ref('');
const props = defineProps<{ items: Nodes[] }>();
const irADetalle = (code:string) => {
    router.push(`/nodo/${code}`);
}
</script>
