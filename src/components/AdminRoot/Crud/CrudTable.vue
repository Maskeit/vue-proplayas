<template>
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">País</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ciudad</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Miembros</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">email</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actividad</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <CrudTableRow 
          v-for="item in items" 
          :key="item.id" 
          :item="item" 
          @editar="onEditar"
          @eliminar="onEliminar"
        />
      </tbody>
    </table>
  </template>
  
  <script setup lang="ts">
  import CrudTableRow from './CrudTableRow.vue';
  import type { Nodes } from '@/interfaces/Nodes'; // Ejemplo de interface para un Nodes
  
  const props = defineProps<{
    items: Nodes[];
  }>();
  
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