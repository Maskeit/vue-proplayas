<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1 w-full p-6 max-w-7xl mx-auto">
      <router-view />
    </div>
  </div>
</template>
<script setup lang="ts">
import Sidebar from '@/components/Public/Content/Sidebar.vue';
</script>