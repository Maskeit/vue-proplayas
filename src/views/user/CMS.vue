<template>
    <div class="max-w-9/10 m-auto md:p-7 pt-6 flex flex-col gap-y-6">
        <!-- Encabezado del CMS con tabs o botones -->
        <div class="p-4 bg-white dark:bg-[var(--color-dark-bg)] shadow-md rounded-lg">
            <h1 class="max-w-9/10 text-2xl font-bold mb-4 dark:text-[var(--color-dark-text)]">Gestión de Contenido</h1>
            <div class="flex space-x-4 mb-4">
                <router-link to="/User/Webinar" class="px-4 py-2 rounded"
                    :class="{ 'bg-blue-500 text-white': isActive('CMSWebinar'), 'bg-gray-200 text-gray-700': !isActive('CMSWebinar') }">
                    Webinars
                </router-link>
                <router-link to="/User/Libros" class="px-4 py-2 rounded"
                    :class="{ 'bg-blue-500 text-white': isActive('CMSLibros'), 'bg-gray-200 text-gray-700': !isActive('CMSLibros') }">
                    Libros
                </router-link>
                <router-link  to="/User/WebSeries" class="px-4 py-2 rounded"
                    :class="{ 'bg-blue-500 text-white': isActive('CMSWebSeries'), 'bg-gray-200 text-gray-700': !isActive('CMSWebSeries') }">
                    WebSeries
                </router-link>
                <router-link to="/User/Articulos" class="px-4 py-2 rounded"
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
<!-- Este es el CMS de User -->
<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
function isActive(name: string): boolean {
    return route.name === name;
}
</script>