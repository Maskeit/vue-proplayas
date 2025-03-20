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
                <a href="#quienes-somos" @click.prevent="scrollToSection"
                    class="text-gray-800 dark:text-gray-200">Quiénes Somos</a>
                <router-link to="/Content" class="text-gray-800 dark:text-gray-200">Actividades</router-link>
                <router-link to="/Nodos" class="text-gray-800 dark:text-gray-200">Nodos</router-link>
                <!-- colocar user // login -->
                <div v-if="!token">
                    <router-link to="/Login"
                        class="bg-gray-200 p-3 rounded-lg text-gray-700 dark:text-black dark:hover:text-gray-700">Login</router-link>
                </div>
                <div v-else>
                    <Menu as="div" class="relative inline-block text-left">
                        <div>
                            <MenuButton
                                class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                                Usuario
                                <ChevronDownIcon class="-mr-1 size-5 text-gray-400" aria-hidden="true" />
                            </MenuButton>
                        </div>

                        <transition enter-active-class="transition ease-out duration-100"
                            enter-from-class="transform opacity-0 scale-95"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95">
                            <MenuItems
                                class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden">
                                <div class="py-1">
                                    <MenuItem v-slot="{ active }">
                                    <router-link :to="userRoute"
                                        :class="[active ? 'bg-gray-100 text-gray-900 outline-hidden' : 'text-gray-700', 'block px-4 py-2 text-sm']">Dashboard</router-link>
                                    </MenuItem>

                                    <MenuItem v-slot="{ active }">
                                    <button @click.prevent="logout"
                                        :class="[active ? 'bg-gray-100 text-gray-900 outline-hidden' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm']">Salir</button>
                                    </MenuItem>

                                </div>
                            </MenuItems>
                        </transition>
                    </Menu>
                </div>
                <!-- <DarkModeToggle /> -->
            </div>

            <!-- Botón para desplegar el menú en pantallas pequeñas -->
            <div class="md:hidden flex items-center gap-2">
                <!-- Botón de Modo Oscuro para móvil -->
                <!-- <DarkModeToggle /> -->
                <button @click="toggleMenu" type="button" class="text-gray-800 dark:text-gray-200 focus:outline-none">
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
            <div class="flex flex-col justify-center items-center text-center space-y-3 sm:px-4 py-4">
                <router-link to="/Home" class="block dark:text-gray-200">Inicio</router-link>
                <a href="#quienes-somos" @click.prevent="scrollToSection" class="block dark:text-gray-200">Quiénes
                    Somos</a>
                <router-link to="/Content" class="block dark:text-gray-200">Actividades</router-link>
                <router-link to="/Nodos" class="block dark:text-gray-200">Nodos</router-link>

                <!-- Si el usuario no está autenticado, mostrar Login -->
                <div v-if="!token">
                    <router-link to="/Login"
                        class="block bg-gray-200 p-3 rounded-lg text-gray-700 dark:text-black dark:hover:text-gray-400">
                        Login
                    </router-link>
                </div>

                <!-- Si el usuario está autenticado, mostrar el menú desplegable -->
                <div v-else>
                    <Menu as="div" class="relative inline-block text-left">
                        <div>
                            <MenuButton
                                class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                                Usuario
                                <ChevronDownIcon class="-mr-1 size-5 text-gray-400" aria-hidden="true" />
                            </MenuButton>
                        </div>

                        <transition enter-active-class="transition ease-out duration-100"
                            enter-from-class="transform opacity-0 scale-95"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95">
                            <MenuItems
                                class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden">
                                <div class="py-1">
                                    <MenuItem v-slot="{ active }">
                                    <router-link :to="userRoute"
                                        :class="[active ? 'bg-gray-100 text-gray-900 outline-hidden' : 'text-gray-700', 'block px-4 py-2 text-sm']">Dashboard</router-link>
                                    </MenuItem>

                                    <MenuItem v-slot="{ active }">
                                    <button @click.prevent="logout"
                                        :class="[active ? 'bg-gray-100 text-gray-900 outline-hidden' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm']">Salir</button>
                                    </MenuItem>

                                </div>
                            </MenuItems>
                        </transition>
                    </Menu>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DarkModeToggle from "@/components/shared/DarkModeToggle.vue";
import { decodeJWT } from '@/services/system';
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import { Authentication } from "@/services/Class/Authentication";
import Cookies from "js-cookie";
const isOpen = ref(false);
// Función para alternar el menú en móvil
function toggleMenu() {
    isOpen.value = !isOpen.value;
}
const isDropdownMobileOpen = ref(false);

const toggleDropdownMobile = () => {
    isDropdownMobileOpen.value = !isDropdownMobileOpen.value;
};
// Función para hacer scroll suave a "Quiénes Somos"
const scrollToSection = () => {
    const section = document.getElementById("quienes-somos");
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
};

const logout = async () => {
    const session = new Authentication();
    const success = await session.logout();
    if (success) {
        window.location.href = "/Login";
    } else {
        console.error("No se pudo cerrar sesión correctamente.");
    }
}
const userRoute = ref("");

const token = Cookies.get("Authorization") || localStorage.getItem("Authorization");
if (token) {
    const decodedData = decodeJWT(token);
    const role = decodedData.role;
    const nodeCode = localStorage.getItem("node_id"); // Assuming node_code is part of the decoded token

    if (role === "admin") {
        // Redirect to admin dashboard
        userRoute.value = "/root/nodos";
    } else if (role === "node_leader") {
        // Redirect to node leader dashboard
        userRoute.value = `/lider/${nodeCode}`;
    } else if (role === "member") {
        // Redirect to member dashboard
        userRoute.value = "/member";
    }
}
</script>