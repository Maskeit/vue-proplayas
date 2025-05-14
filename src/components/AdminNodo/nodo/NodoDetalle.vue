<template>
    <div class="px-5">
        <!-- header -->
        <div class="flex lg:flex-row flex-col justify-between items-center p-4 border-b">
            <h1 class="text-3xl font-semibold text-gray-700 dark:text-gray-100">Miembros del Nodo {{ code }}</h1>
            <div class="flex items-center gap-2">
                <!-- Buscador (opcional) -->
                <input type="text" placeholder="Buscar..." class="border rounded px-2 py-1 dark:text-gray-100"
                    v-model="searchTerm" @input="$emit('search', searchTerm)" />
                <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 whitespace-nowrap"
                    @click="openInvitationModal">
                    Nuevo
                </button>
            </div>
        </div>
        <!-- table -->
        <div class="overflow-x-auto w-full">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50 dark:bg-zinc-800">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">
                            ID</th>
                        <!-- <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Node id</th> -->
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">
                            Code</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">
                            Nombre</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">
                            Username</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">
                            Email</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">
                            Linea deInvestigación</th>
                        <!-- <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Area de trabajo</th> -->
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">
                            status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">
                            Acciones</th>
                    </tr>
                </thead>
                <tbody
                    class="bg-white divide-y divide-gray-200 dark:bg-zinc-800 dark:divide-zinc-700 dark:text-gray-100">

                    <tr class="hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer" v-for="item in items"
                        :key="item.user_id" :item="item">
                        <td class="px-6 py-4 whitespace-nowrap" @click="toProfile(item.username)">{{ item.id }}</td>
                        <!-- <td class="px-6 py-4 whitespace-nowrap" @click="toProfile(item.username)">{{ item.node_id }}</td> -->
                        <td class="px-6 py-4 whitespace-nowrap" @click="toProfile(item.username)">{{ item.member_code }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap" @click="toProfile(item.username)">{{ item.name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap" @click="toProfile(item.username)">{{ item.username }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap" @click="toProfile(item.username)">{{ item.email }}</td>
                        <td class="px-6 py-4 whitespace-nowrap line-clamp-0.5" @click="toProfile(item.username)">
                            <span v-if="item.research_line">
                                {{ item.research_line.length > 10 ? item.research_line.substring(0, 15) + '...' :
                                    item.research_line }}
                            </span>
                            <span v-else> N/A </span>
                        </td>
                        <!-- <td class="px-6 py-4 whitespace-nowrap">{{ item.work_area }}</td> -->
                        <td class="px-6 py-4 whitespace-nowrap" @click="toProfile(item.username)">{{ item.status }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <button class="text-blue-600 hover:text-blue-800 mr-2"
                                @click.stop.prevent="onToggle(item)">{{ item.status === "activo" ? "Desactivar"
                                    : "Activar" }}</button> <!-- Activar -->
                            <button class="text-red-600 hover:text-red-800"
                                @click.stop="deleteMember(item)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <CrudForm :isOpen="isInvitationModal" :invitation="{
            name: '',
            email: '',
        }" @close="isInvitationModal = false" @guardar="guardarRegistro" />
    </div>
</template>

<script setup lang="ts">
import { NodeMembers } from '@interfaces/Nodes'; // Ejemplo de interface para un NodeMembers
import { ref } from 'vue';
import CrudForm from '@/components/AdminNodo/Crud/CrudForm.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps<{ items: NodeMembers[]; code: string; }>();
// adminNodo nodo detalle

const emits = defineEmits<{
    (e: 'toggle', item: NodeMembers): void;
    (e: 'deleteMember', item: NodeMembers): void;
    (e: 'search', value: string): void;
    (e: 'nuevo-registro', item: NodeMembers): void;
}>();

const guardarRegistro = (nuevoRegistro: NodeMembers) => {
    emits('nuevo-registro', nuevoRegistro);
    isInvitationModal.value = false;
};

const onToggle = (item: NodeMembers) => {
    emits('toggle', item.id);
}

const deleteMember = (item: NodeMembers) => {
    emits('deleteMember', item);
}
// Obtenemos las propiedades pasadas por el componente padre
const toProfile = (username: string) => {
    router.push(`/${username}`);// Redirigir a la página de perfil del miembro
};
const searchTerm = ref('');

const isInvitationModal = ref(false);
const openInvitationModal = () => {
    isInvitationModal.value = true;
};

</script>