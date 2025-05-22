<template>
    <!-- panel de articles -->
    <h1 class="text-4xl mb-4 font-bold text-[var(--color-eastern-blue-800)] dark:text-gray-200">
        Publicaciones de la Red
    </h1>
    <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Publication v-for="publication in publications" :key="publication.id" v-bind="publication" />
    </div>
</template>
<script setup lang="ts">
import Publication from '@/components/Public/Content/Cards/Publication.vue'
import { ref, onMounted, computed } from 'vue';
import { useContentStore } from '@/services/Stores/ContentStore';

// estados
const contentStore = useContentStore();
const publications = computed(() => contentStore.contentMap['publications']);
const isLoading = ref(true);
onMounted(async () => {
    isLoading.value = true;
    await contentStore.fetchContent("publications");
    isLoading.value = false;
});
</script>