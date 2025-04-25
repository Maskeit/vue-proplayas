<template>
    <div class="px-6">
        <!-- header -->
        <div class="flex justify-between items-center p-4">
            <h1 class="text-3xl font-semibold text-gray-700 dark:text-gray-100">Detalles del Nodo {{ code }}</h1>
            <div class="flex items-center space-x-2">
                <input type="text" placeholder="Buscar..." class="border rounded px-2 py-1 dark:text-gray-100"
                v-model="searchTerm" @input="$emit('search', searchTerm)" />
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
                    <tr class="hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer" v-for="item in items"
                        :key="item.id" :item="item">
                        <td class="px-6 py-4 whitespace-nowrap" @click="toProfile(item.username)">{{ item.id }}</td>
                        <td class="px-6 py-4 whitespace-nowrap" @click="toProfile(item.username)">{{ item.node_id }}</td>
                        <td class="px-6 py-4 whitespace-nowrap" @click="toProfile(item.username)">{{ item.member_code }}</td>
                        <td class="px-6 py-4 whitespace-nowrap" @click="toProfile(item.username)">{{ item.name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap" @click="toProfile(item.username)">{{ item.username }}</td>
                        <td class="px-6 py-4 whitespace-nowrap" @click="toProfile(item.username)">{{ item.email }}</td>
                        <td class="px-6 py-4 whitespace-nowrap line-clamp-0.5" @click="toProfile(item.username)">{{ item.research_line }}</td>
                        <td class="px-6 py-4 whitespace-nowrap" @click="toProfile(item.username)">{{ item.status }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <button class="text-blue-600 hover:text-blue-800 mr-2"
                            @click.stop.prevent="update(item)">editar</button>
                            <button class="text-red-600 hover:text-red-800"
                            @click.stop="deleteMember(item)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Member } from '@/interfaces/Members'; // Ejemplo de interface para un Members
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
// admin Root nodo detalle 
// Obtenemos las propiedades pasadas por el componente padre
const props = defineProps<{
    items: Member[];
    code: string; // Ej A5
}>();

const emits = defineEmits<{
  (e: 'update', item: Nodes): void;
  (e: 'deleteMember', item: Nodes): void;
  (e: 'search', value: string): void;
  (e: 'deleteNode', item: Nodes): void;
  (e: 'nuevo-registro', item: NodeMembers): void;
}>();

const update = (item: Nodes) => {
  emits('update', item);
}

const deleteMember = (item: NodeMembers) => {
    emits('deleteMember', item);
}
// Obtenemos las propiedades pasadas por el componente padre
const toProfile = (username: string) => {
    router.push(`/${username}`);// Redirigir a la página de perfil del miembro
};
const searchTerm = ref('');
</script>