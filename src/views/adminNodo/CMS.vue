<template>
    <div>
      <!-- Encabezado del CMS con tabs o botones -->
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Gestión de Contenido</h1>
        <div class="flex space-x-4 mb-4">
          <router-link :to="`/nodo/${nodeId}/CMS/Webinar`" class="px-4 py-2 rounded"
            :class="{ 'bg-blue-500 text-white': isActive('CMSWebinar'), 'bg-gray-200 text-gray-700': !isActive('CMSWebinar') }">
            Webinars
          </router-link>
          <router-link :to="`/nodo/${nodeId}/CMS/Libros`" class="px-4 py-2 rounded"
            :class="{ 'bg-blue-500 text-white': isActive('CMSLibros'), 'bg-gray-200 text-gray-700': !isActive('CMSLibros') }">
            Libros
          </router-link>
          <router-link :to="`/nodo/${nodeId}/CMS/WebSeries`" class="px-4 py-2 rounded"
            :class="{ 'bg-blue-500 text-white': isActive('CMSWebSeries'), 'bg-gray-200 text-gray-700': !isActive('CMSWebSeries') }">
            WebSeries
          </router-link>
          <router-link :to="`/nodo/${nodeId}/CMS/Articulos`" class="px-4 py-2 rounded"
            :class="{ 'bg-blue-500 text-white': isActive('CMSArticulos'), 'bg-gray-200 text-gray-700': !isActive('CMSArticulos') }">
            Artículos
          </router-link>
        </div>
      </div>
      <!-- El router-view se envuelve en keep-alive para conservar el estado de cada panel -->
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const nodeId = computed(() => route.params.node_id);
  function isActive(name: string): boolean {
    return route.name === name;
  }
  </script>