<template>
    <!-- Footer con fondo gris oscuro y texto en blanco -->
    <footer class="bg-gray-800 text-white py-4">
        <div class="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <!-- Información de copyright o datos del sitio -->
            <div class="mb-4 md:mb-0">
                <p class="text-sm">&copy; 2025 MiSitio. Todos los derechos reservados.</p>
            </div>
            <!-- Menú de navegación en el footer con los mismos enlaces -->
            <div class="flex space-x-4">
                <a href="/nodos" class="text-gray-300 hover:text-white">Nodos</a>
                <a href="/webinars" class="text-gray-300 hover:text-white">Webinars</a>
                <a href="/libros" class="text-gray-300 hover:text-white">Libros</a>
                <a href="/webseries" class="text-gray-300 hover:text-white">WebSeries</a>
                <a href="/articulos" class="text-gray-300 hover:text-white">Artículos</a>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">

</script>

<style scoped>
/* Agrega aquí estilos adicionales si lo consideras necesario */
</style>