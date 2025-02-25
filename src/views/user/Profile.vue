<template>
  <div class="max-w-9/10 m-auto md:p-7 pt-6 flex flex-col gap-y-6 text-color-gray-900 dark:text-[var(--color-dark-text)]">
    <ProfileHeader :name="userProfile.name" :profilePicture="userProfile.profile_picture" />
    <ProfileBio :about="userProfile.about" :degree="userProfile.degree" :postgraduate="userProfile.postgraduate"
      :expertiseArea="userProfile.expertise_area" :socialMedia="userProfile.social_media" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProfileHeader from '@/components/User/Profile/ProfileHeader.vue';
import ProfileBio from '@/components/User/Profile/ProfileBio.vue';
import userData from "@/utils/json/user.json";
const userProfile = ref(userData); // Asignamos los datos al estado reactivo

</script>