<template>
    <div class="p-5 lg:p-10">
        <div
            class="bg-white dark:bg-zinc-700 shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-[300px_minmax(600px,_1fr)] gap-6 relative">
            <!-- Botón de Configuración -->
            <button @click="openEditProfileModal"
                class="absolute top-4 right-4 p-2 rounded-full bg-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                aria-label="Configuración">
                <PencilIcon class="w-6 h-6 text-gray-500" />
            </button>

            <!-- Perfil: Foto y Nombre -->
            <div class="flex flex-col items-center md:items-start">
                <div class="relative w-32 h-32 md:w-48 md:h-48 group">
                    <img :src="coverUrl" alt="Foto de perfil"
                        class="w-full h-full rounded-full border-2 border-gray-300 object-cover transition duration-300 group-hover:opacity-70" />
                    <button @click="openEditPhotoModal"
                        class="absolute inset-0 flex items-center  justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300"
                        aria-label="Editar foto">
                        <PencilIcon class="w-10 h-10 text-gray-500 bg-white bg-opacity-50 rounded-full p-1" />
                    </button>
                </div>

                <div class="my-3 text-center md:text-left">
                    <h1 class="text-2xl font-semibold text-gray-500 dark:text-white">{{
                        props.name.charAt(0).toUpperCase() +
                        props.name.slice(1) }}</h1>
                </div>
                <div class="max-w-lg">
                    <div class="flex gap-2">
                        <p class="text-gray-500 dark:text-white">{{ props.city.charAt(0).toUpperCase() +
                            props.city.slice(1) }},
                        </p>
                        <p class="text-gray-500 dark:text-white">{{ props.country.charAt(0).toUpperCase() +
                            props.country.slice(1)
                            }}</p>
                        <MapPinIcon class="w-6 h-6 text-gray-500" />
                    </div>
                </div>
                <!-- fecha en que se unió -->
                <p class="text-gray-400 dark:text-white text-center md:text-left">Se unió a proplayas en {{
                    props.joined_in }}</p>
            </div>

            <!-- Información sobre el nodo -->
            <div class="flex flex-col justify-between">
                <div class="max-w-lg">
                    <h1 class="text-2xl font-semibold text-gray-500 dark:text-white">Sobre el nodo</h1>
                    <p class="text-gray-600 dark:text-white">{{ props.about }}</p>
                </div>
                <!-- Redes Sociales -->
                <div v-if="props.social_media && Object.keys(props.social_media).length"
                    class="mt-6 flex flex-wrap items-center gap-4">
                    <h2 class="text-lg font-semibold text-gray-500 dark:text-white">Redes Sociales:</h2>
                    <div class="flex flex-wrap gap-3">
                        <a v-for="link in props.social_media" :key="link.platform" :href="link.url" target="_blank"
                            class="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 transition">
                            <component :is="getIconComponent(link.platform)" class="w-5 h-5" />
                            {{ formatPlatform(link.platform) }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <EditNodoBio :isOpen="isEditNodoOpen" :nodeData="{
            name: props.name,
            about: props.about,
            social_media: props.social_media,
        }" @close="isEditNodoOpen = false" @update="updateNode" />
        <EditNodePhoto :isOpen="isEditNodoPhotoOpen" :nodeData="{
            image: null,
            preview: coverUrl,
        }" @close="isEditNodoPhotoOpen = false" @uploadImg="uploadImg" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Leader } from "@interfaces/Nodes";
import { SocialLink } from "@/interfaces/Profile";
import { GlobeAltIcon } from "@heroicons/vue/24/outline";
import { AcademicCapIcon, PencilIcon, MapPinIcon } from "@heroicons/vue/24/solid";
import EditNodoBio from "@/components/AdminNodo/nodo/EditNodoBio.vue";
import EditNodePhoto from "@/components/AdminNodo/nodo/EditNodePhoto.vue";

import FacebookIcon from "@icons/FacebookIcon.vue";
import TwitterIcon from "@icons/TwitterIcon.vue";
import InstagramIcon from "@icons/InstagramIcon.vue";
import YoutubeIcon from "@icons/YoutubeIcon.vue";
import LinkedinIcon from "@icons/LinkedinIcon.vue";
import GithubIcon from "@icons/GithubIcon.vue";

const PROFILE_COVER_BASE_URL = import.meta.env.VITE_APP_PROFILE_COVER_URL;
interface Props {
    name: string;
    about: string;
    joined_in: number;
    profilePicture: string;
    social_media: SocialLink[];
    leader: Leader;
    country: string;
    city: string;
}

const props = defineProps<Props>();
const coverUrl = computed(() => `${import.meta.env.VITE_APP_PROFILE_COVER_URL}${props.profilePicture}`);

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

const isEditNodoPhotoOpen = ref(false);
const openEditPhotoModal = () => {
    isEditNodoPhotoOpen.value = true;
};
// Recibe y retransmite los datos al padre real (NodoPrivado.vue)
const emit = defineEmits(["update", "uploadImg"]);

const updateNode = (updatedData: any) => {
    emit("update", updatedData);
};
const uploadImg = (newImageName: string) => {
    emit("uploadImg", newImageName);
};
</script>