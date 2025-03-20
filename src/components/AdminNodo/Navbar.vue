<template>
    <!-- Contenedor del navbar con fondo blanco y sombra -->
    <nav class="bg-white dark:bg-[var(--color-dark-bg)] shadow-md">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
            <!-- Logo y nombre del sitio -->
            <div class="flex items-center gap-4 text-xl font-bold">
                <img src="/proplayas_logo.svg" alt="Logo" class="h-14">
                <a href="/" class="dark:text-gray-100 text-cyan-900">Proplayas</a>
            </div>
            
            <!-- Menú de navegación del admin nodo para pantallas medianas y grandes -->
            <div class="hidden md:flex space-x-4 items-center">
                <router-link :to="`/lider/${nodeId}`" class="text-gray-800 dark:text-gray-200 dark:hover:text-gray-400 font-semibold">Miembros</router-link>
                <router-link :to="`/lider/${nodeId}/Webinar`" class="text-gray-800 dark:text-gray-200 dark:hover:text-gray-400">Webinars</router-link>
                <router-link :to="`/lider/${nodeId}/Libros`" class="text-gray-800 dark:text-gray-200 dark:hover:text-gray-400">Libros</router-link>
                <router-link :to="`/lider/${nodeId}/WebSeries`" class="text-gray-800 dark:text-gray-200 dark:hover:text-gray-400">Web Series</router-link>
                <router-link :to="`/lider/${nodeId}/Articulos`" class="text-gray-800 dark:text-gray-200 dark:hover:text-gray-400">Artículos</router-link>                
            </div>

            <!-- Botón para desplegar el menú en pantallas pequeñas -->
            <div class="md:hidden flex items-center gap-2">
                <!-- Botón de Modo Oscuro para móvil -->                
                <button @click="toggleMenu" type="button" class="text-gray-800 dark:text-gray-200 dark:hover:text-gray-400 focus:outline-none">
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <template v-if="!isOpen">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </template>
                        <template v-else>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </template>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Menú móvil: se muestra solo en pantallas pequeñas -->
        <div v-if="isOpen" class="md:hidden">
            <div class="flex flex-col justify-center items-center text-center space-y-3 sm:px-4">
                <router-link :to="`/nodo/${nodeId}`" class="block text-gray-800 dark:text-gray-200 dark:hover:text-gray-400">Perfil</router-link>
                <router-link :to="`/nodo/${nodeId}/Webinar`" class="block text-gray-800 dark:text-gray-200 dark:hover:text-gray-400">Webinars</router-link>
                <router-link :to="`/nodo/${nodeId}/Libros`" class="block text-gray-800 dark:text-gray-200 dark:hover:text-gray-400">Libros</router-link>
                <router-link :to="`/nodo/${nodeId}/WebSeries`" class="block text-gray-800 dark:text-gray-200 dark:hover:text-gray-400">WebSeries</router-link>
                <router-link :to="`/nodo/${nodeId}/Articulos`" class="block text-gray-800 dark:text-gray-200 dark:hover:text-gray-400">Artículos</router-link>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from "vue-router";

const route = useRoute();
const isOpen = ref(false);

// Obtenemos el nodeId dinámico desde la URL
const nodeId = localStorage.getItem("node_id"); // Assuming node_code is part of the decoded token

//const nodeId = computed(() => route.params.node_id);

// Función para alternar el menú
function toggleMenu() {
    isOpen.value = !isOpen.value;
}
</script>

<style scoped>
/* Puedes agregar estilos adicionales si es necesario */
</style>