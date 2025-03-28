<template>
    <div class="p-5 lg:p-10">
        <div class="bg-white dark:bg-gray-500 shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-[300px_minmax(600px,_1fr)] gap-6 relative">
            <!-- Botón de Configuración -->
            <button @click="openEditProfileModal"
                class="absolute top-4 right-4 p-2 rounded-full bg-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                aria-label="Configuración">
                <PencilIcon class="w-6 h-6 text-gray-500" />
            </button>

            <!-- Perfil: Foto y Nombre -->
            <div class="flex flex-col items-center md:items-start">
                <div class="space-y-4">
                    <img :src="`/src/assets/images/nodos/playa.jpg`" alt="Foto de perfil"
                        class="md:w-48 md:h-48 w-32 h-32 rounded-full border-2 border-gray-300 object-cover" />
                </div>
                <div class="my-3 text-center md:text-left">
                    <h1 class="text-2xl font-semibold text-gray-500 dark:text-white">{{ name }}</h1>
                </div>
                <div class="max-w-lg">
                    <div class="flex gap-2">
                        <p class="text-gray-500 dark:text-white">{{ city }}, </p>
                        <p class="text-gray-500 dark:text-white">{{ country }}</p>
                        <MapPinIcon class="w-6 h-6 text-gray-500" />
                    </div>
                </div>
                <!-- fecha en que se unió -->
                <p class="text-gray-400 dark:text-white text-center md:text-left">Se unió a proplayas en {{ joined_in }}</p>
            </div>

            <!-- Información sobre el nodo -->
            <div class="flex flex-col justify-between">
                <div class="max-w-lg">
                    <h1 class="text-2xl font-semibold text-gray-500 dark:text-white">Sobre el nodo</h1>
                    <p class="text-gray-600 dark:text-white">{{ about }}</p>
                </div>
                <!-- Redes Sociales -->
                <div v-if="social_media && social_media.length" class="mt-6 flex flex-wrap items-center gap-4">
                    <h2 class="text-lg font-semibold text-gray-500 dark:text-white">Redes Sociales:</h2>
                    <div class="flex flex-wrap gap-3">
                        <a v-for="link in social_media" :key="link.platform" :href="link.url" target="_blank"
                            class="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 transition">
                            <component :is="getIconComponent(link.platform)" class="w-5 h-5" />
                            {{ formatPlatform(link.platform) }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <EditNodoBio :isOpen="isEditNodoOpen" :nodeData ="{
            name,
            about,
            profile_picture,
            social_media: social_media,
        }" @close="isEditNodoOpen = false" @update="updateNode" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { SocialLink } from "@/interfaces/Profile";
import { GlobeAltIcon } from "@heroicons/vue/24/outline";
import {  AcademicCapIcon, PencilIcon, MapPinIcon } from "@heroicons/vue/24/solid";
import EditNodoBio from "@/components/AdminNodo/nodo/EditNodoBio.vue";

import FacebookIcon from "@icons/FacebookIcon.vue";
import TwitterIcon from "@icons/TwitterIcon.vue";
import InstagramIcon from "@icons/InstagramIcon.vue";
import YoutubeIcon from "@icons/YoutubeIcon.vue";
import LinkedinIcon from "@icons/LinkedinIcon.vue";
import GithubIcon from "@icons/GithubIcon.vue";

interface Props {
    name: string;
    about: string;
    joined_in: number;
    profilePicture: string;
    social_media: SocialLink[];
    country: string;
    city: string;
}

defineProps<Props>();
const emit = defineEmits(["updateNodeData"]);

// Función para mapear plataformas a iconos
const getIconComponent = (platform: string) => {
    const icons: Record<string, any> = {
        linkedin: LinkedinIcon,
        github: GithubIcon,
        twitter: TwitterIcon,
        website: GlobeAltIcon, // Icono genérico para sitios web
        facebook: FacebookIcon,
        instagram: InstagramIcon,
        research_gate: AcademicCapIcon, // Icono genérico para ResearchGate
        youtube: YoutubeIcon,
    };
    return icons[platform] || GlobeAltIcon; // Por defecto, usa GlobeAltIcon
};

// Función para formatear el nombre de la plataforma
const formatPlatform = (platform: string) => {
    return platform.charAt(0).toUpperCase() + platform.slice(1);
};

const isEditNodoOpen = ref(false);

const openEditProfileModal = () => {
    isEditNodoOpen.value = true;
};
const updateNode = (updatedData: { name: string; about: string; profile_picture: string; social_media?: SocialLink[] }) => {
    console.log("Datos actualizados:", updatedData);
    emit("updateNodeData", updatedData); // Emitir evento con los datos actualizados
};
</script>