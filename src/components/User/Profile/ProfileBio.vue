<template>
    <div class="bg-white dark:bg-zinc-600 shadow-md rounded-lg p-6 flex items-center justify-between dark:text-gray-100">
        <div class="grid md:grid-cols-2 gap-3">
            <!-- Información básica -->
            <div class="mb-4">
                <h2 class="text-lg font-semibold">Sobre mí</h2>
                <p class=" mt-1">{{ about ? about : `Describe algo importante sobre ti para que los demas sepan quien eres.`}}</p>
            </div>

            <!-- Educación -->
            <div class="mb-4">
                <h2 class="text-lg font-semibold">Educación</h2>
                <p class=" mt-1"><strong>Grado:</strong> {{  degree ? degree : `Agregar un grado` }}</p>
                <p v-if="postgraduate"><strong>Postgrado:</strong> {{ postgraduate}}</p>
            </div>

            <!-- Área de especialización -->
            <div class="mb-4">
                <h2 class="text-lg font-semibold">Área de Especialización</h2>
                <p class=" mt-1">{{ expertiseArea ? expertiseArea : `Agregar área de especialización` }}</p>
            </div>
            <!-- Área de especialización -->
            <div class="mb-4">
                <h2 class="text-lg font-semibold">Trabajos de Investigación</h2>
                <p class=" mt-1">{{ researchWork }}</p>
            </div>

            <!-- Redes Sociales -->
            <div v-if="social_media && social_media.length" class="mt-4">
                <h2 class="text-lg font-semibold">Redes Sociales</h2>
                <div class="flex flex-wrap gap-3 mt-2">
                    <a v-for="link in social_media" :key="link.platform" :href="link.url" target="_blank"
                        class="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 transition">
                        <component :is="getIconComponent(link.platform)" class="w-5 h-5" />
                        {{ formatPlatform(link.platform) }}
                    </a>
                </div>
            </div>
        </div>
        <!-- Botón de Configuración abre el modal con un form para hacer cambios-->
        <button @click="openEditProfileModal"
            class="cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-500 transition"
            aria-label="Configuración">
            <PencilIcon class="w-6 h-6" />
        </button>
        <EditProfileBio :isOpen="isEditProfileOpen" :userData="{
            about,
            degree,
            postgraduate,
            expertise_area: expertiseArea,
            research_work: researchWork,
            social_media: social_media
        }" @close="isEditProfileOpen = false" @update="updateProfile" />
    </div>

</template>

<script setup lang="ts">
import { SocialLink } from "@interfaces/Profile";
import { GlobeAltIcon } from "@heroicons/vue/24/outline";
import { AcademicCapIcon, PencilIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";
import EditProfileBio from "./EditProfileBio.vue";

import FacebookIcon from "@icons/FacebookIcon.vue";
import TwitterIcon from "@icons/TwitterIcon.vue";
import InstagramIcon from "@icons/InstagramIcon.vue";
import YoutubeIcon from "@icons/YoutubeIcon.vue";
import LinkedinIcon from "@icons/LinkedinIcon.vue";
import GithubIcon from "@icons/GithubIcon.vue";
// Definir propiedades del componente
interface Props {
    about: string;
    degree: string;
    postgraduate?: string;
    expertiseArea: string;
    researchWork: string;
    social_media: SocialLink[];
}

defineProps<Props>();

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

const isEditProfileOpen = ref(false);

const openEditProfileModal = () => {
    isEditProfileOpen.value = true;
};

const updateProfile = (updatedData: { name: string; profile_picture: string }) => {
    console.log("Datos actualizados:", updatedData);
};
</script>