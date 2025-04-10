<template>
  <template v-if="isLoading">
    <ProfileSkeleton />
  </template>
  <template v-else-if="user">
    <div class="max-w-screen-lg xl:max-w-screen-md 2xl:max-w-screen-lg mx-auto px-4 md:p-7 py-6 flex flex-col gap-y-6">
      <!-- Verifica si el usuario existe -->
      <!-- Perfil: Foto y Nombre -->
      <div class="flex flex-col justify-center items-center space-y-4">
        <img :src="`/src/assets/images/nodos/proplayas.svg`" alt="Foto de perfil"
          class="md:w-40 md:h-40 w-24 h-24 rounded-full border-2 border-gray-300 object-cover" />
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">{{ user.name }}</h2>
      </div>

      <!-- Información básica -->
      <div
        class="bg-white dark:bg-zinc-600 text-gray-800 dark:text-gray-100 shadow-md rounded-lg p-6 flex flex-col gap-y-4">
        <div class="grid md:grid-cols-2 gap-3">
          <div class="mb-4">
            <h2 class="text-lg font-semibold">Sobre mí</h2>
            <p class="mt-1">{{ user.about }}</p>
          </div>
          <div class="mb-4">
            <h2 class="text-lg font-semibold">Educación</h2>
            <p class="mt-1"><strong>Grado:</strong> {{ user.degree }}</p>
            <p v-if="user.postgraduate"><strong>Postgrado:</strong> {{ user.postgraduate }}</p>
          </div>

          <div class="mb-4">
            <h2 class="text-lg font-semibold">Área de Especialización</h2>
            <p class="mt-1">{{ user.expertise_area }}</p>
          </div>

          <div class="mb-4">
            <h2 class="text-lg font-semibold">Trabajos de Investigación</h2>
            <p class="mt-1">
              {{ user.research_work }}
            </p>
          </div>

          <!-- Redes Sociales -->
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
    </div>
  </template>
  <template v-else>
    <div class="text-center text-gray-500 dark:text-gray-300 py-10">
      El perfil no fue encontrado.
    </div>
  </template>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref, computed } from 'vue';
import ProfileSkeleton from '@/components/shared/skeletons/ProfileSkeleton.vue';
import FacebookIcon from "@icons/FacebookIcon.vue";
import TwitterIcon from "@icons/TwitterIcon.vue";
import InstagramIcon from "@icons/InstagramIcon.vue";
import YoutubeIcon from "@icons/YoutubeIcon.vue";
import LinkedinIcon from "@icons/LinkedinIcon.vue";
import GithubIcon from "@icons/GithubIcon.vue";
import { GlobeAltIcon, AcademicCapIcon } from "@heroicons/vue/24/outline";
import { useUserProfileStore } from '@/services/Stores/ProfileStore';

// estados
const route = useRoute();
const username = route.params.username as string;
const userProfileStore = useUserProfileStore(); // Store de perfil

const user = computed(() => userProfileStore.profile); // Se obtiene del store
const isLoading = ref(true);

// Computed para encontrar el usuario actual
onMounted(async () => {
  try {
    isLoading.value = true;
    await userProfileStore.getProfile(username);
  } catch (error) {
    console.error("Error al cargar perfil público:", error);
    // podrías redirigir o mostrar mensaje de error
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
  };
  return icons[platform] || GlobeAltIcon;
};

// Función para formatear el nombre de la plataforma
const formatPlatform = (platform: string) => {
  return platform.charAt(0).toUpperCase() + platform.slice(1);
};
</script>