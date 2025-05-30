<template>
    <template v-if="isLoading">
        <ProfileSkeleton />
    </template>
    <template v-else-if="user">
        <div
            class="max-w-screen-lg xl:max-w-screen-md 2xl:max-w-screen-lg mx-auto px-4 md:p-7 py-6 flex flex-col gap-y-6">
            <!-- Perfil: Foto y Nombre -->
            <div class="flex flex-col justify-center items-center space-y-4 relative">
                <div class="relative w-32 h-32 md:w-48 md:h-48 group">
                    <img :src="coverUrl"
                        alt="Foto de perfil"
                        class="w-full h-full rounded-full border-2 border-gray-300 object-cover transition duration-300 group-hover:opacity-70" />
                    <button @click="openEditPhotoModal"
                        class="absolute inset-0 flex items-center  justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300"
                        aria-label="Editar foto">
                        <PencilIcon class="w-10 h-10 text-gray-500 bg-white bg-opacity-50 rounded-full p-1" />
                    </button>
                </div>
                <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">{{ user.name }}</h2>
            </div>
            <!-- Información básica -->
            <div
                class="bg-white dark:bg-zinc-600 text-gray-800 dark:text-gray-100 shadow-md rounded-lg p-6 flex flex-col gap-y-4">
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
                about: user.about,
                degree: user.degree,
                postgraduate: user.postgraduate,
                expertise_area: user.expertise_area,
                research_work: user.research_work,
                social_media: user.social_media
            }" @close="isEditProfileOpen = false" @update="updateProfile" />

            <EditProfilePhoto :isOpen="isEditNodoPhotoOpen" :userData="{
                image: null,
                preview: coverUrl
            }" @close="isEditNodoPhotoOpen = false" @uploadImg="uploadImg" />
        </div>
    </template>
    <Confirmation v-if="showConfirmation" :message="confirmationMessage" :type="confirmationType"
        @close="showConfirmation = false" />
</template>

<script setup lang="ts">
import ProfileSkeleton from '@/components/shared/skeletons/ProfileSkeleton.vue';
import Confirmation from '@/components/shared/modales/Confirmation.vue';
import { ref, computed, onMounted } from 'vue'
import { useUserProfileStore } from '@/services/Stores/ProfileStore';
import EditProfileBio from "@/components/User/Profile/EditProfileBio.vue";
import EditProfilePhoto from '@/components/User/Profile/EditProfilePhoto.vue';
import default_image from "@/assets/images/default/default_image.png";
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
const PROFILE_COVER_BASE_URL = import.meta.env.VITE_APP_PROFILE_COVER_URL;
const coverUrl = computed(() => {
    return user.value?.profile_picture
        ? `${PROFILE_COVER_BASE_URL}${user.value.profile_picture}`
        : default_image
});
const route = useRoute();
const username = route.params.username as string;
const userProfileStore = useUserProfileStore(); // Store de perfil
const user = computed(() => userProfileStore.profile); // Se obtiene del store
console.log("Usuario encontrado:", user);
const isLoading = ref(true);
const showConfirmation = ref(false);
const confirmationMessage = ref('');
const confirmationType = ref<'success' | 'error' | 'warning'>('success');
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
        phone: PhoneIcon
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

const isEditNodoPhotoOpen = ref(false);
const openEditPhotoModal = () => {
    isEditNodoPhotoOpen.value = true;
};
// Recibe y retransmite los datos al padre real (Profile.vue)
const updateProfile = async (data: any) => {
    try {
        isLoading.value = true;
        const status = await userProfileStore.updateProfile(data);
        if (status === 200) {
            confirmationMessage.value = 'Información actualizada correctamente';
            confirmationType.value = 'success';
            showConfirmation.value = true;
        } else {
            confirmationMessage.value = 'Error al actualizar la información';
            confirmationType.value = 'error';
            showConfirmation.value = true;
        }
    } catch (error) {
        console.error("Error al actualizar datos del usuario:", error);
    } finally {
        isLoading.value = false;
    }
}

// actualiza la foto de perfil
const uploadImg = async (imageFile: File | string) => {
    try {
        isLoading.value = true;
        if (typeof imageFile !== 'string') {
            const formData = new FormData();
            formData.append("image", imageFile);
            const { status, data } = await userProfileStore.uploadUserImage(formData);
            if (status === 200 && data?.profile_picture) {
                user.value.profile_picture = data.profile_picture;
                confirmationMessage.value = 'Imagen actualizada correctamente';
                confirmationType.value = 'success';
                showConfirmation.value = true;
            }
         }
    } catch (error) {
        console.error("Error al actualizar la imagen del nodo:", error);
    } finally {
        isLoading.value = false;
    }
};
</script>