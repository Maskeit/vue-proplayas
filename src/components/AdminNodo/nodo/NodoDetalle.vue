<template>
    <div class="px-5">
        <!-- header -->
        <div class="flex lg:flex-row flex-col justify-between items-center p-4 border-b">
            <h1 class="text-3xl font-semibold text-gray-700 dark:text-gray-100">Miembros del Nodo {{ code }}</h1>
            <div class="flex items-center gap-2">
                <!-- Buscador (opcional) -->
                <input type="text" placeholder="Buscar..." class="border rounded px-2 py-1 dark:text-gray-100" v-model="searchTerm"
                    @input="$emit('search', searchTerm)" />
                <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 whitespace-nowrap"
                    @click="$emit('nuevo-registro')">
                    Nuevo
                </button>
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
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Acciones</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 dark:bg-zinc-800 dark:divide-zinc-700 dark:text-gray-100">
                    <tr class="hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer" v-for="item in items" :key="item.id" :item="item" @editar="onEditar" @eliminar="onEliminar">
                        <td class="px-6 py-4 whitespace-nowrap">{{ item.id }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ item.node_id }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ item.member_code }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ item.name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ item.username }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ item.email }}</td>
                        <td class="px-6 py-4 whitespace-nowrap line-clamp-0.5">{{ item.research_line }}</td>
                        <!-- <td class="px-6 py-4 whitespace-nowrap">{{ item.work_area }}</td> -->
                        <td class="px-6 py-4 whitespace-nowrap">{{ item.status }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <button class="text-blue-600 hover:text-blue-800 mr-2"
                                @click="$emit('editar', item)">Editar</button>
                            <button class="text-red-600 hover:text-red-800"
                                @click="$emit('eliminar', item)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { NodeMembers } from '@/interfaces/Nodes'; // Ejemplo de interface para un NodeMembers
import { ref } from 'vue';
// admin Root nodo
const searchTerm = ref('');
// Obtenemos las propiedades pasadas por el componente padre
const props = defineProps<{ items: NodeMembers[];code: string; }>();
const emits = defineEmits<{
    (e: 'editar', item: NodeMembers): void;
    (e: 'eliminar', item: NodeMembers): void;
}>();

function onEditar(item: NodeMembers) {
    emits('editar', item);
}

function onEliminar(item: NodeMembers) {
    emits('eliminar', item);
}
</script>