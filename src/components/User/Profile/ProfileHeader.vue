<template>
  <div class="bg-white dark:bg-[var(--color-dark-bg)] shadow-md rounded-lg p-6 flex items-center justify-between">
    <!-- Perfil: Foto y Nombre -->
    <div class="flex items-center space-x-4">
      <img
        v-if="profilePicture"
        :src="profilePicture"
        alt="Foto de perfil"
        class="md:w-32 md:h-32 w-24 h-24 rounded-full border-2 border-gray-300 "
      />
      <UserIcon v-else class="w-16 h-16" />
      
      <h2 class="text-xl font-semibold">
        {{ name }}
      </h2>
      
    </div>

    <!-- Botón de Configuración -->
    <button
      class="cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-500 transition"
      aria-label="Configuración"
    >
      <PencilIcon class="w-6 h-6" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { UserIcon, Cog6ToothIcon } from "@heroicons/vue/24/outline";
import { PencilIcon } from "@heroicons/vue/24/solid";

interface Props {
  name: string;
  profilePicture: string;
}

defineProps<Props>();
</script>
