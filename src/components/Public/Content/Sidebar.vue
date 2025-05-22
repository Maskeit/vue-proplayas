<template>    
    <aside :class="['relative transition-all duration-300 bg-white dark:bg-zinc-900 text-gray-800 dark:text-white h-[calc(100vh-72px)]', isCollapsed ? 'w-18' : 'w-46']">
    <!-- Botón para colapsar/desplegar manualmente -->
    <div :class="`flex ${isCollapsed ? 'justify-center' : 'justify-end'} p-2`">
      <button @click="toggleSidebar" class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700">
        <XMarkIcon v-if="!isCollapsed" :class="['w-5 h-5 transition-transform']"/>
        <ChevronDoubleLeftIcon v-else :class="['w-5 h-5 transition-transform', isCollapsed ? 'rotate-180' : '']"/>
      </button>
    </div>

      <!-- Navegación -->
    <nav class="flex flex-col gap-2 mt-4 px-2">
      <SidebarItem :icon="PresentationChartBarIcon" text="Eventos" to="/Content/events" :showText="!isCollapsed" />
      <SidebarItem :icon="FilmIcon" text="Web Series" to="/Content/webseries" :showText="!isCollapsed" />
      <SidebarItem :icon="DocumentTextIcon" text="Publicaciones" to="/Content/publicaciones" :showText="!isCollapsed" />
      <SidebarItem :icon="BookOpenIcon" text="Libros" to="/Content/libros" :showText="!isCollapsed" />
      <SidebarItem :icon="GlobeAmericasIcon" text="Proyectos" to="/Content/Proyectos" :showText="!isCollapsed" />
      <select class="bg-white dark:bg-zinc-700 shadow-md rounded-lg p-1 border border-gray-200 dark:border-none hover:shadow-lg transition cursor-pointer">
        <option value="0" disabled selected>Filtra por nodo</option>
        <option value="1">Opción 1</option>
        <option value="2">Opción 2</option>
        <option value="3">Opción 3</option>
      </select>
    </nav>
    </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
    Bars3Icon,
    ChevronDoubleLeftIcon,
    XMarkIcon,
    PresentationChartBarIcon,
    FilmIcon,
    DocumentTextIcon,
    BookOpenIcon,
    GlobeAmericasIcon,
} from '@heroicons/vue/24/outline'
import SidebarItem from './SidebarItem.vue'

const isExpanded = ref(false)
const isCollapsed = ref(false)
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const handleExpand = () => {
  if (window.innerWidth >= 768) isCollapsed.value = false
}
const handleCollapse = () => {
  if (window.innerWidth >= 768) isCollapsed.value = true
}
</script>