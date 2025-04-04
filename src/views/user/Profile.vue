<template>
  <div class="max-w-9/10 m-auto md:p-7 pt-6 flex flex-col gap-y-6 text-color-gray-900 dark:text-[var(--color-dark-text)]">
    <template v-if="isLoading">
      <ProfileSkeleton/>
    </template>
    <template v-else-if="userData">
      <ProfileHeader 
        :name="userData.name" 
        :profilePicture="userData.profile_picture" 
        @update="updateProfile" />
      <ProfileBio 
        :about="userData.about" 
        :degree="userData.degree" 
        :postgraduate="userData.postgraduate"
        :expertiseArea="userData.expertise_area" 
        :social_media="userData.social_media" 
        :research-work="userData.research_work" 
        @update="updateProfile"/>
    </template>
    <Confirmation v-if="showConfirmation" @close="showConfirmation = false" />
  </div>
</template>

<script setup lang="ts">
import ProfileHeader from '@/components/User/Profile/ProfileHeader.vue';
import ProfileBio from '@/components/User/Profile/ProfileBio.vue';
import ProfileSkeleton from '@/components/shared/skeletons/ProfileSkeleton.vue';
import Confirmation from '@/components/shared/modales/Confirmation.vue';
import { ref, computed, onMounted } from 'vue'
import { useUserProfileStore } from '@/services/Stores/ProfileStore';

import type { User } from "@interfaces/Profile";

const userProfileStore = useUserProfileStore(); // Store de perfil
const userData = computed(() => userProfileStore.profile); // Se obtiene del store
const isLoading = ref(true);
const showConfirmation = ref(false);

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

// metodo para recibir los datos y usar el updateProfile( data )
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