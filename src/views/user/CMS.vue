<template>
    <div class="max-w-9/10 m-auto md:p-7 pt-6 flex flex-col gap-y-6">
        <!-- Encabezado del CMS con tabs o botones -->
        <div class="flex sm:flex-row flex-col border-b border-gray-300 dark:border-gray-700">
            <router-link to="/User/Content/Webinar"
                class="px-6 py-3 text-gray-500 dark:text-gray-400 text-sm font-medium transition-all"
                :class="{ 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-semibold': isActive('CMSWebinar'), 'hover:text-gray-700 dark:hover:text-gray-300': !isActive('CMSWebinar') }">
                Webinars
            </router-link>
            <router-link to="/User/Content/Libros"
                class="px-6 py-3 text-gray-500 dark:text-gray-400 text-sm font-medium transition-all"
                :class="{ 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-semibold': isActive('CMSLibros'), 'hover:text-gray-700 dark:hover:text-gray-300': !isActive('CMSLibros') }">
                Libros
            </router-link>
            <router-link to="/User/Content/WebSeries"
                class="px-6 py-3 text-gray-500 dark:text-gray-400 text-sm font-medium transition-all"
                :class="{ 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-semibold': isActive('CMSWebSeries'), 'hover:text-gray-700 dark:hover:text-gray-300': !isActive('CMSWebSeries') }">
                Web Series
            </router-link>
            <router-link to="/User/Content/Articulos"
                class="px-6 py-3 text-gray-500 dark:text-gray-400 text-sm font-medium transition-all"
                :class="{ 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-semibold': isActive('CMSArticulos'), 'hover:text-gray-700 dark:hover:text-gray-300': !isActive('CMSArticulos') }">
                Artículos
            </router-link>
            <router-link to="/User/Content/Proyectos"
                class="px-6 py-3 text-gray-500 dark:text-gray-400 text-sm font-medium transition-all"
                :class="{ 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-semibold': isActive('CMSProyectos'), 'hover:text-gray-700 dark:hover:text-gray-300': !isActive('CMSProyectos') }">
                Proyectos
            </router-link>
        </div> 
        <!-- El router-view se envuelve en keep-alive para conservar el estado de cada panel -->
        <keep-alive>
            <router-view />
        </keep-alive>
    </div>
</template>
<!-- Este es el CMS de User -->
<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
function isActive(name: string): boolean {
    return route.name === name;
}
</script>
