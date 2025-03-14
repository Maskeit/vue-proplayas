<template>
  <div class="max-w-9/10 m-auto md:p-7 py-6 flex flex-col gap-y-6">
    <!-- Verifica si el usuario existe -->
    <template v-if="user">
      <!-- Perfil: Foto y Nombre -->
      <div class="flex flex-col justify-center items-center space-y-4">
        <img :src="`/src/assets/images/users/user.jpg`" alt="Foto de perfil"
          class="md:w-40 md:h-40 w-24 h-24 rounded-full border-2 border-gray-300 object-cover" />
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">{{ user.name }}</h2>
      </div>

      <!-- Información básica -->
      <div class="bg-white dark:bg-[var(--color-eastern-blue-800)] text-gray-800 dark:text-gray-100 shadow-md rounded-lg p-6 flex items-center justify-between">
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
              {{ user.research_work.length ? user.research_work : 'Sin investigaciones registradas' }}
            </p>
          </div>

          <!-- Redes Sociales -->
          <div v-if="user.social_media.length" class="mt-4">
            <h2 class="text-lg font-semibold">Redes Sociales</h2>
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
    </template>

    <p v-else class="text-center text-gray-500">Usuario no encontrado</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import users from "@/utils/json/users.json";
import type { Users } from "@/interfaces/profile";

import FacebookIcon from "@icons/FacebookIcon.vue";
import TwitterIcon from "@icons/TwitterIcon.vue";
import InstagramIcon from "@icons/InstagramIcon.vue";
import YoutubeIcon from "@icons/YoutubeIcon.vue";
import LinkedinIcon from "@icons/LinkedinIcon.vue";
import GithubIcon from "@icons/GithubIcon.vue";
import { GlobeAltIcon, AcademicCapIcon } from "@heroicons/vue/24/outline";

const route = useRoute();
const username = route.params.username as string;

const usuarios = ref<Users[]>(users);

// Computed para encontrar el usuario actual
const user = computed<Users | undefined>(() => {
  return usuarios.value.find((u) => u.username === username);
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