<template>
    <!-- Footer con fondo gris oscuro y texto en blanco -->
    <footer class="bg-[var(--color-eastern-blue-950)] text-white py-4">
        <div class="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <!-- Información de copyright o datos del sitio -->
            <div class="mb-4 md:mb-0">
                <p class="text-sm">&copy; 2025 Proplayas. Todos los derechos reservados.</p>
            </div>
            <!-- Menú de navegación en el footer con los mismos enlaces -->
            <div class="flex space-x-4">
                <router-link to="/root/nodos" class="text-gray-300 hover:text-white">Nodos</router-link>
                <router-link to="/root/Webinar" class="text-gray-300 hover:text-white">Webinars</router-link>
                <router-link to="/root/Libros" class="text-gray-300 hover:text-white">Libros</router-link>
                <router-link to="/root/WebSeries" class="text-gray-300 hover:text-white">WebSeries</router-link>
                <router-link to="/root/Articulos" class="text-gray-300 hover:text-white">Artículos</router-link>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">

</script>

<style scoped>
/* Agrega aquí estilos adicionales si lo consideras necesario */
</style>