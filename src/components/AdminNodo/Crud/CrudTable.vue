<template>
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Node id</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Linea de Investigación</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Area de trabajo</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <CrudTableRow v-for="item in items" :key="item.id" :item="item" @editar="onEditar" @eliminar="onEliminar" />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import CrudTableRow from './CrudTableRow.vue';
import { Members } from '@/interfaces/Members'; // Ejemplo de interface para un Members

const props = defineProps<{
  items: Members[];
}>();
const emits = defineEmits<{
  (e: 'editar', item: Members): void;
  (e: 'eliminar', item: Members): void;
}>();

function onEditar(item: Members) {
  emits('editar', item);
}

function onEliminar(item: Members) {
  emits('eliminar', item);
}
</script>