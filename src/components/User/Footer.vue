<template>
    <!-- Footer con fondo gris oscuro y texto en blanco -->
    <footer class="bg-zinc-800 text-white py-4">
        <div class="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <!-- Información de copyright o datos del sitio -->
            <div class="mb-4 md:mb-0">
                <p class="text-sm">&copy; 2025 Proplayas. Todos los derechos reservados.</p>
            </div>
            <!-- Menú de navegación en el footer con los mismos enlaces -->
            <div class="flex space-x-4">
                <a href="/User/Profile" class="text-gray-300 hover:text-white">Perfil</a>
                <a href="/User/Content" class="text-gray-300 hover:text-white">Gestion de Contenido</a>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">

</script>

<style scoped>
/* Agrega aquí estilos adicionales si lo consideras necesario */
</style>