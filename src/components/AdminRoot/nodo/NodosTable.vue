<template>
  <div class="px-5">
    <!-- header -->
    <div class="flex justify-between items-center p-4">
      <h1 class="text-3xl font-semibold text-gray-600 dark:text-gray-100">Gestión de Nodos</h1>
      <div class="flex items-center space-x-2">
        <input type="text" placeholder="Buscar..." class="border rounded px-2 py-1 dark:text-gray-100"
          v-model="searchTerm" @input="$emit('search', searchTerm)" />
        <button class="bg-blue-500 hover:bg-blue-600 dark:bg-zinc-600 dark:hover:bg-zinc-500 text-white px-4 py-2 rounded" @click="$emit('nuevo-registro')">
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
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Se Unió en</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-zinc-200 dark:bg-zinc-800 dark:divide-zinc-700 dark:text-gray-100">
          <tr v-for="item in items" :key="item.id" :item="item" @editar="onEditar" @eliminar="onEliminar"
            @click="irADetalle(item.code)"
            class="hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer">
            <td class="px-6 py-4">{{ item.id }}</td>
            <td class="px-6 py-4">{{ item.code }}</td>
            <td class="px-6 py-4">{{ item.name }}</td>
            <td class="px-6 py-4">{{ nodeType(item.type) }}</td>
            <td class="px-6 py-4">{{ item.country }}</td>
            <td class="px-6 py-4">{{ item.city }}</td>
            <td class="px-6 py-4">{{ item.members_count == null ? 0 : item.members_count }}</td>
            <td class="px-6 py-4">{{ item.joined_in }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button class="text-blue-600 hover:text-blue-800 mr-2" @click="$emit('editar', item)">Editar</button>
              <button class="text-red-600 hover:text-red-800" @click="$emit('eliminar', item)">Eliminar</button>
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

const irADetalle = (code: string) => {
    router.push(`/root/nodo/${code}`);
};

const searchTerm = ref('');
const emits = defineEmits<{
  (e: 'editar', item: Nodes): void;
  (e: 'eliminar', item: Nodes): void;
}>();

function onEditar(item: Nodes) {
  emits('editar', item);
}

function onEliminar(item: Nodes) {
  emits('eliminar', item);
}
</script>