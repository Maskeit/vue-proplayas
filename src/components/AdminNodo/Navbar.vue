<template>
    <!-- Contenedor del navbar con fondo blanco y sombra -->
    <nav class="fixed top-0 left-0 w-full z-50 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md backdrop-saturate-150 shadow-md">
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
                                    <MenuItem v-if="userRoute" v-slot="{ active }">
                                        <router-link :to="userRoute"
                                            :class="[active ? 'bg-gray-100 text-gray-900 outline-hidden' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                                            Dashboard
                                        </router-link>
                                    </MenuItem>

                                    <MenuItem v-if="userProfile" v-slot="{ active }">
                                        <router-link :to="userProfile"
                                            :class="[active ? 'bg-gray-100 text-gray-900 outline-hidden' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                                            Perfil
                                        </router-link>
                                    </MenuItem>

                                    <MenuItem v-slot="{ active }">
                                        <button @click.prevent="logout"
                                            :class="[active ? 'bg-gray-100 text-gray-900 outline-hidden' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm']">
                                            Salir
                                        </button>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </transition>
                    </Menu>
                </div>
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
                                    <MenuItem v-if="userRoute" v-slot="{ active }">
                                        <router-link :to="userRoute"
                                            :class="[active ? 'bg-gray-100 text-gray-900 outline-hidden' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                                            Dashboard
                                        </router-link>
                                    </MenuItem>

                                    <MenuItem v-if="userProfile" v-slot="{ active }">
                                        <router-link :to="userProfile"
                                            :class="[active ? 'bg-gray-100 text-gray-900 outline-hidden' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                                            Perfil
                                        </router-link>
                                    </MenuItem>

                                    <MenuItem v-slot="{ active }">
                                        <button @click.prevent="logout"
                                            :class="[active ? 'bg-gray-100 text-gray-900 outline-hidden' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm']">
                                            Salir
                                        </button>
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
import { ref, computed } from 'vue';
import { useRoute } from "vue-router";
import { decodeJWT } from '@/services/system';
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Authentication } from "@/services/Class/Authentication";
import Cookies from "js-cookie";

const isOpen = ref(false);

const route = useRoute();
// Función para alternar el menú
function toggleMenu() {
    isOpen.value = !isOpen.value;
}

const nodeId = localStorage.getItem("node_id");
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
const userProfile = ref("");
const token = Cookies.get("Authorization") || localStorage.getItem("Authorization");
if (token) {
    const decodedData = decodeJWT(token);
    const role = decodedData.role; // usado antes
    const nodeCode = localStorage.getItem("node_id"); // Assuming node_code is part of the decoded token
    const local_role = localStorage.getItem("role"); // Assuming role is stored in local storage member, node_leader // usado en pruebas
    if (local_role === "admin") {
        // Redirect to admin dashboard
        userRoute.value = "/root/nodos";
        userProfile.value = "/root/profile";
    } else if (local_role === "node_leader") {
        userRoute.value = `/lider/${nodeCode}`;
        userProfile.value = `/User/profile`;
    } else if (local_role === "member") {
        userProfile.value = "/User/profile";
    }
}

</script>