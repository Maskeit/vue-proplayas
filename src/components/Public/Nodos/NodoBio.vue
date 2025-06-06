<template>
    <div>
        <template v-if="isLoading">
            <BioSkeleton />
        </template>
        <template v-else-if="node">
            <div class="p-5 lg:p-10">
                <div
                    class="bg-white dark:bg-zinc-700 shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-[300px_minmax(600px,_1fr)] gap-6 relative">
                    <!-- Perfil: Foto y Nombre -->
                    <div class="flex flex-col items-center md:items-start">
                        <div class="space-y-4">
                            <img :src="coverUrl" alt="Foto de perfil"
                                class="md:w-48 md:h-48 w-32 h-32 rounded-full border-2 border-gray-300 object-cover" />
                        </div>
                        <div class="my-3 text-center md:text-left">
                            <h1 class="text-2xl font-semibold text-gray-500 dark:text-white">{{
                                node.name.charAt(0).toUpperCase() + node.name.slice(1) }}</h1>
                        </div>
                        <div class="max-w-lg">
                            <div class="flex gap-2">
                                <p class="text-gray-500 dark:text-white">{{ node.city.charAt(0).toUpperCase() +
                                    node.city.slice(1) }}, </p>
                                <p class="text-gray-500 dark:text-white">{{ node.country.charAt(0).toUpperCase() +
                                    node.country.slice(1) }}</p>
                                <MapPinIcon class="w-6 h-6 text-gray-500" />
                            </div>
                        </div>
                        <!-- fecha en que se unió -->
                        <p class="text-gray-400 dark:text-white text-center md:text-left">Se unió a proplayas en {{
                            node.joined_in }}</p>
                    </div>

                    <!-- Información sobre el nodo -->
                    <div class="flex flex-col justify-between">
                        <div class="max-w-lg">
                            <h1 class="text-2xl font-semibold text-gray-500 dark:text-white">Sobre el nodo</h1>
                            <p class="text-gray-600 dark:text-white">{{ node.about }}</p>
                        </div>

                        <!-- Redes Sociales -->
                        <div v-if="node?.social_media && Object.keys(node?.social_media).length"
                            class="mt-6 flex flex-wrap items-center gap-4">
                            <h2 class="text-lg font-semibold text-gray-500 dark:text-white">Redes Sociales:</h2>
                            <div class="flex flex-wrap gap-3">
                                <a v-for="link in node?.social_media" :key="link.platform" :href="link.url"
                                    target="_blank"
                                    class="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 transition">
                                    <component :is="getIconComponent(link.platform)" class="w-5 h-5" />
                                    {{ formatPlatform(link.platform) }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { GlobeAltIcon } from "@heroicons/vue/24/outline";
import { AcademicCapIcon, MapPinIcon } from "@heroicons/vue/24/solid";
import BioSkeleton from "@/components/shared/skeletons/BioSkeleton.vue";
import FacebookIcon from "@icons/FacebookIcon.vue";
import TwitterIcon from "@icons/TwitterIcon.vue";
import InstagramIcon from "@icons/InstagramIcon.vue";
import YoutubeIcon from "@icons/YoutubeIcon.vue";
import LinkedinIcon from "@icons/LinkedinIcon.vue";
import GithubIcon from "@icons/GithubIcon.vue";
import { Node } from "@interfaces/Nodes";
import { computed, onMounted, ref } from "vue";
import defaultImage from '@/assets/images/default/default_image.png';

import { useNodosStore } from '@stores/nodosStore';

import.meta.env.VITE_APP_PROFILE_COVER_URL;

// Props del componente
const props = defineProps<{ code: string }>();
const nodosStore = useNodosStore();

const node = ref<Node | null>(null);
const isLoading = ref(true);

const coverUrl = computed(() => {
    return node.value?.profile_picture
        ? `${import.meta.env.VITE_APP_PROFILE_COVER_URL}${node.value.profile_picture}`
        : defaultImage;
});

onMounted(async () => {
    isLoading.value = true;
    node.value = await nodosStore.fetchNodoInfo(props.code);
    isLoading.value = false;
});

// Función para formatear el nombre de la plataforma
const formatPlatform = (platform: string) => {
    return platform.charAt(0).toUpperCase() + platform.slice(1);
};
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


</script>