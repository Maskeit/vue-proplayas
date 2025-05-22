<template>
    <!-- panel de projects -->
    <h1 class="text-4xl mb-4 font-bold text-[var(--color-eastern-blue-800)] dark:text-gray-200">
        Proyectos Colaborativos de bajo costo
    </h1>
    <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Proyecto v-for="project in projects" :key="project.id" v-bind="project" />
    </div>
</template>
<script setup lang="ts">
import Proyecto from '@/components/Public/Content/Cards/Proyecto.vue'
import { ref, onMounted, computed } from 'vue';
import { useContentStore } from '@/services/Stores/ContentStore';

// estados
const contentStore = useContentStore();
const projects = computed(() => contentStore.contentMap['projects']);
const isLoading = ref(true);
onMounted(async () => {
    isLoading.value = true;
    await contentStore.fetchContent("projects");
    isLoading.value = false;
});
</script>