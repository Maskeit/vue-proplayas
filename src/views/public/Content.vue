<template>
    <div class="flex min-h-screen">
      <Sidebar/>
      <div class="flex-1 w-full p-4 flex justify-center">
        <router-view />
      </div>
    </div>
</template>
<script setup lang="ts">
import Sidebar from '@/components/Public/Content/Sidebar.vue';
</script>