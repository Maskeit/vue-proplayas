<template>
    <template v-if="isLoading">
        <ProfileSkeleton />
    </template>
    <template v-else-if="user">
        <div
            class="max-w-screen-lg xl:max-w-screen-md 2xl:max-w-screen-lg mx-auto px-4 md:p-7 py-6 flex flex-col gap-y-6">
            <!-- Perfil: Foto y Nombre -->
            <div class="flex flex-col justify-center items-center space-y-4 relative">
                <div class="relative">
                    <img :src="`/src/assets/images/nodos/proplayas.svg`" alt="Foto de perfil"
                        class="md:w-40 md:h-40 w-32 h-32 rounded-full border-2 border-gray-300 object-cover" />
                </div>
                <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">{{ user.name }}</h2>
            </div>
            <!-- Información básica -->
            <div class="bg-white dark:bg-zinc-600 text-gray-800 dark:text-gray-100 shadow-md rounded-lg p-6 flex flex-col gap-y-4">
                <div class="flex justify-between items-center">
                    <h2 class="text-xl font-semibold">Mi Biografía</h2>
                    <button @click="openEditProfileModal"
                        class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-500 transition"
                        aria-label="Editar Biografía">
                        <PencilIcon class="w-5 h-5" />
                    </button>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-lg font-semibold">Sobre mí</h3>
                        <p class="mt-1 whitespace-pre-wrap">{{ user.about }}</p>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold">Educación</h3>
                        <p class="mt-1"><strong>Grado:</strong> {{ user.degree }}</p>
                        <p v-if="user.postgraduate"><strong>Postgrado:</strong> {{ user.postgraduate }}</p>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold">Área de Especialización</h3>
                        <p class="mt-1">{{ user.expertise_area }}</p>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold">Trabajos de Investigación</h3>
                        <p class="mt-1">{{ user.research_work }}</p>
                    </div>

                    <div v-if="user.social_media && Object.keys(user.social_media).length" class="md:col-span-2 mt-4">
                        <h3 class="text-lg font-semibold text-gray-500 dark:text-white">Redes Sociales</h3>
                        <div class="flex flex-wrap gap-3 mt-2">
                            <a v-for="link in user.social_media" :key="link.platform" :href="link.url" target="_blank"
                                class="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 transition">
                                <component :is="getIconComponent(link.platform)" class="w-5 h-5" />
                                {{ formatPlatform(link.platform) }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <EditProfileBio :isOpen="isEditProfileOpen" :userData="{
                name: user.name,
                profile_picture: user.profile_picture,
                about: user.about,
                degree: user.degree,
                postgraduate: user.postgraduate,
                expertise_area: user.expertise_area,
                research_work: user.research_work,
                social_media: user.social_media
            }" @close="isEditProfileOpen = false" @update="updateProfile" />
        </div>
    </template>
</template>

<script setup lang="ts">
import ProfileSkeleton from '@/components/shared/skeletons/ProfileSkeleton.vue';
import Confirmation from '@/components/shared/modales/Confirmation.vue';
import { ref, computed, onMounted } from 'vue'
import { useUserProfileStore } from '@/services/Stores/ProfileStore';
import EditProfileBio from "@/components/User/Profile/EditProfileBio.vue";
// Icons
import FacebookIcon from "@icons/FacebookIcon.vue";
import TwitterIcon from "@icons/TwitterIcon.vue";
import InstagramIcon from "@icons/InstagramIcon.vue";
import YoutubeIcon from "@icons/YoutubeIcon.vue";
import LinkedinIcon from "@icons/LinkedinIcon.vue";
import GithubIcon from "@icons/GithubIcon.vue";
import { GlobeAltIcon, AcademicCapIcon, PencilIcon, PhoneIcon } from "@heroicons/vue/24/outline";

// Estados
import { useRoute } from "vue-router";
const route = useRoute();
const username = route.params.username as string;
const userProfileStore = useUserProfileStore(); // Store de perfil
const user = computed(() => userProfileStore.profile); // Se obtiene del store
const isLoading = ref(true);
const showConfirmation = ref(false);
// Computed para encontrar el usuario actual
onMounted(async () => {
    try {
        isLoading.value = true;
        await userProfileStore.fetchAndSetProfile();
    } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
    } finally {
        isLoading.value = false;
    }
});
// Función para mapear plataformas a iconos
const getIconComponent = (platform: string) => {
    const icons: Record<string, any> = {
        linkedin: LinkedinIcon,
        github: GithubIcon,
        twitter: TwitterIcon,
        website: GlobeAltIcon,
        facebook: FacebookIcon,
        instagram: InstagramIcon,
        research_gate: AcademicCapIcon,
        youtube: YoutubeIcon,
        phone : PhoneIcon
    };
    return icons[platform] || GlobeAltIcon;
};

// Función para formatear el nombre de la plataforma
const formatPlatform = (platform: string) => {
    return platform.charAt(0).toUpperCase() + platform.slice(1);
};
const isEditProfileOpen = ref(false);

const openEditProfileModal = () => {
    isEditProfileOpen.value = true;
};

// Recibe y retransmite los datos al padre real (Profile.vue)
const updateProfile = async (data: any) => {
    try {
        isLoading.value = true;
        const status = await userProfileStore.updateProfile(data);
        if (status === 200) {
            showConfirmation.value = true;
        }
    } catch (error) {
        console.error("Error al actualizar datos del usuario:", error);
    } finally {
        isLoading.value = false;
    }
}
</script>