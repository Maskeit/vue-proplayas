<template>
    <!-- Contenedor del navbar con fondo blanco y sombra -->
    <nav class="bg-white shadow-md">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
            <!-- Logo y nombre del sitio -->
            <div class="flex items-center gap-4 text-xl font-bold">
                <img src="/proplayas_logo.svg" alt="Logo" class="h-14">
                <a href="/" class="text-gray-800 hover:text-gray-600">Proplayas</a>
            </div>
            <!-- Menú de navegación para pantallas medianas y grandes -->
            <div class="hidden md:flex space-x-4">
                <a href="/root/Crud" class="text-gray-600 hover:text-gray-800">Nodos</a>
                <a href="/root/CMS/Webinar" class="text-gray-600 hover:text-gray-800">Webinars</a>
                <a href="/root/CMS/Libros" class="text-gray-600 hover:text-gray-800">Libros</a>
                <a href="/root/CMS/WebSeries" class="text-gray-600 hover:text-gray-800">WebSeries</a>
                <a href="/root/CMS/Articulos" class="text-gray-600 hover:text-gray-800">Artículos</a>
            </div>
            <!-- Botón para desplegar el menú en pantallas pequeñas -->
            <div class="md:hidden">
                <button @click="toggleMenu" type="button" class="text-gray-600 hover:text-gray-800 focus:outline-none">
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <template v-if="!isOpen">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </template>
                        <template v-else>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </template>
                    </svg>
                </button>
            </div>
        </div>
        <!-- Menú móvil: se muestra solo en pantallas pequeñas -->
        <div v-if="isOpen" class="md:hidden">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="/root/Crud" class="block text-gray-600 hover:text-gray-800">Nodos</a>
                <a href="/root/CMS/Webinar" class="block text-gray-600 hover:text-gray-800">Webinars</a>
                <a href="/root/CMS/Libros" class="block text-gray-600 hover:text-gray-800">Libros</a>
                <a href="/root/CMS/WebSeries" class="block text-gray-600 hover:text-gray-800">WebSeries</a>
                <a href="/root/CMS/Articulos" class="block text-gray-600 hover:text-gray-800">Artículos</a>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// Variable reactiva para controlar la visibilidad del menú móvil
const isOpen = ref(false);

// Función para alternar el menú
function toggleMenu() {
    isOpen.value = !isOpen.value;
}
</script>

<style scoped>
/* Puedes agregar estilos adicionales si es necesario */
</style>