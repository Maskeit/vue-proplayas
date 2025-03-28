<template>
    <!-- Contenedor del navbar con fondo blanco y sombra -->
    <nav class="fixed top-0 left-0 w-full z-50 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md backdrop-saturate-150 shadow-md">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
            <!-- Logo y nombre del sitio -->
            <div class="flex items-center gap-4 text-xl font-bold">
                <img src="/proplayas_logo.svg" alt="Logo" class="h-14">
                <a href="/" class="dark:text-gray-100 text-cyan-900">Proplayas</a>
            </div>
            
            <!-- Menú de navegación del admin root para pantallas medianas y grandes -->            
            <div class="hidden md:flex space-x-4 items-center">
                <router-link to="/root/nodos" class="text-gray-800 dark:text-gray-200 font-semibold">Nodos</router-link>
                <router-link to="/root/Webinar" class="text-gray-800 dark:text-gray-200">Webinars</router-link>
                <router-link to="/root/Libros" class="text-gray-800 dark:text-gray-200">Libros</router-link>
                <router-link to="/root/WebSeries" class="text-gray-800 dark:text-gray-200">Web Series</router-link>
                <router-link to="/root/Articulos" class="text-gray-800 dark:text-gray-200">Artículos</router-link>
            </div>
            <!-- Botón para desplegar el menú en pantallas pequeñas -->
            <div class="md:hidden flex items-center gap-2">
                <!-- Botón de Modo Oscuro para móvil -->
                <button @click="toggleMenu" type="button" class="text-gray-800 dark:text-gray-200 focus:outline-none">
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
                <router-link to="/root/nodos" class="block text-gray-800 dark:text-gray-200">Nodos</router-link>
                <router-link to="/root/Webinar" class="block text-gray-800 dark:text-gray-200">Webinars</router-link>
                <router-link to="/root/Libros" class="block text-gray-800 dark:text-gray-200">Libros</router-link>
                <router-link to="/root/WebSeries" class="block text-gray-800 dark:text-gray-200">WebSeries</router-link>
                <router-link to="/root/Articulos" class="block text-gray-800 dark:text-gray-200">Artículos</router-link>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);

// Función para alternar el menú
function toggleMenu() {
    isOpen.value = !isOpen.value;
}
</script>