<template>
  <div class="px-5">
    <!-- header -->
    <div class="flex justify-between items-center p-4">
      <h1 class="text-3xl font-semibold text-gray-600 dark:text-gray-100">Gestión de Nodos</h1>
      <div class="flex items-center space-x-2">
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
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">ID</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Code</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Nombre</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Tipo</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">País</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Ciudad</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Miembros</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Se Unió en
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-zinc-200 dark:bg-zinc-800 dark:divide-zinc-700 dark:text-gray-100">
          <tr v-for="item in items" :key="item.id"
            class="hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer">
            <td class="px-6 py-4" @click="irADetalle(item.code)">{{ item.id }}</td>
            <td class="px-6 py-4" @click="irADetalle(item.code)">{{ item.code }}</td>
            <td class="px-6 py-4" @click="irADetalle(item.code)">{{ item.name }}</td>
            <td class="px-6 py-4" @click="irADetalle(item.code)">{{ nodeType(item.type) }}</td>
            <td class="px-6 py-4" @click="irADetalle(item.code)">{{ item.country }}</td>
            <td class="px-6 py-4" @click="irADetalle(item.code)">{{ item.city }}</td>
            <td class="px-6 py-4" @click="irADetalle(item.code)">{{ item.members_count == null ? 0 : item.members_count }}</td>
            <td class="px-6 py-4" @click="irADetalle(item.code)">{{ item.joined_in }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <!-- Botón Eliminar -->
              <button class="text-red-600 hover:text-red-800" @click.stop="deleteNode(item)">
                Eliminar
              </button>
            </td>
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
import { nodeType } from "@/utils/validators/NodeTypes";
// admin Root nodos
const router = useRouter();
const props = defineProps<{ items: Nodes[]; }>();

const emits = defineEmits<{
  (e: 'toggle', item: Nodes): void;
  (e: 'eliminar', item: Nodes): void;
  (e: 'search', value: string): void;
  (e: 'deleteNode', item: Nodes): void;
}>();

const onToggle = (item: Nodes) => {
  emits('toggle', item);
}

const deleteNode = (item: Nodes) => {
  emits('deleteNode', item);
}

const irADetalle = (code: string) => {
  router.push(`/root/nodo/${code}`);
};

const searchTerm = ref('');
</script>