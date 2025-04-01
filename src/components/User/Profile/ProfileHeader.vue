<template>
  <div class="bg-white dark:bg-zinc-600 shadow-md rounded-lg p-6 flex items-center justify-between dark:text-gray-100">
    <!-- Perfil: Foto y Nombre -->
    <div class="flex items-center space-x-4">
      <img v-if="profilePicture" src="/src/assets/images/users/user.jpg" alt="Foto de perfil"
      class="md:w-40 md:h-40 w-24 h-24 rounded-full border-2 border-gray-300 object-cover" />
      <UserIcon v-else class="w-16 h-16" />
      <h2 class="text-xl font-semibold">{{ name }}</h2>
    </div>

    <!-- Botón de Configuración abre el modal para el header -->
    <button @click="openEditProfileModal" class="cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-500 transition"
      aria-label="Configuración">
      <PencilIcon class="w-6 h-6" />
    </button>
    <!-- Modal para editar perfil -->
    <EditProfileHeader :isOpen="isEditProfileOpen" :userData="{ name, profile_picture: profilePicture }"
      @close="isEditProfileOpen = false" @update="updateProfile" />
  </div>
</template>

<script setup lang="ts">
import { UserIcon } from "@heroicons/vue/24/outline";
import { PencilIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";
import EditProfileHeader from "./EditProfileHeader.vue";

interface Props {
  name: string;
  profilePicture: string;
}

defineProps<Props>();

const isEditProfileOpen = ref(false);

const openEditProfileModal = () => {
  isEditProfileOpen.value = true;
};

const updateProfile = (updatedData: { name: string; profile_picture: string }) => {
  console.log("Datos actualizados:", updatedData);
  // Aquí puedes actualizar el estado global o emitir un evento para actualizar el perfil en el padre
};
</script>
