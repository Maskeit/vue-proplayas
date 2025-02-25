<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
const route = useRoute();
const username = route.params.username as string;
const user = ref<{ name: string; profilePicture: string } | null>(null);

onMounted(async () => {
  // 🔹 Simulación de una API para obtener el perfil público del usuario
  user.value = await fetchUserProfile(username);
});

async function fetchUserProfile(username: string) {
  // Simulación de API
  return {
    name: "Miguel Alejandre",
    profilePicture: "/images/profile.jpg",
  };
}
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold">Perfil Público</h1>
    <img v-if="user" :src="user.profilePicture" alt="Foto de perfil" class="w-20 h-20 rounded-full" />
    <p v-if="user">{{ user.name }}</p>
    <p v-else>Cargando perfil...</p>
  </div>
</template>