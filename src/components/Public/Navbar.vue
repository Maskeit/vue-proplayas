<template>
    <!-- Contenedor del navbar con fondo blanco y sombra -->    
    <nav class="shadow-md bg-white dark:bg-[var(--color-eastern-blue-950)] !important">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
            <!-- Logo y nombre del sitio -->
            <div class="flex items-center gap-4 text-xl font-bold">
                <img src="/proplayas_logo.svg" alt="Logo" class="h-14">
                <a href="/" class="dark:text-gray-100 text-cyan-900">
                Proplayas
                </a>
            </div>
            
            <!-- Menú de navegación del user para pantallas medianas y grandes -->
            <div class="hidden md:flex space-x-4 items-center">
                <router-link to="/Home" class="text-gray-800 dark:text-gray-200 font-semibold">Inicio</router-link>                
                <a href="#quienes-somos" @click.prevent="scrollToSection" class="text-gray-800 dark:text-gray-200">Quiénes Somos</a>
                <router-link to="/Content" class="text-gray-800 dark:text-gray-200">Actividades</router-link>
                <!-- colocar user // login -->
                <router-link to="/Login" class="bg-gray-200 p-3 rounded-lg text-gray-700 dark:text-black dark:hover:text-gray-700">Login</router-link>
                <!-- <DarkModeToggle /> -->
            </div>

            <!-- Botón para desplegar el menú en pantallas pequeñas -->
            <div class="md:hidden flex items-center gap-2">
                <!-- Botón de Modo Oscuro para móvil -->
                <!-- <DarkModeToggle /> -->
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
            <div class="flex flex-col justify-center items-center text-center space-y-3 sm:px-4 py-4">
                <router-link to="/Home" class="block dark:text-gray-200">Inicio</router-link>
                <a href="#quienes-somos" @click.prevent="scrollToSection" class="block dark:text-gray-200">Quienes Somos</a>
                <router-link to="/Content" class="block dark:text-gray-200">Actividades</router-link>
                <router-link to="/Login" class="block bg-gray-200 p-3 rounded-lg text-gray-700 dark:text-black dark:hover:text-gray-400">Login</router-link>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DarkModeToggle from "@/components/shared/DarkModeToggle.vue";

const isOpen = ref(false);
// Función para alternar el menú en móvil
function toggleMenu() {
    isOpen.value = !isOpen.value;
}

// Función para hacer scroll suave a "Quiénes Somos"
const scrollToSection = () => {
    const section = document.getElementById("quienes-somos");
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
};

</script>